import { 
  assertFails, 
  assertSucceeds, 
  initializeTestEnvironment, 
  RulesTestEnvironment 
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { describe, it, beforeAll, afterAll, beforeEach } from 'vitest';

let testEnv: RulesTestEnvironment;

describe('Firestore Security Rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'modern-nation-201000',
      firestore: {
        rules: readFileSync('firestore.rules', 'utf8'),
        host: 'localhost',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('allows public lead creation with valid data', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const leadsRef = collection(unauthedDb, 'leads');
    await assertSucceeds(addDoc(leadsRef, {
      name: 'John Doe',
      email: 'john@example.com',
      type: 'Automation Assessment',
      status: 'new',
      createdAt: serverTimestamp()
    }));
  });

  it('denies lead creation with invalid status', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const leadsRef = collection(unauthedDb, 'leads');
    await assertFails(addDoc(leadsRef, {
      name: 'John Doe',
      email: 'john@example.com',
      type: 'Automation Assessment',
      status: 'qualified', // Invalid: Must be 'new'
      createdAt: serverTimestamp()
    }));
  });

  it('denies public read of leads', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const leadDoc = doc(unauthedDb, 'leads/test-lead');
    await assertFails(getDoc(leadDoc));
  });

  it('allows admin read of leads', async () => {
    // Setup admin record in Firestore
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'admins/admin-123'), { email: 'admin@automind.tech', role: 'super' });
    });

    const adminDb = testEnv.authenticatedContext('admin-123').firestore();
    const leadDoc = doc(adminDb, 'leads/test-lead');
    await assertSucceeds(getDoc(leadDoc));
  });

  it('denies non-admin authenticated read of leads', async () => {
    const userDb = testEnv.authenticatedContext('user-456').firestore();
    const leadDoc = doc(userDb, 'leads/test-lead');
    await assertFails(getDoc(leadDoc));
  });

  it('denies lead updates (immutability check)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'leads/test-lead'), { name: 'Original', status: 'new' });
    });

    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const leadDoc = doc(unauthedDb, 'leads/test-lead');
    await assertFails(setDoc(leadDoc, { name: 'Changed' }, { merge: true }));
  });
});
