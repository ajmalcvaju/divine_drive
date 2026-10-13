'use client';

import { useEffect, useState } from 'react';
import { getCarById } from '@/lib/firebase/cars';
import { Car } from '@/types';
import CarForm from '@/components/admin/CarForm';

export default function EditCarClient({ id }: { id: string }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      const data = await getCarById(id);
      setCar(data);
      setLoading(false);
    }
    loadCar();
  }, [id]);

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading vehicle data...</div>;
  }

  if (!car) {
    return <div className="text-red-400 text-sm">Vehicle listing not found.</div>;
  }

  return <CarForm initialData={car} isEdit={true} />;
}
