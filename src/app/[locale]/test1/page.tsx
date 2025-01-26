'use client'

import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const locales = {
  en: {
    mosque: 'Mosque',
    news: 'News',
    activities: 'Activities',
    visit3d: '3D Visit',
    prayerTimes: 'Prayer Times',
    contact: 'Contact'
  },
  ar: {
    mosque: 'المسجد',
    news: 'الأخبار',
    activities: 'الأنشطة',
    visit3d: 'زيارة ثلاثية الأبعاد',
    prayerTimes: 'أوقات الصلاة',
    contact: 'اتصل بنا'
  },
  fr: {
    mosque: 'La Mosquée',
    news: 'Actualités',
    activities: 'Activités',
    visit3d: 'Visite 3D',
    prayerTimes: 'Horaires de Prière',
    contact: 'Contact'
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    // You can add your own language change handler here
  };

  const t = locales[currentLang as keyof typeof locales];

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-purple-800 hover:text-purple-600 transition-colors duration-200"
      onClick={(e) => {
        e.preventDefault();
        // Add your navigation logic here
        console.log(`Navigating to: ${href}`);
      }}
    >
      {children}
    </a>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink href="/">
              <div className="flex items-center">
                <img
                  className="h-12 w-auto"
                  src="/api/placeholder/48/48"
                  alt="Mosque Logo"
                />
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/mosque">{t.mosque}</NavLink>
            <NavLink href="/news">{t.news}</NavLink>
            <NavLink href="/activities">{t.activities}</NavLink>
            <NavLink href="/visit3d">{t.visit3d}</NavLink>
            <NavLink href="/prayer-times">{t.prayerTimes}</NavLink>
            <NavLink href="/contact">{t.contact}</NavLink>

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center text-purple-800">
                <Globe className="h-5 w-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1">
                  <button onClick={() => changeLanguage('en')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">English</button>
                  <button onClick={() => changeLanguage('ar')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">العربية</button>
                  <button onClick={() => changeLanguage('fr')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Français</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/mosque">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.mosque}</div>
            </NavLink>
            <NavLink href="/news">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.news}</div>
            </NavLink>
            <NavLink href="/activities">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.activities}</div>
            </NavLink>
            <NavLink href="/visit3d">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.visit3d}</div>
            </NavLink>
            <NavLink href="/prayer-times">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.prayerTimes}</div>
            </NavLink>
            <NavLink href="/contact">
              <div className="block px-3 py-2 text-purple-800 hover:bg-purple-100 rounded-md">{t.contact}</div>
            </NavLink>

            {/* Mobile Language Switcher */}
            <div className="px-3 py-2">
              <div className="flex flex-col space-y-2">
                <button onClick={() => changeLanguage('en')} className="text-left text-purple-800 hover:bg-purple-100 rounded-md px-2 py-1">English</button>
                <button onClick={() => changeLanguage('ar')} className="text-left text-purple-800 hover:bg-purple-100 rounded-md px-2 py-1">العربية</button>
                <button onClick={() => changeLanguage('fr')} className="text-left text-purple-800 hover:bg-purple-100 rounded-md px-2 py-1">Français</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;