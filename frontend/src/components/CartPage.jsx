import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, RefreshCw, ShoppingCart, Phone, Menu, X, MapPin, Mail, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';

const CartPage = () => {
  const [isCatOpen, setIsCatOpen] = useState(false);

  const cartItems = [
    { id: 1, name: 'Apple iPad Mini', model: 'G2356', price: 2.99, quantity: 1 },
    { id: 2, name: 'Apple iPad Mini', model: 'G2356', price: 2.99, quantity: 1 },
    { id: 3, name: 'Apple iPad Mini', model: 'G2356', price: 2.99, quantity: 1 },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-700">
      {/* --- TOPBAR --- */}
      <div className="hidden lg:block border-bottom bg-white border-b border-gray-100">
        <div className="container mx-auto px-12 py-2 flex justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">Help</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Support</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
          <div>
            <span>Call Us: </span>
            <a href="tel:+0121234567890" className="hover:text-blue-600 font-medium">(+012) 1234 567890</a>
          </div>
          <div className="flex space-x-4">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- HEADER / SEARCH --- */}
      <div className="container mx-auto px-12 py-6 hidden lg:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3">
          <a href="/" className="flex items-center text-3xl font-bold text-blue-600">
            <ShoppingBag className="text-orange-500 mr-2" size={32} />
            Electro
          </a>
        </div>
        <div className="col-span-6">
          <div className="flex border-2 border-blue-600 rounded-full overflow-hidden">
            <input 
              type="text" 
              placeholder="Search Looking For?" 
              className="w-full px-6 py-2 outline-none"
            />
            <select className="border-l px-4 bg-gray-50 outline-none">
              <option>All Category</option>
            </select>
            <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>
        <div className="col-span-3 flex justify-end space-x-4 items-center">
          <button className="p-3 border rounded-full hover:bg-gray-100"><RefreshCw size={20} /></button>
          <button className="p-3 border rounded-full hover:bg-gray-100"><Heart size={20} /></button>
          <div className="flex items-center space-x-2 border rounded-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <ShoppingCart size={20} />
            <span className="font-bold">$0.00</span>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-12 flex items-center">
          {/* Categories Dropdown */}
          <div className="relative w-64 hidden lg:block">
            <button 
              onClick={() => setIsCatOpen(!isCatOpen)}
              className="bg-blue-700 py-4 px-6 w-full flex items-center justify-between font-bold"
            >
              <span className="flex items-center"><Menu className="mr-2" size={20} /> All Categories</span>
            </button>
            {isCatOpen && (
              <div className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-xl border-t border-orange-500">
                <ul className="py-2">
                  {['Accessories', 'Electronics & Computer', 'Laptops', 'Mobiles'].map((cat) => (
                    <li key={cat} className="px-6 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
                      {cat} <span className="text-gray-400 text-xs">(3)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-between items-center px-8 py-4">
            <div className="space-x-8 font-medium">
              <a href="#" className="hover:text-orange-400">Home</a>
              <a href="#" className="hover:text-orange-400">Shop</a>
              <a href="#" className="text-orange-400">Shop Cart</a>
              <a href="#" className="hover:text-orange-400">Checkout</a>
              <a href="#" className="hover:text-orange-400">Contact</a>
            </div>
            <a href="tel:0123456789" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full flex items-center transition">
              <Phone size={18} className="mr-2" /> +0123 456 7890
            </a>
          </div>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-800 py-16 text-center text-white bg-[url('https://via.placeholder.com/1920x400')] bg-cover bg-center bg-blend-overlay">
        <h1 className="text-5xl font-bold mb-4">Cart Page</h1>
        <div className="flex justify-center space-x-2 text-gray-300">
          <a href="#" className="hover:text-white">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-white">Pages</a>
          <span>/</span>
          <span className="text-white">Cart Page</span>
        </div>
      </div>

      {/* --- CART TABLE --- */}
      <div className="container mx-auto px-12 py-16">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b-2">
              <tr className="text-gray-600">
                <th className="py-4">Name</th>
                <th className="py-4">Model</th>
                <th className="py-4">Price</th>
                <th className="py-4">Quantity</th>
                <th className="py-4">Total</th>
                <th className="py-4 text-center">Handle</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50 transition">
                  <td className="py-6 font-medium text-blue-600">{item.name}</td>
                  <td className="py-6">{item.model}</td>
                  <td className="py-6">${item.price}</td>
                  <td className="py-6">
                    <div className="flex items-center border rounded-full w-max bg-white">
                      <button className="px-3 py-1 hover:bg-gray-100 rounded-l-full">-</button>
                      <input type="text" value={item.quantity} className="w-10 text-center outline-none bg-transparent" readOnly />
                      <button className="px-3 py-1 hover:bg-gray-100 rounded-r-full">+</button>
                    </div>
                  </td>
                  <td className="py-6 font-bold">${item.price}</td>
                  <td className="py-6 text-center">
                    <button className="p-2 rounded-full hover:bg-red-50 text-red-500 transition border border-red-100">
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- COUPON & TOTALS --- */}
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div className="flex items-start space-x-4">
            <input 
              type="text" 
              placeholder="Coupon Code" 
              className="border-b-2 border-gray-200 py-3 px-2 outline-none focus:border-blue-600 transition w-64"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700">Apply Coupon</button>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-6">Cart <span className="font-light">Total</span></h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-lg font-medium">Subtotal:</span>
                <span className="text-lg">$96.00</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-lg font-medium">Shipping:</span>
                <div className="text-right">
                  <p className="text-gray-500">Flat rate: $3.00</p>
                  <p className="text-sm text-gray-400 italic">Shipping to Ukraine</p>
                </div>
              </div>
              <div className="flex justify-between text-2xl font-bold py-4">
                <span>Total:</span>
                <span className="text-blue-600">$99.00</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700 transition shadow-lg">
                Proceed Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-gray-300 pt-16">
        <div className="container mx-auto px-12">
          {/* Contact Icons Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: <MapPin />, title: "Address", desc: "123 Street, NY, USA" },
              { icon: <Mail />, title: "Mail Us", desc: "info@example.com" },
              { icon: <Phone />, title: "Telephone", desc: "(+012) 3456 7890" },
              { icon: <Search />, title: "Website", desc: "yoursite@ex.com" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500 transition group">
                <div className="bg-orange-500 text-slate-900 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-xl">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-12 pb-16">
            <div className="col-span-1">
              <h4 className="text-blue-400 font-bold text-xl mb-6">Newsletter</h4>
              <p className="text-sm mb-6 leading-relaxed">Stay updated with our latest electronics and tech deals delivered to your inbox.</p>
              <div className="relative">
                <input className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-white" placeholder="Email..." />
                <button className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">SignUp</button>
              </div>
            </div>
            {['Customer Service', 'Information', 'Extras'].map((title) => (
              <div key={title}>
                <h4 className="text-blue-400 font-bold text-xl mb-6">{title}</h4>
                <ul className="space-y-3 text-sm">
                  {['Contact Us', 'Returns', 'Order History', 'Site Map', 'Privacy Policy'].map(link => (
                    <li key={link} className="flex items-center hover:text-white cursor-pointer transition">
                      <ChevronRight size={14} className="mr-2 text-blue-400" /> {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-950 py-6 border-t border-white/10">
          <div className="container mx-auto px-12 flex flex-col md:row justify-between items-center text-sm">
            <p>© 2026 <span className="text-white font-bold">Electro</span>, All Rights Reserved.</p>
            <p>Designed By <span className="text-blue-400 cursor-pointer">HTML Codex</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;