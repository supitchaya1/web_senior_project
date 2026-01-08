import { Link } from 'react-router-dom';
import { ArrowRight, Mic, Upload, FileText, Hand } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      number: 1,
      title: 'บันทึกเสียง/ อัปโหลดไฟล์เสียง/ พิมพ์ข้อความ',
      icon: Mic,
    },
    {
      number: 2,
      title: 'ประมวลผล',
      icon: FileText,
    },
    {
      number: 3,
      title: 'ผลลัพธ์วิดีโอภาษามือ',
      icon: Hand,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              แปลเสียงและข้อความ
              <br />
              เป็นภาษามือ
            </h1>

            <Link to="/translate">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-gold-dark font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                เริ่มใช้งาน
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-muted-foreground mt-6 text-lg">
              {isAuthenticated
                ? 'เข้าสู่ระบบเพื่อบันทึกประวัติ หรือใช้งานได้ทันทีโดยไม่ต้องลงทะเบียน'
                : 'เข้าสู่ระบบเพื่อบันทึกประวัติ หรือใช้งานได้ทันทีโดยไม่ต้องลงทะเบียน'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center text-primary mb-12"
          >
            ใช้งานง่ายใน 3 ขั้นตอน
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="step-circle mx-auto mb-4">
                  {step.number}
                </div>
                <p className="text-foreground font-medium">
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
