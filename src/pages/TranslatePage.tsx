import { useState, useRef } from 'react';
import { Mic, Upload, X, FileAudio } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function TranslatePage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setShowUploadModal(false);
    }
  };

  const handleSubmit = () => {
    const hasResult = Math.random() > 0.3;
    if (hasResult) {
      navigate('/result');
    } else {
      setShowNotFoundModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8D5F0] to-white dark:from-[#1a2f44] dark:to-[#0F1F2F] py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-[#0F1F2F] dark:text-white text-center mb-8"
        >
          แปลเสียงและข้อความเป็นภาษามือ
        </motion.h1>

        <div className="space-y-4">
          {/* Voice Recording Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#1a2f44] rounded-xl p-5 border border-gray-200 dark:border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Mic size={18} className="text-[#0F1F2F] dark:text-white" />
              <h2 className="font-semibold text-[#0F1F2F] dark:text-white text-sm">บันทึกเสียง</h2>
            </div>

            <div className="flex flex-col items-center py-6">
              {isRecording ? (
                <div className="relative">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-[#213B54] flex items-center justify-center cursor-pointer"
                    onClick={handleStopRecording}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-white rounded-full"
                          animate={{
                            height: [8, 20, 8],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.5,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="w-14 h-14 rounded-full bg-[#C9A7E3] flex items-center justify-center hover:bg-[#C9A7E3]/80 transition-colors"
                >
                  <Mic size={24} className="text-[#0F1F2F]" />
                </button>
              )}
              <p className="text-[#213B54]/70 dark:text-white/70 mt-3 text-sm">
                {isRecording ? 'กำลังบันทึก... คลิกเพื่อหยุด' : 'บันทึกเสียง'}
              </p>
            </div>
          </motion.div>

          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1a2f44] rounded-xl p-5 border border-gray-200 dark:border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileAudio size={18} className="text-[#FEC530]" />
              <h2 className="font-semibold text-[#0F1F2F] dark:text-white text-sm">อัปโหลดไฟล์เสียง</h2>
            </div>

            <div className="flex flex-col items-center">
              {audioFile ? (
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-[#213B54] rounded-lg w-full">
                  <FileAudio size={18} className="text-[#0F1F2F] dark:text-white" />
                  <span className="text-[#0F1F2F] dark:text-white text-sm flex-1 truncate">{audioFile.name}</span>
                  <button
                    onClick={() => setAudioFile(null)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded"
                  >
                    <X size={14} className="text-gray-500 dark:text-white/70" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(true)}
                  className="w-full border border-gray-300 dark:border-white/30 text-[#213B54] dark:text-white bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-sm"
                >
                  <Upload size={16} className="mr-2" />
                  เลือกไฟล์เสียง
                </Button>
              )}
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                *ไฟล์เสียงของคุณจะถูกใช้เพื่อการแปลเท่านั้น และจะถูกลบโดยอัตโนมัติหลังเสร็จสิ้นการแปล
              </p>
            </div>
          </motion.div>

          {/* Text Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#1a2f44] rounded-xl p-5 border border-gray-200 dark:border-white/10"
          >
            <h2 className="font-semibold text-[#FEC530] mb-3 text-sm">
              ข้อความที่ได้ / พิมพ์ข้อความ
            </h2>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ข้อความจะแสดงที่นี่หลังบันทึกเสียง หรือคุณสามารถพิมพ์ข้อความที่ต้องการได้"
              className="min-h-[100px] resize-none bg-gray-50 dark:bg-[#213B54] border-gray-200 dark:border-white/10 text-[#0F1F2F] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 text-sm"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full bg-[#213B54] hover:bg-[#1a2f44] text-white font-semibold py-5 rounded-xl text-sm"
            >
              สร้างสรุป คำสำคัญ และวิดีโอภาษามือ
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#1a2f44]">
          <DialogHeader>
            <DialogTitle className="text-[#0F1F2F] dark:text-white">อัพโหลดไฟล์</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-lg">
            <Upload size={40} className="text-gray-400 dark:text-white/40 mb-4" />
            <p className="text-gray-500 dark:text-white/60 mb-2 text-sm">วางไฟล์ที่นี่ หรือ</p>
            <Button
              variant="link"
              onClick={() => fileInputRef.current?.click()}
              className="text-[#FEC530]"
            >
              อัพโหลดไฟล์
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Not Found Modal */}
      <Dialog open={showNotFoundModal} onOpenChange={setShowNotFoundModal}>
        <DialogContent className="sm:max-w-md text-center bg-white dark:bg-[#1a2f44]">
          <div className="py-6">
            <div className="text-5xl mb-4">🤟</div>
            <h2 className="text-lg font-bold text-[#0F1F2F] dark:text-white mb-2">
              ขออภัย ไม่พบคำศัพท์นี้
            </h2>
            <p className="text-gray-500 dark:text-white/60 mb-6 text-sm">
              ระบบยังไม่มีข้อมูลภาษามือสำหรับคำที่คุณพูด กรุณาลองพูดใหม่อีกครั้ง
              หรือใช้คำที่มีความหมายใกล้เคียง
            </p>
            <Button
              onClick={() => setShowNotFoundModal(false)}
              className="bg-[#213B54] hover:bg-[#1a2f44] text-white"
            >
              พูดอีกครั้ง
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
