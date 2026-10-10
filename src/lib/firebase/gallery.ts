import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { GalleryItem } from '@/types';
import { MOCK_GALLERY } from '../mockData';

const GALLERY_COLLECTION = 'gallery';

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
    let items: GalleryItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
    
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

  const data = {
    ...item,
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
