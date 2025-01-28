"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import LanguageToggle from "./language-toggle";
import ThemeToggle from "./theme-toggle";

const locales = {
  en: {
    mosque: "Mosque",
    news: "News",
    activities: "Activities",
    visit3d: "3D Visit",
    prayerTimes: "Prayer Times",
    contact: "Contact",
  },
  ar: {
    mosque: "المسجد",
    news: "الأخبار",
    activities: "الأنشطة",
    visit3d: "زيارة ثلاثية الأبعاد",
    prayerTimes: "أوقات الصلاة",
    contact: "اتصل بنا",
  },
  fr: {
    mosque: "La Mosquée",
    news: "Actualités",
    activities: "Activités",
    visit3d: "Visite 3D",
    prayerTimes: "Horaires de Prière",
    contact: "Contact",
  },
};

const Navbar = () => {
  const params = useParams<{ locale: string }>();
  const local = params.locale;

  const [isOpen, setIsOpen] = useState(false);
  const [currentLang] = useState("fr");

  const toggleMenu = () => setIsOpen(!isOpen);

  const t = locales[currentLang as keyof typeof locales];

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className=" hover:text-primary text-sm hover:font-semibold px-2 py-3"
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 z-[999] w-full  bg-background backdrop-blur-md  border-b ">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink href="/">
              <div className="flex items-center">
                {/* <img
                  className="h-12 w-auto"
                  src="/api/placeholder/48/48"
                  alt="Mosque Logo"
                /> */}
                <h1 className="mr-3 font-semibold">Mosquée Dare SALAM</h1>

                {/* <Moon className="fill-primary" /> */}
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink href={`/${local}/about`}>{t.mosque}</NavLink>
            <NavLink href={`/${local}/news`}>{t.news}</NavLink>
            <NavLink href={`/${local}/activities`}>{t.activities}</NavLink>
            <NavLink href={`/${local}/invest`}>Investir</NavLink>
            <NavLink href={`/${local}/prayers-times`}>{t.prayerTimes}</NavLink>
            <NavLink href={`/${local}/contact`}>{t.contact}</NavLink>

            <div className="flex items-center space-x-5">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md "
            >
              {isOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href={`/${local}/about`}>
              <div className="block px-3 py-2 rounded">{t.mosque}</div>
            </NavLink>
            <NavLink href={`/${local}/news`}>
              <div className="block px-3 py-2 rounded-md">{t.news}</div>
            </NavLink>
            <NavLink href={`/${local}/activities`}>
              <div className="block px-3 py-2 rounded-md">{t.activities}</div>
            </NavLink>
            <NavLink href={`/${local}/prayers-times`}>
              <div className="block px-3 py-2 rounded-md">{t.prayerTimes}</div>
            </NavLink>
            <NavLink href={`/${local}/contact`}>
              <div className="block px-3 py-2 rounded-md">{t.contact}</div>
            </NavLink>

            {/* Mobile Language Switcher */}
            {/* <div className="px-3 py-2">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => changeLanguage("en")}
                  className="text-left rounded-md px-2 py-1"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ar")}
                  className="text-left rounded-md px-2 py-1"
                >
                  العربية
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className="text-left rounded-md px-2 py-1"
                >
                  Français
                </button>
              </div>
            </div> */}

            <div className="flex flex-col items-start ml-3.5 space-y-2">
              <LanguageToggle align="start" />
              <ThemeToggle align="start" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
