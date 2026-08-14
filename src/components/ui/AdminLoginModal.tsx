'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Modal } from '@/components/ui/Modal';
import { Lock, KeyRound, ShieldAlert, CheckCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, loginAdmin } = useAdmin();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(pinInput);
    if (success) {
      setPinInput('');
    } else {
      setErrorMsg('Invalid Security PIN. Access denied.');
    }
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => {
        setErrorMsg('');
        setPinInput('');
        closeLoginModal();
      }}
      title="Admin Access Authentication"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-slate-800">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Portfolio Owner Verification</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Visitors have read-only access. Enter your Roll Number or Admin PIN to enable edit and CRUD controls.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Admin PIN / Roll Number
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm font-bold tracking-wider"
              autoFocus
              required
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={closeLoginModal}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Unlock Admin Controls</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
