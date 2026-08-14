'use client';

import React from 'react';
import { EvidenceFile } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Download, ExternalLink, FileText, Video, Image as ImageIcon } from 'lucide-react';

interface EvidenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceFile | null;
}

export const EvidenceViewerModal: React.FC<EvidenceViewerModalProps> = ({
  isOpen,
  onClose,
  evidence,
}) => {
  if (!evidence) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={evidence.name} maxWidth="4xl">
      <div className="space-y-4">
        {/* Content Render based on type */}
        <div className="relative min-h-[50vh] max-h-[70vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2">
          {evidence.type === 'image' && (
            <img
              src={evidence.url}
              alt={evidence.name}
              className="max-h-[65vh] w-auto object-contain rounded-xl"
            />
          )}

          {evidence.type === 'video' && (
            <video controls className="max-h-[65vh] w-full rounded-xl" src={evidence.url}>
              Your browser does not support the video tag.
            </video>
          )}

          {evidence.type === 'pdf' && (
            <iframe
              src={evidence.url}
              className="w-full h-[65vh] rounded-xl bg-white"
              title={evidence.name}
            />
          )}

          {(evidence.type === 'url' ||
            evidence.type === 'document' ||
            evidence.type === 'notebook' ||
            evidence.type === 'presentation' ||
            evidence.type === 'excel') && (
            <div className="text-center p-8 text-white space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-emerald-400">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold">{evidence.name}</h4>
                <p className="text-xs text-slate-400 mt-1">File Format: {evidence.type.toUpperCase()}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={evidence.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Open in New Tab
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-800">Attached:</span> {evidence.createdAt} •{' '}
            <span className="font-semibold text-slate-800">Size:</span> {evidence.size || 'N/A'}
          </div>

          <a
            href={evidence.url}
            download={evidence.name}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Download File</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};
