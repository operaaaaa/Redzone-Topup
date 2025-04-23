import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Stars, Heart, Coins, ScrollText, Quote, Calendar, Clock } from 'lucide-react';

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const services = [
    {
      icon: <Stars className="w-8 h-8" />,
      title: "ดูดวงรายวัน",
      description: "คำพยากรณ์แม่นยำประจำวัน",
      price: "฿199"
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "ดูดวงรายเดือน",
      description: "คำพยากรณ์ละเอียดรายเดือน",
      price: "฿599"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "ดูดวงรายปี",
      description: "คำพยากรณ์ครอบคลุมตลอดปี",
      price: "฿1,499"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "ดูดวงความรัก",
      description: "คำพยากรณ์ด้านความรัก",
      price: "฿299"
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "ดูดวงการเงิน",
      description: "คำพยากรณ์ด้านการเงิน",
      price: "฿299"
    },
    {
      icon: <ScrollText className="w-8 h-8" />,
      title: "ดูดวงเฉพาะทาง",
      description: "คำพยากรณ์ตามความต้องการ",
      price: "฿799"
    }
  ];

  const testimonials = [
    {
      name: "คุณมานี",
      service: "ดูดวงรายปี",
      quote: "แม่นยำมาก ช่วยให้วางแผนชีวิตได้ดีขึ้น",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "คุณสมชาย",
      service: "ดูดวงการเงิน",
      quote: "คำแนะนำที่ได้ช่วยให้ตัดสินใจลงทุนได้ถูกจังหวะ",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "คุณวิภา",
      service: "ดูดวงความรัก",
      quote: "ทำนายได้แม่นยำ ช่วยให้เข้าใจความสัมพันธ์มากขึ้น",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150"
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    setShowBookingForm(false);
    alert('การจองสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">ศาสตร์แห่งดวงดาว</h1>
        <p className="text-xl text-purple-200 mb-8">ค้นพบเส้นทางชีวิตของคุณผ่านการพยากรณ์ที่แม่นยำ</p>
      </header>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 ${
                selectedService === service.title
                  ? 'border-yellow-300 shadow-lg shadow-yellow-300/20'
                  : 'border-transparent'
              }`}
              onClick={() => setSelectedService(service.title)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-yellow-300">{service.icon}</div>
                <span className="text-yellow-300 font-bold">{service.price}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-purple-200">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">เสียงจากลูกค้าของเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-purple-200 text-sm">{testimonial.service}</p>
                </div>
              </div>
              <div className="flex">
                <Quote className="w-8 h-8 text-yellow-300 mr-2 flex-shrink-0" />
                <p className="text-purple-200 italic">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">เริ่มต้นการเดินทางแห่งดวงดาว</h2>
          <p className="text-purple-200 mb-8">
            ค้นพบความลับของดวงดาวที่จะนำทางชีวิตของคุณสู่ความสำเร็จ
          </p>
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/20 transform transition-all duration-300 hover:scale-105"
            onClick={() => setShowBookingForm(true)}
          >
            จองคิวปรึกษาทันที
          </button>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">จองคิวปรึกษา</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-purple-200 mb-2">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                  value={bookingData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">อีเมล</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                  value={bookingData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200 mb-2">วันที่</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                      value={bookingData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">เวลา</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 w-5 h-5" />
                    <input
                      type="time"
                      name="time"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                      value={bookingData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-purple-200 mb-2">ข้อความเพิ่มเติม</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white focus:outline-none focus:border-yellow-300"
                  value={bookingData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-yellow-400/20 transform transition-all duration-300 hover:scale-105"
                >
                  ยืนยันการจอง
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transform transition-all duration-300"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-purple-200">
        <p>© 2024 ศาสตร์แห่งดวงดาว. สงวนลิขสิทธิ์.</p>
      </footer>
    </div>
  );
}

export default App;