import { useState, useRef } from 'react';
import { Mic, Upload, X, FileAudio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    // Simulate recording
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
    // Simulate processing - randomly show result or not found
    const hasResult = Math.random() > 0.3;
    if (hasResult) {
      navigate('/result');
    } else {
      setShowNotFoundModal(true);
    }
  };

  return (
    <div className="min-h-screen gradient-hero py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-primary text-center mb-8"
        >
          แปลเสียงและข้อความเป็นภาษามือ
        </motion.h1>

        <div className="space-y-6">
          {/* Voice Recording Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-highlight"
          >
            <div className="flex items-center gap-2 mb-4">
              <Mic size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">บันทึกเสียง</h2>
            </div>

            <div className="flex flex-col items-center py-8">
              {isRecording ? (
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                    onClick={handleStopRecording}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-primary-foreground rounded-full"
                          animate={{
                            height: [10, 25, 10],
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
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                </div>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <Mic size={28} className="text-primary" />
                </button>
              )}
              <p className="text-muted-foreground mt-4">
                {isRecording ? 'กำลังบันทึก... คลิกเพื่อหยุด' : 'บันทึกเสียง'}
              </p>
            </div>
          </motion.div>

          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-highlight"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileAudio size={20} className="text-accent" />
              <h2 className="font-semibold text-foreground">อัปโหลดไฟล์เสียง</h2>
            </div>

            <div className="flex flex-col items-center">
              {audioFile ? (
                <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
                  <FileAudio size={20} className="text-primary" />
                  <span className="text-foreground">{audioFile.name}</span>
                  <button
                    onClick={() => setAudioFile(null)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X size={16} className="text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(true)}
                  className="w-full border-dashed border-2"
                >
                  <Upload size={18} className="mr-2" />
                  เลือกไฟล์เสียง
                </Button>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                *ไฟล์เสียงของคุณจะถูกใช้เพื่อการแปลเท่านั้น และจะถูกลบโดยอัตโนมัติหลังเสร็จสิ้นการแปล
              </p>
            </div>
          </motion.div>

          {/* Text Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-highlight"
          >
            <h2 className="font-semibold text-accent mb-4">
              ข้อความที่ได้ / พิมพ์ข้อความ
            </h2>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ข้อความจะแสดงที่นี่หลังบันทึกเสียง หรือคุณสามารถพิมพ์ข้อความที่ต้องการได้"
              className="min-h-[120px] resize-none bg-background"
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
              className="w-full bg-primary hover:bg-navy-light text-primary-foreground font-semibold py-6 rounded-xl"
            >
              สร้างสรุป คำสำคัญ และวิดีโอภาษามือ
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>อัพโหลดไฟล์</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8 border-2 border-dashed border-border rounded-lg">
            <Upload size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">วางไฟล์ที่นี่ หรือ</p>
            <Button
              variant="link"
              onClick={() => fileInputRef.current?.click()}
              className="text-accent"
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
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-8">
            <div className="text-6xl mb-4">🤟</div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              ขออภัย ไม่พบคำศัพท์นี้
            </h2>
            <p className="text-muted-foreground mb-6">
              ระบบยังไม่มีข้อมูลภาษามือสำหรับคำที่คุณพูด กรุณาลองพูดใหม่อีกครั้ง
              หรือใช้คำที่มีความหมายใกล้เคียง
            </p>
            <Button
              onClick={() => setShowNotFoundModal(false)}
              className="bg-primary"
            >
              พูดอีกครั้ง
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
