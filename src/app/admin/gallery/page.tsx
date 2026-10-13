'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Check, Save, Image as ImageIcon, Video, ExternalLink } from 'lucide-react';
import { GalleryItem, MediaCategory, MediaType } from '@/types';
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from '@/lib/firebase/gallery';
import { isInstagramUrl, compressImageToBase64 } from '@/lib/utils';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState<MediaCategory>('Deliveries');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const loadGallery = async () => {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleStartEdit = (item: GalleryItem) => {
    setEditingId(item.id || null);
    setTitle(item.title);
    setDescription(item.description || '');
    setMediaUrl(item.mediaUrl);
    setThumbnailUrl(item.thumbnailUrl || '');
    setCategory(item.category);
    setMediaType(item.mediaType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setMediaUrl('');
    setThumbnailUrl('');
    setCategory('Deliveries');
    setMediaType('image');
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const base64 = await compressImageToBase64(file, 850, 60);
      setThumbnailUrl(base64);
    } catch (err: any) {
      console.error('Failed to compress cover image:', err);
      alert('Failed to upload cover image.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mediaUrl.trim()) return;

    setSubmitting(true);
    try {
      const payload: Partial<GalleryItem> = {
        title: title.trim(),
        description: description.trim(),
        mediaUrl: mediaUrl.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        category,
        mediaType,
        isFeatured: true,
        displayOrder: editingId ? undefined : items.length + 1,
        status: 'published',
      };

      await saveGalleryItem(payload, editingId || undefined);
      handleCancelEdit();
      await loadGallery();
    } catch (err: any) {
      console.error('Failed to save gallery item:', err);
      alert(err?.message || 'Failed to save item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this gallery item?')) {
      await deleteGalleryItem(id);
      if (editingId === id) handleCancelEdit();
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-[#222226] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Showroom Gallery & Media Manager
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Add, edit, or delete delivery handovers, showroom photos, and Instagram Reels.
          </p>
        </div>
      </div>

      {/* Add / Edit Form */}
      <form onSubmit={handleSave} className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#222226] pb-3">
          <h2 className="text-base sm:text-lg font-bold text-white font-serif flex items-center space-x-2">
            {editingId ? (
              <>
                <Edit3 className="w-4 h-4 text-[#E51937]" />
                <span>Edit Gallery Item</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#E51937]" />
                <span>Add New Gallery Item</span>
              </>
            )}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-gray-400 hover:text-white flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Volkswagen Jetta Diesel Automatic Handover"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5 focus:border-[#E51937] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Media URL (Photo Link or Instagram Reel Link) *
            </label>
            <input
              type="url"
              required
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="e.g. https://www.instagram.com/reel/C.../ or image URL"
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5 focus:border-[#E51937] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MediaCategory)}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5 focus:border-[#E51937] outline-none"
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
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5 focus:border-[#E51937] outline-none"
            >
              <option value="image">Photo / Image</option>
              <option value="video">Video / Reel</option>
            </select>
          </div>
        </div>

        {/* Cover Image / Thumbnail Section */}
        <div className="p-4 bg-[#18181D] rounded-xl border border-[#26262D] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              Cover Image / Video Poster (Recommended for Videos & Reels)
            </label>
            <span className="text-[11px] text-gray-400">Upload a custom thumbnail or paste an image link</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Upload Cover Photo (Auto-compressed to ~60KB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                disabled={uploadingCover}
                className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E51937] file:text-white hover:file:bg-[#C4122C] cursor-pointer"
              />
              {uploadingCover && <p className="text-[10px] text-[#E51937] mt-1">Compressing cover photo...</p>}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Or Paste Cover Image URL</label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2 focus:border-[#E51937] outline-none"
              />
            </div>
          </div>

          {thumbnailUrl && (
            <div className="flex items-center space-x-3 pt-1">
              <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-[#2A2A32] bg-black">
                <img src={thumbnailUrl} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-green-400 font-semibold">✓ Cover image selected</span>
              <button
                type="button"
                onClick={() => setThumbnailUrl('')}
                className="text-[11px] text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief story, client name, or vehicle specs..."
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5 focus:border-[#E51937] outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#E51937] hover:bg-[#C4122C] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center space-x-2 transition disabled:opacity-50"
          >
            {editingId ? (
              <>
                <Save className="w-4 h-4" />
                <span>{submitting ? 'Updating...' : 'Update Gallery Item'}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{submitting ? 'Adding...' : 'Add Media Item'}</span>
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2.5 bg-[#1C1C22] hover:bg-[#25252D] text-gray-300 text-xs font-bold uppercase rounded-xl transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Items Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Current Gallery Items ({items.length})
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-[#141417] rounded-2xl border border-[#232328]">
            <p className="text-gray-400 text-xs">No gallery items yet. Use the form above to add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => {
              const isInsta = isInstagramUrl(item.mediaUrl);
              const isCurrentlyEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-[#141417] rounded-2xl border overflow-hidden p-4 space-y-3 transition flex flex-col justify-between ${
                    isCurrentlyEditing ? 'border-[#E51937] shadow-lg shadow-red-950/30' : 'border-[#232328] hover:border-[#33333e]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Media Preview Box */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#1C1C22] flex items-center justify-center">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : isInsta ? (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center mb-1 shadow-md">
                            <Video className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Instagram Reel</span>
                        </div>
                      ) : (
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if URL is broken
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}

                      {/* Top Action Buttons (Edit + Delete) */}
                      <div className="absolute top-2 right-2 flex items-center space-x-1.5 z-10">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          title="Edit this item"
                          className="p-1.5 rounded-full bg-black/80 text-white hover:bg-[#E51937] transition shadow-md"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete this item"
                          className="p-1.5 rounded-full bg-black/80 text-red-400 hover:bg-red-600 hover:text-white transition shadow-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#E51937] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase">
                          {item.mediaType}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-1 mt-0.5">{item.title}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222226] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="text-xs text-gray-300 hover:text-white font-semibold flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3 text-[#E51937]" />
                      <span>Edit Item</span>
                    </button>

                    {item.mediaUrl && (
                      <a
                        href={item.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-gray-500 hover:text-gray-300 flex items-center space-x-1"
                      >
                        <span>Open Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
