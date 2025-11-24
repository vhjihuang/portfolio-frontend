'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: '首页', href: '/' },
    { name: '服务', href: '/services' },
    { name: '项目', href: '/projects' },
    { name: '博客', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: '关于', href: '/about' },
    { name: '联系', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50" style={{
      background: 'rgba(17, 24, 39, 0.8)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black gradient-text slide-in-left">
              Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-bold text-gray-300 hover:text-cyan-300 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black/30 zzz-card-hover"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-purple-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-300 block px-3 py-3 rounded-md text-base font-medium hover:bg-black/20 transition-all zzz-card-hover"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}