
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language === 'fr' ? 'fr' : 'en'); // only 'en' or 'fr'
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();

  const toggleNav = () => setIsOpen(!isOpen);

  // Toggle between 'en' and 'fr' on each click
  const toggleLanguage = () => {
    const newLang = selectedLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    setSelectedLang(newLang);
  };

  return (
    <nav 
      className={`w-full z-30 ${transparent ? 'absolute bg-transparent' : 'sticky top-0 bg-white dark:bg-background shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
              <span className={`ml-2 font-bold text-xl ${transparent ? 'text-white' : 'text-primary dark:text-white'}`}>
                {t("HEALTHCONNECT")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md font-medium ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'}`}>
              {t("Home")}
            </Link>
            <Link to="/doctors" className={`px-3 py-2 rounded-md font-medium ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'}`}>
              {t("Doctors")}
            </Link>
            <Link to="/services" className={`px-3 py-2 rounded-md font-medium ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'}`}>
              {t("Services")}
            </Link>
            <Link to="/about" className={`px-3 py-2 rounded-md font-medium ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'}`}>
              {t("About")}
            </Link>
            <Link to="/contact" className={`px-3 py-2 rounded-md font-medium ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'}`}>
              {t("Contact")}
            </Link>
            <div className="ml-6 flex items-center space-x-4">
              {/* Language toggle button */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center space-x-1 rounded-md px-3 py-2 font-medium ${
                  transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'
                }`}
                aria-label="Toggle Language"
                type="button"
              >
                <span className="capitalize">{selectedLang === 'en' ? 'English' : 'Français'}</span>
              </button>
              {/* Theme toggle */}
              <button
                className={
                  "rounded-full p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                }
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                type="button"
              >
                <Sun className="h-5 w-5" />
              </button>
              <Button asChild variant={transparent ? "secondary" : "outline"} size="sm" className="mr-2">
                <Link to="/login">{t("Login")}</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link to="/register">{t("Register")}</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNav}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10'
              }`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-background" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
              {t("Home")}
            </Link>
            <Link to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
              {t("Doctors")}
            </Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
              {t("Services")}
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
              {t("About")}
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
              {t("Contact")}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 space-y-1">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900/10">
                {t("Login")}
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 dark:text-primary dark:hover:bg-gray-900/10">
                {t("Register")}
              </Link>
              {/* Theme toggle on mobile */}
              <button
                className="mt-2 w-full flex justify-center rounded-full p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                type="button"
              >
                <Sun className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

