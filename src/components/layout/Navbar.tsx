import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'หน้าหลัก' },
    { path: '/translate', label: 'แปลเสียง' },
    { path: '/history', label: 'ประวัติ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background dark:bg-primary border-b border-border dark:border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-gold' 
                    : 'text-foreground dark:text-white hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle - Center */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all hover:scale-105 bg-gold text-primary dark:bg-secondary dark:text-white"
          >
            {theme === 'light' ? (
              <>
                <Sun size={18} />
                <span className="hidden sm:inline">โหมดสว่าง</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span className="hidden sm:inline">โหมดมืด</span>
              </>
            )}
          </button>

          {/* Auth Buttons / Profile - Right */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-lavender dark:bg-lavender flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-primary" />
                    )}
                  </div>
                  <span className="text-foreground dark:text-white font-medium">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-border">
                        <p className="font-medium text-card-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-card-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        จัดการบัญชี
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-destructive hover:bg-muted transition-colors"
                      >
                        ออกจากระบบ
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-foreground/30 dark:border-white/50 text-foreground dark:text-white bg-transparent hover:bg-foreground/10 dark:hover:bg-white/10"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-lavender text-primary hover:bg-lavender/80">
                    สร้างบัญชี
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 px-4 rounded-lg font-medium transition-colors text-foreground dark:text-white ${
                      isActive(link.path) ? 'bg-gold/20 text-gold' : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-border space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-foreground dark:text-white"
                      >
                        โปรไฟล์
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left py-2 px-4 text-destructive"
                      >
                        ออกจากระบบ
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-center rounded-lg border border-foreground/30 dark:border-white/30 text-foreground dark:text-white"
                      >
                        เข้าสู่ระบบ
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-center rounded-lg bg-lavender text-primary font-medium"
                      >
                        สร้างบัญชีผู้ใช้
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
