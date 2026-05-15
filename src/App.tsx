/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  ChevronRight, 
  Star, 
  CheckCircle2,
  Calendar,
  Award,
  CirclePlay,
  ArrowRight
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Constants & Data ---
const LOGO_URL = "https://thinhgialand.com/wp-content/uploads/2025/12/Group-108-1.webp";

const IMAGES = {
  hero: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/539980104_1293066932606249_5994012548924105307_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ABfjo5yq-WoQ7kNvwG0N8b8&_nc_oc=AdpmgEGSuDkb3spXDZOur0aZobsT8bHaEkayqQCHXQiCr_j5LrNcY3kcHSwUcb9K6rc&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=tzwUVocMzlpkDO-QDwxifw&_nc_ss=7b2a8&oh=00_Af6L7KKRC4-GIMJqEp8A2GxCxxJEh8szxd4eKezCVK8pYw&oe=6A0B3848",
  christmas: "https://scontent.fsgn5-21.fna.fbcdn.net/v/t39.30808-6/603784141_1389375832975358_4513747090045962841_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=LlOO-zUdpSwQ7kNvwGydi-9&_nc_oc=AdoNFkgHyCKTLNKh3CDhylWUa6KV9yfNdCuy8R8T_irCyMfwBB99wxzrWygV4dGcc48&_nc_zt=23&_nc_ht=scontent.fsgn5-21.fna&_nc_gid=rccrL_CeuDRDIGjllAhMRw&_nc_ss=7b2a8&oh=00_Af4lYVa-ThIkIt0vzo3qFDVXY7hqWXx0nmRjZsiRhr1g7Q&oe=6A0B4420",
  newYear: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/618472494_1413140660598875_1135858364104885069_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=gQX5ZhEAQc8Q7kNvwFPvpBD&_nc_oc=AdqMIN6Wn9ztOJ6nqznUnZN-PpaO72c-dcXm69obUqMB8f9zFCx1c6mTtqRQxc5YvLA&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=-pcTVIJJR0-cJVo6ZKmnig&_nc_ss=7b2a8&oh=00_Af4QhyKk8YDOBvdVEl9DDGbphDyLnllnnZI1mAIWUsRdIg&oe=6A0B3A4D",
  summary: "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/618659978_1413376023908672_8688295378455072140_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=QAIBKfFRqUIQ7kNvwF7c4DL&_nc_oc=Adq2OKgRCm-EitYbbJUXq7Z-CBPWQUm4qIVeE2p7FG49WHVjVyVBofq-MmOtYF0eAcA&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=em4YkxHY3H6HELM62vmxYA&_nc_ss=7b2a8&oh=00_Af6tJlSNMi-nUPjRqnl4X-HI5qE1iPlOWA7ZbqbGmvnBlQ&oe=6A0B3476",
  womenDay: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/646912261_1446749837237957_271098852423904444_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=tBo4j8v9YnEQ7kNvwEn5DLw&_nc_oc=AdqD8uEaRp22s6gLb87F7-YuzJE-VtMP83J1IfHbLi0LSY4FoDapdo-a-Zpmbze-pKQ&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=cd-gV_V-c6EdbEUB0rwsCg&_nc_ss=7b2a8&oh=00_Af67vQBhonsZWhJxwwlGsH7eT39kAxXWJihgZ6d4Z7UV0A&oe=6A0B46E1",
  elite1: "https://scontent.fsgn5-21.fna.fbcdn.net/v/t39.30808-6/670271964_1476839460895661_5052556625953245605_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=s5B5lcb4uVMQ7kNvwHO_bgO&_nc_oc=AdrS173LTC5VDClc0tHmKrXBBYLsFkHUTLRMNfieyMW_E0usWqYVd6ojEh8q1bxVbHA&_nc_zt=23&_nc_ht=scontent.fsgn5-21.fna&_nc_gid=pVO4i10Nbn2_qfrFGlim-Q&_nc_ss=7b2a8&oh=00_Af5QleyxBuyYJomDRb6zbbFmJwPboMIux0jiLckOvJQeIQ&oe=6A0B465E",
  elite2: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/670485828_1476839540895653_2086191382901171291_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=EMBP9JGJB2oQ7kNvwGi8DGr&_nc_oc=Ado3abUFROI1AnAR7yU7UTv0GPJhOvoyhUjajmx-Rexe3oZ4e7qN_BzHJwkk8kYE4P4&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=P2iI2JgpWVZ1ETZ97E7gGg&_nc_ss=7b2a8&oh=00_Af7sLS2_JpsLDNK7F8STZfdNWoDzmia8kCPw9iOSgZrF8A&oe=6A0B4F2E",
  training: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/677307849_1484612273451713_7242927962256451985_n.jpg?stp=cp6_dst-jpegr_tt6&_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=LQCOOyd1yakQ7kNvwG8SbfI&_nc_oc=AdoA9800i8lkX96PRZDNeiyYnlUgnT8z3ujz8PQ4W4ikK-QbLdGZtP7FjDQbzmhMGO8&_nc_zt=23&se=-1&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=BAdPPNZN-Py6K4sb1GpgqQ&_nc_ss=7b2a8&oh=00_Af5ZbVVh3Xrm4GIE6vcSaj3znyYtFy6ead3Px_UUpkMIqw&oe=6A0B435B",
  project: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/585562858_1361796925733249_8558003078453524725_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Ps_A0PSi8BIQ7kNvwGedbvD&_nc_oc=AdqMwpvZSHXJ7ooU5dUYwsBsINOO5V3_Ur9eaJMy6nNw0XCsgzuMrCayrH-Z0YJUohs&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=R20GqbGWi4I1rjgkOMZoOQ&_nc_ss=7b2a8&oh=00_Af5q7CglQBaIJUZyot-OAgHdFnc8aC-Iwi8RAnTuk_wagQ&oe=6A0B4456",
  travel: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/528493786_1272373184675624_4036698589459976931_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1Ncht2RUD1kQ7kNvwF9V_c3&_nc_oc=AdpepCG44YHTPv61knGjy4AXUfV7eCrDFIP5JdF9PR06MUgr1KcMagmFK0Np2UXqXPw&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=9K7O1aJxwJ75_WtdXhFVcQ&_nc_ss=7b2a8&oh=00_Af4J_ip-XT7o9Vyz1AvoXMnd8mnmAeFxHa9x951eCiLfaw&oe=6A0B460A",
  cash: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/561360224_1332047018708240_243049151327938808_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ytulzOzZVP0Q7kNvwHTqkVY&_nc_oc=AdrC-08yG5SM-ASf-DIYUwR46j6w_AQ8hxx9DTXd3C8r0REI0aGdzRDH5BdMdY9TVA0&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=floXJlu5hEUvCRJpxSky2A&_nc_ss=7b2a8&oh=00_Af7vCWTaNZMpR7hHNmjqx6E-nVU-aOvJ5_Y3w8GDVg3kNw&oe=6A0B2EDF"
};

