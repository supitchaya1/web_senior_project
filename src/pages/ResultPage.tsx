import { useState } from 'react';
import { ArrowLeft, Play, Download, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-b from-[#E8D5F0] to-[#FEFBF4] dark:from-[#1a2f44] dark:to-[#0F1F2F] py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-[#263F5D] dark:text-[#D8C0D0] text-center mb-8"
        >
          ผลลัพธ์
        </motion.h1>

        <div className="space-y-4">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-2 border-[#223C55] dark:border-[#213B54] rounded-xl p-5 bg-[#A6BFE3]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Video size={18} className="text-[#263F5D]" />
              <h2 className="font-semibold text-[#263F5D] text-sm">วิดีโอภาษามือ</h2>
            </div>

            <div className="relative aspect-video bg-[#213B54] rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Play size={24} className="text-white ml-1" />
                </button>
              </div>
            </div>

            <Button className="w-full bg-[#0F1F2F] hover:bg-[#1a2f44] text-[#C9A7E3] text-sm">
              <Download size={16} className="mr-2" />
              ดาวน์โหลดวิดีโอ
            </Button>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-[#223C55] dark:border-[#213B54] rounded-xl p-5 bg-[#A6BFE3]"
          >
            <h2 className="font-semibold text-[#263F5D] mb-3 text-sm">ข้อความ</h2>
            <p className="text-[#263F5D] leading-relaxed text-sm">{mockData.text}</p>
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-[#223C55] dark:border-[#213B54] rounded-xl p-5 bg-[#A6BFE3]"
          >
            <h2 className="font-semibold text-[#263F5D] mb-3 text-sm">สรุป</h2>
            <p className="text-[#263F5D] leading-relaxed text-sm">{mockData.summary}</p>
          </motion.div>

          {/* Keywords Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-2 border-[#223C55] dark:border-[#213B54] rounded-xl p-5 bg-[#A6BFE3]"
          >
            <h2 className="font-semibold text-[#263F5D] mb-3 text-sm"># คำสำคัญ</h2>
            <div className="flex flex-wrap gap-2">
              {mockData.keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  className="bg-[#0F1F2F] text-[#C9A7E3] px-3 py-1 text-xs"
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
            className="grid grid-cols-2 gap-3"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/translate')}
              className="py-5 text-[#263F5D] border-2 border-[#223C55] bg-white/50 hover:bg-white/70 text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              ย้อนกลับแก้ไข
            </Button>
            <Button
              onClick={() => navigate('/translate')}
              className="bg-[#0F1F2F] hover:bg-[#1a2f44] text-[#C9A7E3] py-5 text-sm"
            >
              สร้างเสียงใหม่
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}