import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../firebase/serviceAccount.json'); admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath), });
  
 export default admin;