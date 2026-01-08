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
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-primary-foreground font-medium transition-colors hover:text-accent ${
                  isActive(link.path) ? 'text-accent' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium transition-all hover:scale-105"
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

          {/* Auth Buttons / Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-secondary-foreground" />
                    )}
                  </div>
                  <span className="text-primary-foreground font-medium">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
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
                  <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
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
                    className={`block py-2 px-4 rounded-lg text-primary-foreground font-medium transition-colors ${
                      isActive(link.path) ? 'bg-primary-foreground/20' : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-primary-foreground/20 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-primary-foreground"
                      >
                        โปรไฟล์
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left py-2 px-4 text-primary-foreground"
                      >
                        ออกจากระบบ
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-center rounded-lg border border-primary-foreground text-primary-foreground"
                      >
                        เข้าสู่ระบบ
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 text-center rounded-lg bg-secondary text-secondary-foreground font-medium"
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
