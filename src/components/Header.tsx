'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { items } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const totalItems = isClient ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="bg-dark text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* public/logo-icon.png නමින් logo එකක් දාන්න ඕන */}
          <Image src="/logo-icon.png" alt="SatWay Logo" width={40} height={40} />
          <div><span className="text-3xl font-bold text-primary">Sat</span><span className="text-3xl font-bold text-white">Way</span></div>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <Link href="/admin" className="hover:text-primary">Admin</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative p-2"><ShoppingCartIcon className="h-7 w-7" />{totalItems > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">{totalItems}</span>)}</Link>
          <Link href="/login" className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Login</Link>
        </div>
      </div>
    </header>
  );
}
