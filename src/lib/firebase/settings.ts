import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { DealershipSettings } from '@/types';
import { DEFAULT_DEALERSHIP_SETTINGS } from '../utils';

const SETTINGS_DOC_ID = 'dealership';
const SETTINGS_COLLECTION = 'settings';

export async function getDealershipSettings(): Promise<DealershipSettings> {
  if (!isFirebaseConfigured) return DEFAULT_DEALERSHIP_SETTINGS;

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_DEALERSHIP_SETTINGS, ...snap.data() } as DealershipSettings;
    }
  } catch (err) {
    console.warn('Using default dealership settings:', err);
  }
  return DEFAULT_DEALERSHIP_SETTINGS;
}

export async function saveDealershipSettings(settings: Partial<DealershipSettings>): Promise<void> {
  if (!isFirebaseConfigured) return;
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
  await setDoc(docRef, settings, { merge: true });
}
