import { useState } from 'react';
import { ArrowLeft, Play, Download, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const mockData = {
    video: null,
    text: 'AI เป็นเทคโนโลยีที่สามารถนำมาช่วยในการเรียนรู้สายพันธุ์นกที่อยู่ตามพื้นที่ต่างๆที่เราไม่รู้จักและสามารถบอกแหล่งน้ำที่นกอาศัยอยู่ได้ จึงเป็นสิ่งที่น่าสนใจและน่าเรียนรู้',
    summary: 'AI เป็นเทคโนโลยีหน่วยมาช่วยในการเรียนรู้สายพันธุ์นกที่เราไม่รู้จักและสามารถบอกแหล่งน้ำที่นกอาศัยอยู่ได้',
    keywords: ['AI', 'นก', 'น้ำ', 'เทคโนโลยี'],
  };

  return (
    <div className="min-h-screen gradient-hero py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-primary text-center mb-8"
        >
          ผลลัพธ์
        </motion.h1>

        <div className="space-y-6">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-highlight"
          >
            <div className="flex items-center gap-2 mb-4">
              <Video size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">วิดีโอภาษามือ</h2>
            </div>

            <div className="relative aspect-video bg-card rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Play size={28} className="text-primary ml-1" />
                </button>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full"
            >
              <Download size={18} className="mr-2" />
              ดาวน์โหลดวิดีโอ
            </Button>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-highlight"
          >
            <h2 className="font-semibold text-foreground mb-3">ข้อความ</h2>
            <p className="text-foreground leading-relaxed">{mockData.text}</p>
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-highlight"
          >
            <h2 className="font-semibold text-foreground mb-3">สรุป</h2>
            <p className="text-foreground leading-relaxed">{mockData.summary}</p>
          </motion.div>

          {/* Keywords Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-highlight"
          >
            <h2 className="font-semibold text-foreground mb-3"># คำสำคัญ</h2>
            <div className="flex flex-wrap gap-2">
              {mockData.keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="bg-primary text-primary-foreground px-3 py-1 text-sm"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/translate')}
              className="py-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              ย้อนกลับแก้ไข
            </Button>
            <Button
              onClick={() => navigate('/translate')}
              className="bg-primary py-6"
            >
              สร้างเสียงใหม่
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
