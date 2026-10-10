'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, CheckCircle, Clock } from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types';
import { getEnquiries, updateEnquiryStatus } from '@/lib/firebase/enquiries';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = async () => {
    setLoading(true);
    const data = await getEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    await updateEnquiryStatus(id, newStatus);
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-[#222226] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
          Customer Enquiries & Lead Tracker
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review incoming buyer requests, test drive bookings, and vehicle inquiries.
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.length > 0 ? (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-bold text-white font-serif">{enq.customerName}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    enq.status === 'new' ? 'bg-red-950/50 text-[#E51937] border border-red-900/50' :
                    enq.status === 'contacted' ? 'bg-amber-950/50 text-amber-400 border border-amber-800/40' :
                    'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                  }`}>
                    {enq.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <a href={`tel:${enq.phone}`} className="flex items-center text-[#E51937] hover:underline font-semibold">
                    <Phone className="w-3.5 h-3.5 mr-1" />
                    {enq.phone}
                  </a>
                  {enq.email && (
                    <span className="flex items-center">
                      <Mail className="w-3.5 h-3.5 mr-1 text-gray-500" />
                      {enq.email}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-300 font-medium">Vehicle: {enq.carName || 'General Enquiry'}</p>
                {enq.message && (
                  <p className="text-xs text-gray-400 italic bg-[#1C1C22] p-3 rounded-xl border border-[#222228]">
                    &quot;{enq.message}&quot;
                  </p>
                )}
              </div>

              {/* Quick Response Actions */}
              <div className="flex flex-col space-y-2 shrink-0">
                <a
                  href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${enq.customerName}, thank you for contacting Divine Drive Kozhikode regarding ${enq.carName || 'your enquiry'}. How can we assist you today?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#E51937] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Reply on WhatsApp</span>
                </a>

                <div className="flex items-center space-x-2 pt-2">
                  <span className="text-[11px] text-gray-500">Status:</span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id!, e.target.value as EnquiryStatus)}
                    className="bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#141417] rounded-2xl border border-[#232328]">
            <p className="text-gray-400 text-sm">No enquiries submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
