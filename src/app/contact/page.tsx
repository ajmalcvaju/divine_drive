'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';
import { submitEnquiry } from '@/lib/firebase/enquiries';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredCar, setPreferredCar] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    const whatsappNumber = DEFAULT_DEALERSHIP_SETTINGS.whatsapp;
    const textLines = [
      `*New Enquiry - Divine Drive*`,
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      preferredCar.trim() ? `*Preferred Car / Budget:* ${preferredCar.trim()}` : null,
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
        message: `${preferredCar ? `[Preferred Car/Budget: ${preferredCar}] ` : ''}${message}`,
      });
    } catch (error) {
      console.error('Error recording enquiry to database:', error);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Redirect user to WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-[#111113] py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em]">
                GET IN TOUCH
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
                Ready to Find Your <span className="text-[#C8AD78]">Next Car?</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
                Fill out the form and our team will reach out to you within 24 hours. Or connect with us directly via WhatsApp for instant assistance.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`}
                className="p-5 rounded-2xl bg-[#151515] border border-[#26262B] hover:border-[#C8AD78] flex items-center space-x-4 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call Us</p>
                  <p className="text-base font-bold text-white group-hover:text-[#C8AD78] transition">
                    {DEFAULT_DEALERSHIP_SETTINGS.phone}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#151515] border border-[#26262B] hover:border-[#C8AD78] flex items-center space-x-4 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78]">
                  <WhatsAppIcon className="w-6 h-6 fill-[#C8AD78]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <p className="text-base font-bold text-white group-hover:text-[#C8AD78] transition">
                    Quick Response Guaranteed
                  </p>
                </div>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#151515] border border-[#26262B] space-y-3">
              <div className="flex items-center space-x-2 text-white font-serif font-bold">
                <MapPin className="w-5 h-5 text-[#C8AD78]" />
                <span>Divine Drives Showroom</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed pl-7">
                {DEFAULT_DEALERSHIP_SETTINGS.address}
              </p>
              <div className="bg-[#111113] p-3 rounded-xl border border-[#26262B] text-xs text-gray-300 ml-7">
                <span className="text-gray-500">Plus Code: </span>
                <span className="font-mono font-bold text-[#C8AD78]">{DEFAULT_DEALERSHIP_SETTINGS.plusCode}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400 pl-7 pt-2">
                <Clock className="w-4 h-4 text-[#C8AD78]" />
                <span>{DEFAULT_DEALERSHIP_SETTINGS.businessHours.weekdays}</span>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-[#151515] p-8 sm:p-10 rounded-2xl border border-[#26262B] shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-5">
                <CheckCircle2 className="w-16 h-16 text-[#C8AD78] mx-auto" />
                <h3 className="text-2xl font-bold text-white font-serif">Message Sent!</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Your enquiry has been received and you are being redirected to WhatsApp with your details.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] text-xs font-bold uppercase rounded-xl flex items-center space-x-2 transition shadow-lg"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-[#151515]" />
                      <span>Open in WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setPreferredCar('');
                      setMessage('');
                    }}
                    className="px-6 py-3 bg-[#1C1C22] hover:bg-[#25252E] border border-[#2D2D35] text-white text-xs font-bold uppercase rounded-xl transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 97441 98199"
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Preferred Car / Budget (Optional)</label>
                  <input
                    type="text"
                    value={preferredCar}
                    onChange={(e) => setPreferredCar(e.target.value)}
                    placeholder="e.g. SUV under ₹25 Lakhs"
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Your Message (Optional)</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full bg-[#111113] border border-[#2A2A30] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8AD78]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Send via WhatsApp / Submit'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section matching Screenshots 9 & 10 */}
        <div className="pt-12 border-t border-[#1F1F24] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">VISIT US</span>
            <h2 className="text-3xl font-extrabold text-white font-serif">Showroom Location</h2>
            <p className="text-xs text-gray-400">Visit our showroom to explore our premium collection in person.</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#232328] bg-[#141417] h-[400px] relative shadow-2xl">
            <iframe
              title="Divine Drive Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.8155507834867!2d75.89675246823698!3d11.348179223745179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6437b1fe9fe0f%3A0x197b5bdca1d8f2c6!2sDivine%20Drive!5e0!3m2!1sen!2sin!4v1791874337732!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
