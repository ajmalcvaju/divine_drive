import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { Enquiry, EnquiryStatus } from '@/types';

const ENQUIRIES_COLLECTION = 'enquiries';

export async function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<string> {
  if (!isFirebaseConfigured) {
    console.log('Submitted lead to mock store:', enquiry);
    return `mock-enq-${Date.now()}`;
  }

  const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
    ...enquiry,
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (!isFirebaseConfigured) {
    return [
      {
        id: 'enq-1',
        customerName: 'Kiran Kumar',
        phone: '+91 94471 23456',
        email: 'kiran.k@gmail.com',
        message: 'Interested in Mahindra Thar ROXX test drive and exchange offer.',
        carId: 'car-1',
        carName: 'Mahindra Thar ROXX 2024',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'enq-2',
        customerName: 'Anjali Ramesh',
        phone: '+91 98950 88776',
        email: 'anjali.ramesh@yahoo.com',
        message: 'Is the Audi Q3 price negotiable?',
        carId: 'car-2',
        carName: 'Audi Q3 Premium 2023',
        status: 'contacted',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }

  try {
    const q = query(collection(db, ENQUIRIES_COLLECTION));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Enquiry));
  } catch (err) {
    console.error('Failed to get enquiries:', err);
    return [];
  }
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(db, ENQUIRIES_COLLECTION, id), { status });
}
