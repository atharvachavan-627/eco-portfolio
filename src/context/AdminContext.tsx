'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const DEFAULT_PIN = '24101C0006'; // Default PIN is Atharva's Roll Number or eco2026
const ALT_PIN = 'eco2026';
const ADMIN_STORAGE_KEY = 'ecoportfolio_admin_session_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const loginAdmin = (pin: string): boolean => {
    const cleaned = pin.trim();
    if (cleaned === DEFAULT_PIN || cleaned === ALT_PIN || cleaned.toLowerCase() === 'admin') {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      }
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        loginAdmin,
        logoutAdmin,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
