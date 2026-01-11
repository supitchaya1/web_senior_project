import { User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen gradient-hero py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-highlight text-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          {/* User Info */}
          <h1 className="text-2xl font-bold text-foreground dark:text-white mb-1">{user.name}</h1>
          <p className="text-muted-foreground dark:text-white/70 mb-6">{user.email}</p>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start dark:text-white dark:border-white/30">
              <Settings size={18} className="mr-3" />
              จัดการบัญชี
            </Button>
            <Button variant="outline" className="w-full justify-start dark:text-white dark:border-white/30">
              <User size={18} className="mr-3" />
              สลับบัญชี
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive dark:border-white/30"
            >
              <LogOut size={18} className="mr-3" />
              ออกจากระบบ
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
