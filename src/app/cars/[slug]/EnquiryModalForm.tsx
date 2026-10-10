'use client';

import { useState } from 'react';
import { Mail, X, CheckCircle, Send } from 'lucide-react';
import { submitEnquiry } from '@/lib/firebase/enquiries';

interface EnquiryModalFormProps {
  carId: string;
  carName: string;
}

export default function EnquiryModalForm({ carId, carName }: EnquiryModalFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`I am interested in ${carName}. Please contact me.`);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    await submitEnquiry({
      customerName: name,
      phone,
      email,
      message,
      carId,
      carName,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 px-4 rounded-xl bg-[#141417] border border-[#232328] hover:border-[#E51937] text-gray-200 font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition"
      >
        <Mail className="w-4 h-4 text-[#E51937]" />
        <span>Request Test Drive / Call Back</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141417] border border-[#232328] w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => {
                setOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-12 h-12 text-[#E51937] mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif">Enquiry Sent Successfully!</h3>
                <p className="text-gray-400 text-xs">
                  Thank you, {name}. Our sales team at Divine Drive will reach out to you shortly regarding {carName}.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-[#E51937] text-white text-xs font-bold rounded-lg uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#222226] pb-3">
                  <span className="text-[10px] font-bold text-[#E51937] uppercase tracking-wider">
                    DIRECT ENQUIRY
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif">{carName}</h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2 transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Submit Lead'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
