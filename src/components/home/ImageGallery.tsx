'use client';

import React, { useState } from 'react';
import { GALLERY_IMAGES } from '@/lib/initialData';
import { Camera, Maximize2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Visual Evidence & Research Media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            E-Waste & <span className="text-emerald-700">Recycling</span> Media
          </h2>
          <p className="text-slate-600 text-base">
            High-resolution imagery documenting discarded hardware, PCB teardowns, circular processing facilities, and eco technology.
          </p>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-4/3 relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-600/90 text-white">
                      {item.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1">{item.caption}</p>
                </div>
              </div>

              {/* Mobile Visible Caption Bar */}
              <div className="p-4 bg-white sm:hidden border-t border-slate-100">
                <span className="text-[10px] font-semibold text-emerald-800 uppercase">{item.category}</span>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal
          isOpen={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="relative max-h-[65vh] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-slate-400">Credit: {selectedImage.credit}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedImage.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedImage.caption}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
