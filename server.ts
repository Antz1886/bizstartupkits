import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore/lite';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase using the "Lite" SDK for the server
// This avoids persistent gRPC streams and the "idle stream" errors
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Test Connection - Optimized for serverless one-shot fetch
async function testConnection() {
  try {
    const docSnap = await getDoc(doc(db, 'test', 'connection'));
    if (docSnap.exists()) {
      console.log('Firebase connection verified: Systems Online');
    } else {
      // Document doesn't exist, but we reached the database
      console.log('Firebase connection verified: Database reachable');
    }
  } catch (error) {
    // Handle specific permission cases
    if (error instanceof Error && (error.message.includes('permission-denied') || (error as any).code === 'permission-denied')) {
      console.log('Firebase connection authenticated: Access Restricted (Expected)');
    } else {
      console.warn("Firebase connection status check (non-fatal):", error instanceof Error ? error.message : error);
    }
  }
}
testConnection();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Lead Collection Endpoint using Firestore
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, email, type } = req.body;
      
      if (!name || !email || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Save to Firestore
      const leadsRef = collection(db, 'leads');
      const docRef = await addDoc(leadsRef, {
        name,
        email,
        type,
        status: 'new',
        createdAt: serverTimestamp()
      });

      console.log(`Lead saved to Firestore with ID: ${docRef.id}`);
      
      res.status(201).json({ 
        success: true, 
        message: 'Consultation request received. Our team will contact you soon.',
        leadId: docRef.id
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process request. Please try again later.' 
      });
    }
  });

  // Telemetry Endpoint: Fetch live sessions from Firestore
  app.get('/api/telemetry/sessions', async (req, res) => {
    try {
      const sessionsRef = collection(db, 'resolution_sessions');
      // Query the latest 10 sessions, ordered by timestamp descending
      const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.status(200).json({
        success: true,
        data: sessions
      });
    } catch (error) {
      console.error('Error fetching telemetry sessions:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch telemetry data.' 
      });
    }
  });

  // Sponsorship Request & Corporate Bootstrapping
  app.post('/api/sponsorships', async (req, res) => {
    try {
      const { companyName, financialYearEnd, targetNpatSpendZar } = req.body;
      if (!companyName || !financialYearEnd || targetNpatSpendZar === undefined) {
        return res.status(400).json({ error: 'Missing corporate parameters' });
      }
      
      const sponsorsRef = collection(db, 'corporateSponsors');
      const docRef = await addDoc(sponsorsRef, {
        companyName,
        financialYearEnd,
        targetNpatSpendZar: Number(targetNpatSpendZar),
        sponsoredSmes: [],
        createdAt: serverTimestamp()
      });

      res.status(201).json({
        success: true,
        sponsorId: docRef.id,
        message: 'Corporate sponsorship dashboard configuration successfully registered.'
      });
    } catch (error) {
      console.error('Error saving sponsorship:', error);
      res.status(500).json({ error: 'Server error saving corporate configuration' });
    }
  });

  // SME Profile CRUD / Update
  app.post('/api/sme-profile', async (req, res) => {
    try {
      const { smeId, companyName, turnoverBracket, esdCategory, isVendorVerified, tasksCompleted } = req.body;
      if (!companyName || !turnoverBracket || !esdCategory) {
        return res.status(400).json({ error: 'Missing profile parameters' });
      }

      const profilesRef = collection(db, 'smeProfiles');
      let docId = smeId;
      
      if (smeId) {
        // Simple mock behavior or update
        // In full Firestore client SDK we'd write directly, but this allows server-side backup
        const docRef = await addDoc(profilesRef, {
          companyName,
          turnoverBracket,
          esdCategory,
          isVendorVerified: !!isVendorVerified,
          tasksCompleted: tasksCompleted || {},
          updatedAt: serverTimestamp()
        });
        docId = docRef.id;
      } else {
        const docRef = await addDoc(profilesRef, {
          companyName,
          turnoverBracket,
          esdCategory,
          isVendorVerified: !!isVendorVerified,
          tasksCompleted: tasksCompleted || {},
          createdAt: serverTimestamp()
        });
        docId = docRef.id;
      }

      res.status(200).json({ success: true, smeId: docId });
    } catch (error) {
      console.error('Error saving SME profile:', error);
      res.status(500).json({ error: 'Server error saving SME Profile' });
    }
  });

  // Individual Audit Log Event
  app.post('/api/audit-log', async (req, res) => {
    try {
      const { smeId, actionDescription, isOfflineLogged } = req.body;
      if (!smeId || !actionDescription) {
        return res.status(400).json({ error: 'Missing log parameters' });
      }

      const logsRef = collection(db, 'auditActivityLogs');
      const docRef = await addDoc(logsRef, {
        smeId,
        actionDescription,
        isOfflineLogged: !!isOfflineLogged,
        timestamp: new Date().toISOString()
      });

      res.status(201).json({ success: true, logId: docRef.id });
    } catch (error) {
      console.error('Error saving audit log:', error);
      res.status(500).json({ error: 'Server error saving audit log' });
    }
  });

  // Batch Offline Sync Log Queue
  app.post('/api/audit-log/sync', async (req, res) => {
    try {
      const { smeId, logs } = req.body;
      if (!smeId || !Array.isArray(logs)) {
        return res.status(400).json({ error: 'Invalid batch sync payload' });
      }

      const logsRef = collection(db, 'auditActivityLogs');
      const syncedIds: string[] = [];

      for (const log of logs) {
        const docRef = await addDoc(logsRef, {
          smeId,
          actionDescription: log.actionDescription,
          isOfflineLogged: true,
          timestamp: log.timestamp || new Date().toISOString()
        });
        syncedIds.push(docRef.id);
      }

      res.status(200).json({ success: true, syncedCount: syncedIds.length, logIds: syncedIds });
    } catch (error) {
      console.error('Error syncing logs batch:', error);
      res.status(500).json({ error: 'Server error syncing offline activity logs' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA Fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
