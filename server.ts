import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore/lite';
import firebaseConfig from './firebase-applet-config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase using the "Lite" SDK for the server
// This avoids persistent gRPC streams and the "idle stream" errors
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

// Test Connection - Optimized for serverless one-shot fetch
async function testConnection() {
  try {
    await getDoc(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified');
  } catch (error) {
    // Permission denied is a success for connection verification
    if (error instanceof Error && (error.message.includes('permission-denied') || (error as any).code === 'permission-denied')) {
      console.log('Firebase connection authenticated');
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
