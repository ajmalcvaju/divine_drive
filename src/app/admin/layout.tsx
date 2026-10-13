'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Car, 
  Image as ImageIcon, 
  Inbox, 
  Settings, 
  LayoutDashboard, 
  LogOut, 
  PlusCircle, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { subscribeAuthState, logoutAdmin } from '@/lib/firebase/auth';
import { User } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAuthState((currUser) => {
      setUser(currUser);
      setLoading(false);

      if (!currUser && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // If on login page, render children directly without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center text-white text-sm">
        Verifying administrator authorization...
      </div>
    );
  }

  const navItems = [
    { href: '/admin/cars', label: 'Inventory Cars', icon: Car },
    { href: '/admin/cars/new', label: 'Add New Car', icon: PlusCircle },
    { href: '/admin/gallery', label: 'Gallery Manager', icon: ImageIcon },
    { href: '/admin/settings', label: 'Dealership Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex text-gray-200">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#141417] border-r border-[#222226] p-6 justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="relative h-10 w-36 flex items-center">
              <Image
                src="/logo-white.png"
                alt="Divine Drive Admin"
                fill
                sizes="150px"
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <span className="text-[9px] bg-red-950/80 text-red-400 border border-red-800/40 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
              ADMIN
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-[#E51937] text-white shadow-md shadow-red-950/40'
                      : 'text-gray-400 hover:bg-[#1C1C22] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-[#222226] space-y-3">
          <div className="flex items-center space-x-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#E51937]/10 border border-[#E51937]/30 text-[#E51937] flex items-center justify-center font-bold">
              A
            </div>
            <div className="truncate">
              <p className="font-bold text-white truncate">{user?.email || 'Administrator'}</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
          </div>

          <button
            onClick={() => logoutAdmin()}
            className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-[#1C1C22] border border-[#2A2A32] text-xs font-semibold text-gray-300 hover:text-red-400 hover:border-red-900 transition"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </button>

          <Link href="/" target="_blank" className="block text-center text-[11px] text-gray-500 hover:text-white pt-2">
            View Live Public Site ↗
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-[#141417] border-b border-[#222226] px-4 py-3 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="relative h-7 w-28 flex items-center">
              <Image
                src="/logo-white.png"
                alt="Divine Drive Admin"
                fill
                sizes="110px"
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <span className="text-[8px] bg-red-950/80 text-red-400 border border-red-800/40 px-1 py-0.5 rounded font-mono font-bold uppercase">
              ADMIN
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-300">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#141417] border-b border-[#222226] p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === item.href ? 'bg-[#E51937] text-white' : 'text-gray-400'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => logoutAdmin()}
              className="w-full text-left py-2 text-xs text-red-400 font-semibold"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Page Children */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
