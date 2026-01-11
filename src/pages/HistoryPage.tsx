import { useState } from 'react';
import { Search, Calendar, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface HistoryItem {
  id: string;
  date: string;
  text: string;
}

export default function HistoryPage() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      date: '2/9/2568',
      text: 'AI เป็นเทคโนโลยีหน่วยมาช่วยในการเรียนรู้สายพันธุ์นกที่เราไม่รู้จักและสามารถบอกแหล่งน้ำที่นกอาศัยอยู่ได้',
    },
    {
      id: '2',
      date: '30/8/2568',
      text: 'แมว เป็นสัตว์เลี้ยงลูกด้วยนมสัตว์เนื้อขนาดเล็ก โดยแมวบ้านปัจจุบันสืบเชื้อสายในวงศ์เสือและแมว',
    },
  ];

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-hero py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-8"
          >
            ประวัติการแปล
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-highlight text-center py-16"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">
              เข้าสู่ระบบเพื่อดูประวัติ
            </h2>
            <p className="text-muted-foreground dark:text-white/70 mb-6">
              กรุณาเข้าสู่ระบบเพื่อดูประวัติการแปลเสียงของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-secondary text-white">เข้าสู่ระบบ</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="dark:text-white dark:border-white/30">สร้างบัญชี</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-8"
        >
          ประวัติการแปล
        </motion.h1>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-highlight mb-6"
        >
          <h2 className="font-semibold text-foreground dark:text-white mb-4">ค้นหาและคัดกรอง</h2>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/50"
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาข้อความ หรือคำสำคัญ"
                className="pl-10 dark:bg-secondary dark:text-white dark:placeholder:text-white/50"
              />
            </div>
            <Button variant="outline" size="icon" className="dark:border-white/30 dark:text-white">
              <Filter size={18} />
            </Button>
          </div>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-highlight"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-muted-foreground dark:text-white/50" />
                    <span className="text-sm text-muted-foreground dark:text-white/70">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-foreground dark:text-white line-clamp-2">{item.text}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex items-center gap-1 bg-secondary text-white hover:bg-navy-light"
                  >
                    <Eye size={14} />
                    <span className="hidden sm:inline">ดูวิดีโอ</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 dark:text-white dark:border-white/30"
                  >
                    <Edit size={14} />
                    <span className="hidden sm:inline">แก้ไข</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">ลบ</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">ยืนยันการลบประวัติ</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-muted-foreground">
              คุณต้องการลบประวัตินี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-center">
            <Button variant="destructive" onClick={confirmDelete}>
              ลบ
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
