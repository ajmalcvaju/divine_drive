import { getCars } from '@/lib/firebase/cars';
import EditCarClient from './EditCarClient';

export async function generateStaticParams() {
  try {
    const cars = await getCars();
    if (cars.length === 0) {
      return [{ id: 'default' }];
    }
    return cars.map((c) => ({ id: c.id || 'default' }));
  } catch {
    return [{ id: 'default' }];
  }
}

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;
  return <EditCarClient id={id} />;
}
