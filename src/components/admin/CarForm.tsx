'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Check, Save, Image as ImageIcon, Plus } from 'lucide-react';
import { Car, FuelType, TransmissionType, BodyType, VehicleAvailability, ListingStatus } from '@/types';
import { saveCar, uploadCarImage } from '@/lib/firebase/cars';
import { createSlug, compressImage, compressImageToBase64 } from '@/lib/utils';

interface CarFormProps {
  initialData?: Car;
  isEdit?: boolean;
}

export default function CarForm({ initialData, isEdit }: CarFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [make, setMake] = useState(initialData?.make || '');
  const [model, setModel] = useState(initialData?.model || '');
  const [variant, setVariant] = useState(initialData?.variant || '');
  const [year, setYear] = useState<number>(initialData?.year || new Date().getFullYear());
  const [registrationYear, setRegistrationYear] = useState<number>(initialData?.registrationYear || new Date().getFullYear());
  const [price, setPrice] = useState<number>(initialData?.price || 1500000);
  const [comparePrice, setComparePrice] = useState<number>(initialData?.comparePrice || 0);
  const [negotiable, setNegotiable] = useState<boolean>(initialData?.negotiable ?? true);
  
  const [mileage, setMileage] = useState<number>(initialData?.mileage || 10000);
  const [fuelType, setFuelType] = useState<FuelType>(initialData?.fuelType || 'Diesel');
  const [transmission, setTransmission] = useState<TransmissionType>(initialData?.transmission || 'Automatic');
  const [bodyType, setBodyType] = useState<BodyType>(initialData?.bodyType || 'SUV');
  const [colour, setColour] = useState(initialData?.colour || 'Black');
  const [engineCapacity, setEngineCapacity] = useState(initialData?.engineCapacity || '');
  const [ownershipCount, setOwnershipCount] = useState<number>(initialData?.ownershipCount || 1);
  const [registrationLocation, setRegistrationLocation] = useState(initialData?.registrationLocation || 'KL-11 Kozhikode');
  const [insuranceExpiry, setInsuranceExpiry] = useState(initialData?.insuranceExpiry || '');
  const [serviceHistory, setServiceHistory] = useState(initialData?.serviceHistory || 'Company Serviced');
  
  const [description, setDescription] = useState(initialData?.description || '');
  const [features, setFeatures] = useState<string[]>(initialData?.features || ['Sunroof', 'Leather Seats']);
  const [newFeature, setNewFeature] = useState('');
  
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.imageUrls || []);
  const [primaryImage, setPrimaryImage] = useState<string>(initialData?.primaryImage || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
  
  const [availability, setAvailability] = useState<VehicleAvailability>(initialData?.availability || 'available');
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured ?? true);
  const [status, setStatus] = useState<ListingStatus>(initialData?.status || 'published');
  
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(0);
    const carId = initialData?.id || `temp-${Date.now()}`;
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const originalFile = files[i];
        setUploadProgress(Math.round(((i + 0.3) / files.length) * 100));
        
        // Ultra-compact compression: ~50-60KB WebP so 10+ photos stay well under Firestore's 1MB limit
        const base64Url = await compressImageToBase64(originalFile, 850, 60);
        newUrls.push(base64Url);
        
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setImageUrls(prev => [...prev, ...newUrls]);
      if (!primaryImage && newUrls.length > 0) setPrimaryImage(newUrls[0]);
    } catch (err: any) {
      console.error('Image processing failed:', err);
      alert(err?.message || 'Failed to process images.');
    } finally {
      setUploadProgress(null);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (idx: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model) return;

    setSubmitting(true);
    const slug = createSlug(make, model, variant, year);

    const payload: Partial<Car> = {
      make,
      model,
      variant,
      slug,
      year: Number(year),
      registrationYear: Number(registrationYear),
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : undefined,
      negotiable,
      mileage: Number(mileage),
      fuelType,
      transmission,
      bodyType,
      colour,
      engineCapacity,
      ownershipCount: Number(ownershipCount),
      registrationLocation,
      insuranceExpiry,
      serviceHistory,
      description,
      features,
      imageUrls,
      primaryImage: primaryImage || imageUrls[0] || '',
      videoUrl,
      availability,
      isFeatured,
      status,
    };

    await saveCar(payload, initialData?.id);
    setSubmitting(false);
    router.push('/admin/cars');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center border-b border-[#222226] pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-serif">
            {isEdit ? `Edit Vehicle: ${initialData?.make} ${initialData?.model}` : 'Add New Vehicle Listing'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">Fill out the vehicle specifications and upload photos.</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center space-x-2 transition shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'Saving...' : 'Save Listing'}</span>
        </button>
      </div>

      {/* Section 1: Basic Info */}
      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-serif font-bold text-white border-b border-[#222226] pb-3">
          1. Basic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Make / Brand *</label>
            <input
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="e.g. Mahindra, Audi, BMW"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Model *</label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Thar ROXX, Q3"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Variant</label>
            <input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="e.g. AX7L 4WD Diesel AT"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Manufacturing Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Selling Price (INR) *</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="e.g. 1850000"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div className="flex items-center space-x-3 pt-6">
            <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
                className="accent-[#E51937]"
              />
              <span>Price Negotiable</span>
            </label>
          </div>
        </div>
      </div>

      {/* Section 2: Technical Specifications */}
      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-serif font-bold text-white border-b border-[#222226] pb-3">
          2. Specifications
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Kilometres Driven</label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as FuelType)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            >
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Transmission</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as TransmissionType)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Body Type</label>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value as BodyType)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="Hatchback">Hatchback</option>
              <option value="MUV">MUV</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Registration Location</label>
            <input
              type="text"
              value={registrationLocation}
              onChange={(e) => setRegistrationLocation(e.target.value)}
              placeholder="e.g. KL-11 Kozhikode"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Exterior Colour</label>
            <input
              type="text"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Ownership Count</label>
            <input
              type="number"
              value={ownershipCount}
              onChange={(e) => setOwnershipCount(Number(e.target.value))}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Media Upload */}
      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-serif font-bold text-white border-b border-[#222226] pb-3">
          3. Media & Uploads
        </h2>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-2">Upload Vehicle Images</label>
          <div className="border-2 border-dashed border-[#2A2A32] hover:border-[#E51937] p-6 rounded-2xl text-center cursor-pointer relative bg-[#1C1C22] transition">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-[#E51937] mx-auto mb-2" />
            <p className="text-xs font-semibold text-white">Click or drag images to upload</p>
            <p className="text-[11px] text-gray-500 mt-1">Supports JPG, PNG, WebP</p>
          </div>
          {uploadProgress !== null && (
            <p className="text-xs text-[#E51937] mt-2">Uploading images... {uploadProgress.toFixed(0)}%</p>
          )}
        </div>

        {/* Uploaded Images Preview Grid */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 ${
                  primaryImage === url ? 'border-[#E51937] ring-2 ring-red-900/50' : 'border-[#232328]'
                }`}
              >
                <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrls(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white hover:text-red-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPrimaryImage(url)}
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white hover:bg-[#E51937]"
                >
                  {primaryImage === url ? 'Primary ✓' : 'Set Primary'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 4: Features & Overview */}
      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-serif font-bold text-white border-b border-[#222226] pb-3">
          4. Features & Description
        </h2>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Key Features</label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="e.g. Sunroof, 360 Camera"
              className="flex-1 bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-[#E51937] text-white text-xs font-bold rounded-xl"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-[#1C1C22] border border-[#2A2A32] text-xs text-white flex items-center space-x-2">
                <span>{f}</span>
                <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-red-400" onClick={() => removeFeature(idx)} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Detailed Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl p-3"
          />
        </div>
      </div>

      {/* Section 5: Status Settings */}
      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-[#E51937]"
            />
            <span>Feature on Homepage</span>
          </label>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400">Availability:</span>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as VehicleAvailability)}
              className="bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-2.5 py-1"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3.5 bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center space-x-2 transition shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'Saving...' : 'Publish Vehicle'}</span>
        </button>
      </div>
    </form>
  );
}
