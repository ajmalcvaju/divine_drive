'use client';

import { useState } from 'react';
import { Mail, X, CheckCircle, Send } from 'lucide-react';
import { submitEnquiry } from '@/lib/firebase/enquiries';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';

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
  const [interestedInEmi, setInterestedInEmi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    const whatsappNumber = DEFAULT_DEALERSHIP_SETTINGS.whatsapp;
    const textLines = [
      `*New Vehicle Enquiry - Divine Drive*`,
      `*Vehicle:* ${carName}`,
      `*Customer:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      email.trim() ? `*Email:* ${email.trim()}` : null,
      message.trim() ? `*Message:* ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textLines)}`;
    setWhatsappRedirectUrl(whatsappUrl);

    try {
      await submitEnquiry({
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
        carId,
        carName,
      });
    } catch (err) {
      console.error('Error saving enquiry:', err);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 px-4 rounded-xl bg-[#151515] border border-[#26262B] hover:border-[#C8AD78] hover:text-[#C8AD78] text-gray-200 font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition"
      >
        <Mail className="w-4 h-4 text-[#C8AD78]" />
        <span>Request Test Drive / Call Back</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-[#26262B] w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
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
                <CheckCircle className="w-12 h-12 text-[#C8AD78] mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif">Enquiry Sent!</h3>
                <p className="text-gray-400 text-xs">
                  Thank you, {name}. Your inquiry has been submitted and you are being redirected to WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center pt-2">
                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] text-xs font-bold uppercase rounded-xl flex items-center space-x-2 transition shadow-md"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-[#151515]" />
                      <span>Open in WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSubmitted(false);
                    }}
                    className="px-5 py-2.5 bg-[#1C1C22] border border-[#2D2D35] text-white text-xs font-bold rounded-xl uppercase"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#222227] pb-3">
                  <span className="text-[10px] font-bold text-[#C8AD78] uppercase tracking-wider">
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
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C8AD78]"
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
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="emiAssistance"
                    checked={interestedInEmi}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setInterestedInEmi(checked);
                      if (checked && !message.includes('EMI')) {
                        setMessage((prev) => `${prev} [Interested in EMI / Loan Assistance for Kerala Registered Car]`);
                      }
                    }}
                    className="rounded border-gray-700 bg-[#111113] text-[#C8AD78] focus:ring-[#C8AD78] w-3.5 h-3.5 cursor-pointer accent-[#C8AD78]"
                  />
                  <label htmlFor="emiAssistance" className="text-xs text-gray-300 font-medium cursor-pointer">
                    Interested in EMI / Loan options (Kerala registered car)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition shadow-lg"
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
