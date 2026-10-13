import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { GalleryItem } from '@/types';
import { MOCK_GALLERY } from '../mockData';

const GALLERY_COLLECTION = 'gallery';

function serializeGalleryItem(docId: string, data: any): GalleryItem {
  const parseTimestamp = (val: any) => {
    if (!val) return new Date().toISOString();
    if (typeof val === 'string' || typeof val === 'number') return val;
    if (val && typeof val.toDate === 'function') return val.toDate().toISOString();
    if (val && typeof val.seconds === 'number') return new Date(val.seconds * 1000).toISOString();
    return new Date().toISOString();
  };

  return {
    ...data,
    id: docId,
    createdAt: parseTimestamp(data.createdAt),
    updatedAt: parseTimestamp(data.updatedAt),
  } as GalleryItem;
}

export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  if (!isFirebaseConfigured) {
    if (category && category !== 'All') {
      return MOCK_GALLERY.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return MOCK_GALLERY;
  }

  try {
    const galleryRef = collection(db, GALLERY_COLLECTION);
    const q = query(galleryRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    let items: GalleryItem[] = snapshot.docs.map(d => serializeGalleryItem(d.id, d.data()));
    
    if (category && category !== 'All') {
      items = items.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return items;
  } catch (err) {
    console.warn('Error fetching gallery, returning mock items:', err);
    return MOCK_GALLERY;
  }
}

export async function saveGalleryItem(item: Partial<GalleryItem>, id?: string): Promise<string> {
  if (!isFirebaseConfigured) return id || `mock-gal-${Date.now()}`;

  // Strip all undefined properties so Firestore updateDoc never throws
  const cleanItem: Record<string, any> = {};
  for (const [key, val] of Object.entries(item)) {
    if (val !== undefined) {
      cleanItem[key] = val;
    }
  }

  const data = {
    ...cleanItem,
    updatedAt: serverTimestamp(),
  };

  if (id) {
    await updateDoc(doc(db, GALLERY_COLLECTION, id), data);
    return id;
  } else {
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  await deleteDoc(doc(db, GALLERY_COLLECTION, id));
}