const STATS = [
  { label: "Thu nhập không giới hạn", icon: TrendingUp },
  { label: "Hỗ trợ Data khách hàng", icon: Users },
  { label: "Marketing chuyên nghiệp", icon: Star },
  { label: "Đào tạo thực chiến", icon: GraduationCap },
];

const REASONS = [
  { 
    title: "Thu nhập bứt phá", 
    desc: "Hoa hồng hấp dẫn nhất thị trường cùng các khoản thưởng nóng liên tục.",
    icon: TrendingUp 
  },
  { 
    title: "Hỗ trợ tuyệt đối", 
    desc: "Được hỗ trợ chi phí marketing, data khách hàng net chất lượng cao.",
    icon: Star 
  },
  { 
    title: "Hệ thống chuyên môn", 
    desc: "Quy trình làm việc bài bản, ứng dụng công nghệ hiện đại vào quản lý.",
    icon: Briefcase 
  },
  { 
    title: "Môi trường năng động", 
    desc: "Đội ngũ trẻ trung, đoàn kết, sẵn sàng hỗ trợ đồng đội cùng phát triển.",
    icon: Users 
  },
];

const JOBS = [
  {
    title: "Chuyên Viên Tư Vấn BĐS Cao Cấp",
    salary: "15M - 50M++",
    desc: "Tìm kiếm, tư vấn và chăm sóc khách hàng về các sản phẩm BĐS cao cấp tại Vũng Tàu.",
    tags: ["Full-time", "Hoa hồng cao", "Không yêu cầu KN"]
  },
  {
    title: "Trưởng Nhóm Kinh Doanh",
    salary: "30M - 100M++",
    desc: "Quản lý và dẫn dắt đội ngũ kinh doanh, đảm bảo KPI và phát triển nhân sự.",
    tags: ["Kinh nghiệm 1 năm", "Kỹ năng lãnh đạo", "Thưởng Quản lý"]
  }
];

