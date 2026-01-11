import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      number: 1,
      title: 'บันทึกเสียง/ อัปโหลดไฟล์เสียง/ พิมพ์ข้อความ',
    },
    {
      number: 2,
      title: 'ประมวลผล',
    },
    {
      number: 3,
      title: 'ผลลัพธ์วิดีโอภาษามือ',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Lavender gradient for light, Navy for dark */}
      <section className="bg-gradient-to-b from-[#E8D5F0] to-white dark:from-[#1a2f44] dark:to-[#0F1F2F] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-[#0F1F2F] dark:text-white mb-6 leading-tight">
              แปลเสียงและข้อความ
              <br />
              เป็นภาษามือ
            </h1>

            <Link to="/translate">
              <Button
                size="lg"
                className="bg-[#FEC530] hover:bg-[#e5b02b] text-[#0F1F2F] font-semibold text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all group"
              >
                เริ่มใช้งาน
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>

            <p className="text-[#213B54]/70 dark:text-white/70 mt-6 text-base">
              เข้าสู่ระบบเพื่อบันทึกประวัติ หรือใช้งานได้ทันทีโดยไม่ต้องลงทะเบียน
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 bg-white dark:bg-[#0F1F2F]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-center text-[#0F1F2F] dark:text-white mb-10"
          >
            ใช้งานง่ายใน 3 ขั้นตอน
          </motion.h2>

          {/* Divider line */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-px bg-[#FEC530]"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FEC530] text-[#0F1F2F] flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {step.number}
                </div>
                <p className="text-[#0F1F2F] dark:text-white font-medium text-sm">
                  {step.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
