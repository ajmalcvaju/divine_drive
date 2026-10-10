import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './config';
import { Car, ListingStatus, VehicleAvailability } from '@/types';
import { MOCK_CARS } from '../mockData';

const CARS_COLLECTION = 'cars';

export interface CarFilters {
  make?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  search?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'year-desc';
  status?: ListingStatus;
  availability?: VehicleAvailability;
}

export async function getCars(filters?: CarFilters): Promise<Car[]> {
  if (!isFirebaseConfigured) {
    let result = [...MOCK_CARS];
    if (filters) {
      if (filters.make && filters.make !== 'All') {
        result = result.filter(c => c.make.toLowerCase() === filters.make!.toLowerCase());
      }
      if (filters.bodyType && filters.bodyType !== 'All') {
        result = result.filter(c => c.bodyType.toLowerCase() === filters.bodyType!.toLowerCase());
      }
      if (filters.fuelType && filters.fuelType !== 'All') {
        result = result.filter(c => c.fuelType.toLowerCase() === filters.fuelType!.toLowerCase());
      }
      if (filters.transmission && filters.transmission !== 'All') {
        result = result.filter(c => c.transmission.toLowerCase() === filters.transmission!.toLowerCase());
      }
      if (filters.minPrice) {
        result = result.filter(c => c.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        result = result.filter(c => c.price <= filters.maxPrice!);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(c => 
          c.make.toLowerCase().includes(q) || 
          c.model.toLowerCase().includes(q) || 
          c.variant.toLowerCase().includes(q)
        );
      }
      if (filters.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'year-desc') {
        result.sort((a, b) => b.year - a.year);
      } else {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
    return result;
  }

  try {
    const carsRef = collection(db, CARS_COLLECTION);
    const q = query(carsRef, where('status', '==', filters?.status || 'published'));
    const snapshot = await getDocs(q);
    const cars: Car[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
    return cars;
  } catch (err) {
    console.warn('Firestore fetch failed, returning mock data:', err);
    return MOCK_CARS;
  }
}

export async function getFeaturedCars(): Promise<Car[]> {
  const allCars = await getCars({ status: 'published' });
  return allCars.filter(c => c.isFeatured);
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const cars = await getCars();
  const car = cars.find(c => c.slug === slug);
  return car || null;
}

export async function getCarById(id: string): Promise<Car | null> {
  if (!isFirebaseConfigured) {
    return MOCK_CARS.find(c => c.id === id) || null;
  }
  try {
    const carRef = doc(db, CARS_COLLECTION, id);
    const snap = await getDoc(carRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Car;
    }
    return null;
  } catch (err) {
    console.error('Error fetching car by ID:', err);
    return MOCK_CARS.find(c => c.id === id) || null;
  }
}

export async function saveCar(car: Partial<Car>, id?: string): Promise<string> {
  if (!isFirebaseConfigured) {
    console.log('Firebase not configured. Saved car in mock state.');
    return id || `mock-car-${Date.now()}`;
  }

  const carData = {
    ...car,
    updatedAt: serverTimestamp(),
  };

  if (id) {
    const carRef = doc(db, CARS_COLLECTION, id);
    await updateDoc(carRef, carData);
    return id;
  } else {
    const carsRef = collection(db, CARS_COLLECTION);
    const docRef = await addDoc(carsRef, {
      ...carData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
}

export async function deleteCar(id: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  const carRef = doc(db, CARS_COLLECTION, id);
  await deleteDoc(carRef);
}

export async function uploadCarImage(file: File, carId: string, onProgress?: (p: number) => void): Promise<{ url: string; path: string }> {
  if (!isFirebaseConfigured) {
    return {
      url: URL.createObjectURL(file),
      path: `cars/${carId}/${file.name}`,
    };
  }

  const storagePath = `cars/${carId}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      error => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, path: storagePath });
      }
    );
  });
}