const PROCESS = [
  { step: "01", title: "Gửi hồ sơ", desc: "Ứng tuyển trực tiếp qua website hoặc email." },
  { step: "02", title: "Phỏng vấn", desc: "Trao đổi trực tiếp về định hướng và năng lực." },
  { step: "03", title: "Đào tạo", desc: "Khóa đào tạo hội nhập và kỹ năng thực chiến." },
  { step: "04", title: "Nhận việc", desc: "Gia nhập đội ngũ và bắt đầu bứt phá thu nhập." }
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 27 days from now (May 14, 2026 -> June 10, 2026)
    const targetDate = new Date("2026-06-10T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[80px] border border-white/20">
      <span className="text-3xl font-black text-brand-gold">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-4 mt-8">
      <TimeUnit value={timeLeft.days} label="Ngày" />
      <TimeUnit value={timeLeft.hours} label="Giờ" />
      <TimeUnit value={timeLeft.minutes} label="Phút" />
      <TimeUnit value={timeLeft.seconds} label="Giây" />
    </div>
  );
};

const RecruitmentForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: 'Chuyên viên Tư vấn BĐS',
    cvUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', position: 'Chuyên viên Tư vấn BĐS', cvUrl: '' });
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-brand-brown-deep mb-4">Gửi thông tin thành công!</h3>
        <p className="text-brand-brown-secondary mb-8">Thịnh Gia Land sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-gold font-bold border-b-2 border-brand-gold pb-1"
        >
          Gửi thêm hồ sơ khác
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-brand-brown-deep mb-2">Họ và tên *</label>
          <input 
            type="text" 
            placeholder="Nguyễn Văn A" 
            className="w-full px-5 py-4 bg-brand-gray-light border-none rounded-xl focus:ring-2 focus:ring-brand-gold transition-all" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-brown-deep mb-2">Số điện thoại *</label>
          <input 
            type="tel" 
            placeholder="09xx xxx xxx" 
            className="w-full px-5 py-4 bg-brand-gray-light border-none rounded-xl focus:ring-2 focus:ring-brand-gold transition-all" 
            required 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-brand-brown-deep mb-2">Email ứng tuyển</label>
        <input 
          type="email" 
          placeholder="example@gmail.com" 
          className="w-full px-5 py-4 bg-brand-gray-light border-none rounded-xl focus:ring-2 focus:ring-brand-gold transition-all" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-brand-brown-deep mb-2">Vị trí ứng tuyển *</label>
        <select 
          className="w-full px-5 py-4 bg-brand-gray-light border-none rounded-xl focus:ring-2 focus:ring-brand-gold transition-all"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        >
          <option>Chuyên viên Tư vấn BĐS</option>
          <option>Trưởng nhóm Kinh doanh</option>
          <option>Chuyên viên Marketing</option>
          <option>Nhân viên Kế toán</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-brand-brown-deep mb-2">Link CV (Drive/Dropbox/LinkedIn)</label>
        <input 
          type="url" 
          placeholder="https://drive.google.com/..." 
          className="w-full px-5 py-4 bg-brand-gray-light border-none rounded-xl focus:ring-2 focus:ring-brand-gold transition-all" 
          value={formData.cvUrl}
          onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 text-sm font-medium">Có lỗi xảy ra. Hãy chắc chắn bạn đã cấu hình Service Account đúng!</p>
      )}

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className={`w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-brown-deep font-black py-5 rounded-2xl gold-glow shadow-lg transition-all text-xl ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {status === 'loading' ? 'ĐANG GỬI HỒ SƠ...' : 'GỬI HỒ SƠ ỨNG TUYỂN'}
      </button>
      <p className="text-center text-xs text-brand-brown-secondary italic">
        * Thông tin của bạn được cam kết bảo mật tuyệt đối.
      </p>
    </form>
  );
};

// --- Sub-components ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 glass shadow-md py-3" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <img src={LOGO_URL} alt="Thịnh Gia Land" className="h-10 md:h-12 w-auto object-contain" />
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#about" className="hover:text-brand-gold transition-colors">Về chúng tôi</a>
          <a href="#benefits" className="hover:text-brand-gold transition-colors">Quyền lợi</a>
          <a href="#jobs" className="hover:text-brand-gold transition-colors">Vị trí</a>
          <a href="#apply" className="bg-brand-gold text-brand-brown-deep px-6 py-2.5 rounded-full gold-glow hover:bg-brand-gold-hover transition-all flex items-center gap-2">
            Ứng tuyển ngay <ArrowRight size={18} />
          </a>
        </div>
        <button className="md:hidden text-brand-gold">
          <ChevronRight size={32} />
        </button>
      </div>
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`text-3xl md:text-5xl font-extrabold ${light ? "text-white" : "text-brand-brown-deep"} leading-tight`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="h-1.5 w-24 bg-brand-gold mx-auto mt-6 rounded-full"
    />
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            className="w-full h-full object-cover scale-105" 
            alt="Ảnh nền trang chủ" 
          />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full glass text-brand-gold font-semibold text-sm mb-6 border border-brand-gold/30 gold-glow">
                TUYỂN DỤNG ĐỘI NGŨ TINH ANH
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
                Gia nhập thế hệ <br />
                <span className="text-brand-gold">Môi giới tỷ đô</span>
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
                Môi trường chuyên nghiệp – Thu nhập đột phá – Phát triển sự nghiệp bền vững cùng Thịnh Gia Land tại Vũng Tàu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a href="#apply" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-brown-deep px-10 py-4 rounded-xl font-bold text-lg gold-glow transition-all text-center">
                  Cơ hội của bạn tại đây
                </a>
                <a href="#about" className="glass hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all text-center">
                  Về chúng tôi
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            >
              {STATS.map((stat, idx) => (
                <div key={idx} className="glass p-4 rounded-2xl flex items-center gap-3 border-l-4 border-l-brand-gold">
                  <div className="p-2 bg-brand-gold/20 rounded-lg">
                    <stat.icon className="text-brand-gold" size={20} />
                  </div>
                  <span className="text-white text-xs md:text-sm font-medium leading-tight">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Cuộn để xem</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-brand-gold rounded-full animate-scroll" />
          </div>
        </motion.div>
      </section>

      {/* --- GIỚI THIỆU --- */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img src={IMAGES.training} alt="Văn hóa Thịnh Gia Land" className="w-full aspect-[4/3] object-cover" />
              </motion.div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-tech-blue/10 rounded-full blur-3xl z-0" />
              
              <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl shadow-premium z-20 border-l-4 border-brand-gold max-w-[240px]">
                <p className="text-brand-brown-deep font-bold text-lg mb-1">Môi giới hàng đầu Vũng Tàu</p>
                <p className="text-brand-brown-secondary text-sm">Hệ sinh thái BĐS cao cấp dẫn đầu khu vực.</p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 block">Chân dung Thịnh Gia Land</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-brown-deep mb-8 leading-tight">
                Hơn cả một công ty,<br /> là một <span className="text-brand-gold">Gia đình Thịnh Vượng</span>
              </h2>
              <p className="text-lg text-brand-brown-secondary mb-8 leading-relaxed">
                Tại Thịnh Gia Land, chúng tôi không chỉ xây dựng những ngôi nhà, chúng tôi xây dựng sự nghiệp cho những con người khao khát khẳng định bản thân. Với triết lý <strong>"Tận tâm - Chuyên nghiệp - Minh bạch"</strong>, Thịnh Gia Land là nơi hội tụ của những chiến binh bất động sản xuất sắc nhất.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Tầm nhìn", text: "Với định hướng không ngừng đổi mới để phát triển lâu dài, Thịnh Gia Land quyết tâm từng bước trở thành đơn vị phân phối, phát triển bất động sản chuyên nghiệp hàng đầu Việt Nam và khu vực." },
                  { title: "Sứ mệnh", text: "Sứ mệnh của chúng tôi là phát triển đội ngũ nhân lực có chuyên môn, nghiệp vụ vững chắc để góp phần xây dựng môi trường kinh doanh bất động sản Vũng Tàu, TP.HCM được chuyên nghiệp hóa, tạo ra những nhà môi giới bất động sản chuyên nghiệp." },
                  { title: "Văn hóa", text: "Lấy con người làm trọng tâm, tử tế trong công việc, quyết liệt trong mục tiêu." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-brand-gray-light transition-all border border-transparent hover:border-brand-gold/20">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="text-brand-gold" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-brown-deep">{item.title}</h4>
                      <p className="text-brand-brown-secondary">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LỢI ÍCH --- */}
      <section id="benefits" className="py-24 bg-brand-gray-light relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Đặc quyền ứng viên" title="Tại sao 500+ nhân sự ưu tú chọn Thịnh Gia Land?" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {REASONS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-premium hover:shadow-2xl transition-all group border-b-8 border-transparent hover:border-brand-gold"
              >
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold transition-colors">
                  <item.icon className="text-brand-gold group-hover:text-white transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-brand-brown-deep mb-4">{item.title}</h3>
                <p className="text-brand-brown-secondary leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MÔI TRƯỜNG LÀM VIỆC --- */}
      <section className="py-24 bg-brand-brown-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-tech-blue rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeading light subtitle="Ký sự Thịnh Gia" title="Nơi đam mê được thắp sáng" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-2xl group relative">
              <img src={IMAGES.newYear} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="New Year Party" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white font-bold text-xl">Đêm tiệc Tất niên 2024</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative aspect-square">
              <img src={IMAGES.christmas} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Sự kiện" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative aspect-square">
              <img src={IMAGES.womenDay} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Sự kiện" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative aspect-square">
              <img src={IMAGES.travel} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Du lịch" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative aspect-square">
              <img src={IMAGES.cash} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Giải thưởng" />
            </div>
          </div>

          <div className="mt-16 bg-white/5 glass p-8 md:p-12 rounded-[3rem] border border-white/10">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { val: "500+", label: "Nhân sự trẻ năng động" },
                { val: "20+", label: "Sự kiện gắn kết mỗi năm" },
                { val: "Vũng Tàu", label: "Địa điểm làm việc lý tưởng" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-4xl md:text-6xl font-black text-brand-gold mb-3">{stat.val}</p>
                  <p className="text-white/70 font-medium uppercase tracking-widest text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VỊ TRÍ TUYỂN DỤNG --- */}
      <section id="jobs" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Cơ hội nghề nghiệp" title="Chọn vị trí tỏa sáng cùng chúng tôi" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {JOBS.map((job, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-brand-gray-light p-8 md:p-10 rounded-[3rem] border-2 border-transparent hover:border-brand-gold/30 hover:bg-white hover:shadow-premium transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-brand-brown-deep mb-4">{job.title}</h3>
                <div className="flex items-center gap-2 mb-6 text-brand-gold font-bold text-xl">
                  <TrendingUp size={20} />
                  <span>{job.salary}</span>
                </div>
                <p className="text-brand-brown-secondary mb-8 leading-relaxed">{job.desc}</p>
                <a href="#apply" className="inline-flex items-center gap-2 font-bold text-brand-brown-deep group border-b-2 border-brand-gold pb-1 transition-all">
                  Xem chi tiết & Ứng tuyển <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUY TRÌNH --- */}
      <section className="py-24 bg-brand-gray-light relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Lộ trình gia nhập" title="Chạm tay vào giấc mơ sau 4 bước" />
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-brand-gold/20 -translate-y-1/2 z-0" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {PROCESS.map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 rounded-full bg-white shadow-premium flex items-center justify-center mx-auto mb-8 relative border-4 border-white group-hover:border-brand-gold transition-all duration-500">
                    <span className="text-brand-gold font-black text-2xl">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-brand-brown-deep mb-4">{item.title}</h4>
                  <p className="text-brand-brown-secondary px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM ỨNG TUYỂN --- */}
      <section id="apply" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-brand-brown-deep rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative bg-cover bg-center min-h-[400px] lg:h-auto" style={{ backgroundImage: `url(${IMAGES.elite1})` }}>
              <div className="absolute inset-0 bg-brand-brown-deep/85 p-8 md:p-16 flex flex-col justify-center">
                <div className="inline-block px-4 py-1 rounded-full bg-brand-gold text-brand-brown-deep font-bold text-xs mb-6 w-fit">
                  HẠN CHÓT ỨNG TUYỂN
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Thời gian còn lại</h3>
                <p className="text-gray-300 text-lg mb-2">Đừng bỏ lỡ cơ hội gia nhập đội ngũ tinh anh tại Vũng Tàu. Vị trí đang dần được lấp đầy!</p>
                
                <CountdownTimer />

                <div className="mt-12 space-y-4">
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="p-2 bg-brand-gold/20 rounded-full"><Phone size={18} /></div>
                    <span className="font-medium text-sm md:text-base">0931 522 686 (Phòng Nhân Sự)</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="p-2 bg-brand-gold/20 rounded-full"><Mail size={18} /></div>
                    <span className="font-medium text-sm md:text-base">info@thinhgialand.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-16 bg-white">
              <RecruitmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-gray-light pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <img src={LOGO_URL} alt="Logo" className="h-16 mb-8" />
              <p className="text-brand-brown-secondary leading-relaxed mb-8">
                CÔNG TY CỔ PHẦN THỊNH GIA LAND. <br />
                Đơn vị phân phối và đầu tư bất động sản cao cấp hàng đầu tại Vũng Tàu.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/thinhgialand/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-brown-deep text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors shadow-lg" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="mailto:info@thinhgialand.com" className="w-10 h-10 bg-brand-brown-deep text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors shadow-lg" aria-label="Gửi Email"><Mail size={20} /></a>
                <a href="#" className="w-10 h-10 bg-brand-brown-deep text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors shadow-lg" aria-label="Trang web"><TrendingUp size={20} /></a>
              </div>
            </div>
            
            <div>
              <h5 className="font-black text-brand-brown-deep mb-8 text-lg uppercase tracking-widest">Liên kết nhanh</h5>
              <ul className="space-y-4">
                <li><a href="https://thinhgialand.com/ve-thinh-gia-land/" target="_blank" rel="noopener noreferrer" className="text-brand-brown-secondary hover:text-brand-gold transition-colors">Về chúng tôi</a></li>
                <li><a href="https://thinhgialand.com/du-an/" target="_blank" rel="noopener noreferrer" className="text-brand-brown-secondary hover:text-brand-gold transition-colors">Dự án phân phối</a></li>
                <li><a href="https://thinhgialand.com/tin-tuc-bds/" target="_blank" rel="noopener noreferrer" className="text-brand-brown-secondary hover:text-brand-gold transition-colors">Tin tức thị trường</a></li>
                <li><a href="#" className="text-brand-brown-secondary hover:text-brand-gold transition-colors">Thư viện hình ảnh</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h5 className="font-black text-brand-brown-deep mb-8 text-lg uppercase tracking-widest">Trụ sở chính</h5>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-brand-gold flex-shrink-0" size={24} />
                  <p className="text-brand-brown-secondary">Số 90 Võ Thị Sáu, Phường Vũng Tàu, TP. HCM</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-brand-gold flex-shrink-0" size={24} />
                  <p className="text-brand-brown-secondary">Hotline Tuyển dụng: 0931 522 686</p>
                </div>
                <div className="rounded-2xl overflow-hidden h-48 w-full bg-gray-300">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37571.671100833315!2d107.07798128640613!3d10.358807108605415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756fe85e873a55%3A0x58bf4754fb5e993c!2zQ8O0bmcgVHkgQ-G7lSBQaOG6p24gVGjhu4tuaCBHaWEgTGFuZA!5e1!3m2!1svi!2s!4v1778747857307!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Thịnh Gia Land Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-brown-secondary font-medium">
            <p>© 2025 Thịnh Gia Land. Bảo lưu mọi quyền.</p>
            <p>Phát triển bởi Đội ngũ Thịnh Gia Digital</p>
          </div>
        </div>
      </footer>

      {/* --- STICKY CTA MOBILE --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50 pointer-events-none">
        <a href="#apply" className="pointer-events-auto bg-brand-gold text-brand-brown-deep h-14 rounded-2xl flex items-center justify-center font-black shadow-2xl gold-glow active:scale-95 transition-all text-lg">
          ỨNG TUYỂN NGAY 🚀
        </a>
      </div>
    </div>
  );
}
