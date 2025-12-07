'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

            const links = [
              { href: '/', label: 'Home' },
              { href: '/landing', label: 'Demo 0: Cognitive Load' },
              { href: '/demo1', label: 'Demo 1: Gestalt' },
              { href: '/demo2', label: 'Demo 2: Schema' },
              { href: '/demo3', label: 'Demo 3: Trust' },
              { href: '/demo4', label: 'Demo 4: Dopamine' },
              { href: '/final', label: 'Summary' },
            ];

  const isActive = (href: string) => {
    // For home page, only highlight on exact match
    if (href === '/') {
      return pathname === '/';
    }
    // For demo routes, highlight if pathname starts with the href (includes subpages)
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Psychology of Design</span>
          </div>
          <div className="flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
