'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Video, Save } from 'lucide-react';
import { GalleryItem, MediaCategory, MediaType } from '@/types';
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from '@/lib/firebase/gallery';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [category, setCategory] = useState<MediaCategory>('Deliveries');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [loading, setLoading] = useState(true);

  const loadGallery = async () => {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !mediaUrl) return;

    await saveGalleryItem({
      title,
      description,
      mediaUrl,
      category,
      mediaType,
      isFeatured: true,
      displayOrder: items.length + 1,
      status: 'published',
    });

    setTitle('');
    setDescription('');
    setMediaUrl('');
    loadGallery();
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Delete this gallery item?')) {
      await deleteGalleryItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-[#222226] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
          Showroom Gallery & Media Manager
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Upload delivery handovers, showroom photos, and walkaround videos.
        </p>
      </div>

      {/* Add Media Form */}
      <form onSubmit={handleAdd} className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-bold text-white font-serif border-b border-[#222226] pb-3">
          Add New Gallery Item
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Audi Q3 Delivery to Mr. Rahul"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Media URL / Storage Image *</label>
            <input
              type="url"
              required
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MediaCategory)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            >
              <option value="Deliveries">Deliveries</option>
              <option value="Showroom">Showroom</option>
              <option value="Walkaround">Walkaround</option>
              <option value="Events">Events</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as MediaType)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            >
              <option value="image">Photo / Image</option>
              <option value="video">Video Walkaround</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief story or vehicle specs..."
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#E51937] hover:bg-[#C4122C] text-white text-xs font-bold uppercase rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Item</span>
        </button>
      </form>

      {/* Existing Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#141417] rounded-xl border border-[#232328] overflow-hidden p-4 space-y-3">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#1C1C22]">
              <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#E51937] uppercase">{item.category}</span>
              <p className="font-bold text-white text-sm line-clamp-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
