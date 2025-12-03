'use client';

import Link from 'next/link';
import { Logo } from './logo';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ items, activeItem, onItemClick, isOpen = true, onClose }: SidebarProps) {
  const sidebarContent = (
    <>
      <div className="p-5 border-b border-slate-800/50">
        <Logo size="sm" />
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onItemClick(item.id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeItem === item.id
                ? 'bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-white border border-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <Link
          href="/docs"
          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Documentation
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950/50 border-r border-slate-800/50 backdrop-blur-xl z-20 hidden lg:flex flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950 border-r border-slate-800/50 z-50 flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between p-5 border-b border-slate-800/50">
              <Logo size="sm" />
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
