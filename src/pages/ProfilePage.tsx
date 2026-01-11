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
    <div className="min-h-screen bg-gradient-to-b from-[#E8D5F0] to-white dark:from-[#1a2f44] dark:to-[#0F1F2F] py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1a2f44] rounded-xl p-6 border border-gray-200 dark:border-white/10 text-center"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#213B54] mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>

          {/* User Info */}
          <h1 className="text-xl font-bold text-[#0F1F2F] dark:text-white mb-1">{user.name}</h1>
          <p className="text-gray-500 dark:text-white/60 text-sm mb-6">{user.email}</p>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start border-gray-200 dark:border-white/10 text-[#0F1F2F] dark:text-white text-sm">
              <Settings size={16} className="mr-3" />
              จัดการบัญชี
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-200 dark:border-white/10 text-[#0F1F2F] dark:text-white text-sm">
              <User size={16} className="mr-3" />
              สลับบัญชี
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start border-gray-200 dark:border-white/10 text-red-500 hover:text-red-600 text-sm"
            >
              <LogOut size={16} className="mr-3" />
              ออกจากระบบ
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
