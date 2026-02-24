import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, Shuffle, ShoppingCart, 
  Menu, Phone, MapPin, Mail, Globe, ArrowUp, ChevronRight 
} from 'lucide-react';

const ContactPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="font-sans text-gray-700 bg-white">
      {/* --- TOPBAR --- */}
      <div className="hidden lg:block border-b border-gray-100 px-12 py-2 text-sm text-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">Help</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Support</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
          <div>
            <span>Call Us: </span>
            <a href="tel:+0121234567890" className="font-medium text-gray-800">(+012) 1234 567890</a>
          </div>
          <div className="flex space-x-6">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option>
              <option>Spanish</option>
            </select>
            <a href="#" className="flex items-center gap-1">
              <MapPin size={14} /> My Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* --- HEADER / SEARCH --- */}
      <div className="px-12 py-8 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-blue-600">
          <ShoppingBag size={40} className="text-orange-500" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Electro</h1>
        </div>

        <div className="flex-1 max-w-2xl relative flex">
          <div className="flex w-full border-2 border-blue-600 rounded-full overflow-hidden">
            <input 
              type="text" 
              placeholder="Search Looking For?" 
              className="w-full px-6 py-3 outline-none"
            />
            <select className="hidden md:block border-l border-gray-200 px-4 bg-gray-50 outline-none">
              <option>All Category</option>
            </select>
            <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-3 border rounded-full hover:bg-gray-50 transition"><Shuffle size={20} /></button>
          <button className="p-3 border rounded-full hover:bg-gray-50 transition"><Heart size={20} /></button>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="p-3 border rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </div>
            <span className="font-bold">$0.00</span>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="bg-blue-600 text-white px-12">
        <div className="flex items-center">
          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-blue-700 flex items-center gap-3 px-6 py-4 font-bold uppercase tracking-wider"
            >
              <Menu size={20} /> All Categories
            </button>
            {isCategoryOpen && (
              <ul className="absolute top-full left-0 w-64 bg-white text-gray-800 shadow-xl z-50 border-t-2 border-orange-500">
                {['Accessories', 'Electronics', 'Laptops', 'Mobiles'].map((cat) => (
                  <li key={cat} className="px-6 py-3 border-b hover:bg-gray-50 cursor-pointer flex justify-between">
                    {cat} <span className="text-gray-400 text-xs">(3)</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Main Links */}
          <div className="hidden lg:flex ml-10 space-x-8 font-medium">
            <a href="#" className="hover:text-orange-300">Home</a>
            <a href="#" className="hover:text-orange-300">Shop</a>
            <a href="#" className="hover:text-orange-300">Cart</a>
            <a href="#" className="text-orange-400">Contact</a>
          </div>

          <div className="ml-auto hidden md:block">
            <a href="tel:0123456789" className="flex items-center gap-2 bg-orange-500 px-6 py-2 rounded-full hover:bg-orange-600 transition">
              <Phone size={18} /> +0123 456 7890
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO / BREADCRUMB --- */}
      <div className="bg-gray-900 py-16 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-4">Contact Us</h2>
          <div className="flex justify-center items-center gap-2 text-gray-400">
            <a href="#" className="hover:text-blue-400">Home</a>
            <ChevronRight size={16} />
            <span className="text-white">Contact</span>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
      </div>

      {/* --- CONTACT FORM SECTION --- */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-12">
            
            {/* Form Side */}
            <div className="lg:col-span-7 p-8 lg:p-12">
              <div className="mb-10">
                <span className="text-blue-600 font-bold uppercase tracking-widest border-b-2 border-blue-600 pb-1">Get in touch</span>
                <h3 className="text-4xl font-bold mt-4 text-gray-900">Send Your Message</h3>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="relative">
                  <input type="email" placeholder="Your Email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Your Phone" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Subject" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <textarea rows="5" placeholder="Your Message" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Map/Info Side */}
            <div className="lg:col-span-5 bg-gray-100 min-h-[400px]">
              <iframe 
                title="map"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.422199126131!2d-73.985428!3d40.748440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMDcuNSJX!5e0!3m2!1sen!2sus!4v1625000000000"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Details Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
            <ContactInfoCard icon={<MapPin className="text-blue-600" />} title="Address" desc="123 Street New York, USA" />
            <ContactInfoCard icon={<Mail className="text-blue-600" />} title="Mail Us" desc="info@example.com" />
            <ContactInfoCard icon={<Phone className="text-blue-600" />} title="Telephone" desc="(+012) 3456 7890" />
            <ContactInfoCard icon={<Globe className="text-blue-600" />} title="Website" desc="www.yoursite.com" />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Newsletter</h4>
            <p className="mb-6 leading-relaxed">Stay updated with our latest electronics and exclusive deals.</p>
            <div className="flex bg-gray-800 rounded-full overflow-hidden p-1">
              <input type="text" placeholder="Email" className="bg-transparent px-4 py-2 w-full outline-none text-white" />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">SignUp</button>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Returns', 'Order History', 'Site Map'].map(link => (
                <li key={link} className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                  <ChevronRight size={14} /> {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Information</h4>
            <ul className="space-y-3">
              {['About Us', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map(link => (
                <li key={link} className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                  <ChevronRight size={14} /> {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <p className="flex items-start gap-3"><MapPin size={20} className="text-blue-500 mt-1" /> 123 Street, NY, USA</p>
              <p className="flex items-center gap-3"><Mail size={20} className="text-blue-500" /> info@example.com</p>
              <p className="flex items-center gap-3"><Phone size={20} className="text-blue-500" /> +012 345 6789</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, desc }) => (
  <div className="p-8 text-center flex flex-col items-center border-r last:border-0 border-gray-100 hover:bg-gray-50 transition">
    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="font-bold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{desc}</p>
  </div>
);

export default ContactPage;