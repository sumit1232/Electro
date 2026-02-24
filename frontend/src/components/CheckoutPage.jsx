import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, Shuffle, Heart, ShoppingCart, 
  Menu, Phone, RefreshCcw, Send, LifeBuoy, CreditCard, Lock, Newspaper, ChevronRight
} from 'lucide-react';

const CheckoutPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // 1. FORM STATE LOGIC
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', 
    zip: '', mobile: '', email: '', paymentMethod: 'bank'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed Successfully for ${formData.firstName}! Check your email at ${formData.email}`);
  };

  // 2. DYNAMIC ORDER DATA
  const cartItems = [
    { id: 1, name: "Apple iPad Mini", qty: 2, price: 269.00 },
    { id: 2, name: "Smart Watch V8", qty: 1, price: 299.00 }
  ];
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      {/* Topbar */}
      <div className="hidden lg:block border-b border-gray-100 px-12 py-2 bg-gray-50">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex space-x-4 text-gray-400 font-medium">
            <Link to="/help" className="hover:text-blue-600">Help</Link>
            <Link to="/support" className="hover:text-blue-600">Support</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
          <div className="flex items-center space-x-6">
             <div className="text-gray-500"><span className="text-gray-900 font-bold">Call Us:</span> (+012) 1234 5678</div>
             <div className="flex space-x-2 border-l pl-6">
                <span className="cursor-pointer hover:text-blue-600">English</span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer hover:text-blue-600">USD</span>
             </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="flex items-center text-4xl font-black text-blue-600 tracking-tighter">
            <ShoppingBag className="mr-2 text-orange-500" size={40} /> ELECTRO
          </Link>
          
          <div className="flex-1 max-w-2xl">
            <div className="flex border-2 border-blue-600 rounded-full overflow-hidden shadow-sm">
              <input type="text" placeholder="Search for products..." className="w-full px-6 py-3 outline-none" />
              <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition"><Search size={20} /></button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <IconButton Icon={Heart} />
            <Link to="/cart" className="flex items-center space-x-3 border-2 border-blue-600 rounded-full px-6 py-2.5 bg-blue-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all">
              <ShoppingCart size={20} />
              <span>${subtotal.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-12 flex items-center">
          <div className="relative w-64 bg-blue-700 py-4 px-6 cursor-pointer group" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            <div className="flex items-center font-bold uppercase text-sm tracking-widest">
              <Menu className="mr-3" size={20} /> All Categories
            </div>
            {isCategoryOpen && (
              <ul className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-2xl z-50 border-t-4 border-orange-500 animate-in slide-in-from-top-2 duration-200">
                <CategoryItem label="Accessories" count={3} />
                <CategoryItem label="Electronics" count={5} />
                <CategoryItem label="Laptops" count={2} />
              </ul>
            )}
          </div>
          <div className="flex-1 flex justify-center space-x-10 font-bold text-xs uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-orange-400 py-4 transition">Home</Link>
            <Link to="/shop" className="hover:text-orange-400 py-4 transition">Shop</Link>
            <Link to="/checkout" className="text-orange-400 py-4 border-b-4 border-orange-400">Checkout</Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Section */}
      <div className="bg-slate-900 py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <img src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="relative z-10">
            <h1 className="text-6xl font-black text-white mb-4 italic tracking-tighter">SECURE CHECKOUT</h1>
            <div className="flex justify-center items-center text-gray-400 font-bold text-sm uppercase tracking-widest">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight size={16} className="mx-3 text-orange-500" />
                <span className="text-white">Payment & Billing</span>
            </div>
        </div>
      </div>

      {/* Service Features */}
      <div className="container mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <ServiceBox Icon={RefreshCcw} title="30 Days Return" desc="Money back guarantee" />
            <ServiceBox Icon={Send} title="Free Shipping" desc="On all global orders" />
            <ServiceBox Icon={LifeBuoy} title="24/7 Support" desc="Expert assistance" />
            <ServiceBox Icon={CreditCard} title="Gift Cards" desc="Save on every order" />
            <ServiceBox Icon={Lock} title="Encrypted" desc="100% Secure Checkout" />
            <ServiceBox Icon={Newspaper} title="Daily News" desc="Tech updates" />
        </div>
      </div>

      {/* Checkout Content */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Billing Details */}
            <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-3xl font-black mb-10 flex items-center tracking-tight">
                <div className="w-2 h-8 bg-orange-500 mr-4 rounded-full"></div>
                Billing Details
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="First Name" name="firstName" required onChange={handleInputChange} />
                  <InputGroup label="Last Name" name="lastName" required onChange={handleInputChange} />
                </div>
                <InputGroup label="Street Address" name="address" placeholder="House number and street name" required onChange={handleInputChange} />
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <InputGroup label="Town / City" name="city" required onChange={handleInputChange} />
                  </div>
                  <InputGroup label="Postcode" name="zip" required onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="Phone" name="mobile" type="tel" required onChange={handleInputChange} />
                  <InputGroup label="Email" name="email" type="email" required onChange={handleInputChange} />
                </div>
                
                <div className="pt-6 space-y-4">
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-3 font-bold text-gray-500 group-hover:text-blue-600 transition">Create an account?</span>
                  </label>
                  <div className="p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200">
                    <p className="text-sm font-medium text-blue-800">Note: Account creation will send an automated password to your email.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-5/12">
              <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
                
                <h2 className="text-2xl font-black mb-8 pb-4 border-b border-white/10 uppercase tracking-widest">Your Order</h2>
                
                <div className="space-y-4 mb-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-xs text-gray-400">Quantity: {item.qty}</p>
                      </div>
                      <span className="font-black text-orange-500">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                    <span>Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-xl font-black uppercase italic text-orange-500">Total</span>
                    <span className="text-5xl font-black text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <div className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${formData.paymentMethod === 'bank' ? 'bg-white/10 border-orange-500' : 'border-transparent bg-white/5'}`}
                       onClick={() => setFormData({...formData, paymentMethod: 'bank'})}>
                    <label className="flex items-center font-black text-sm cursor-pointer">
                      <input type="radio" name="payment" className="mr-3 w-4 h-4 accent-orange-500" checked={formData.paymentMethod === 'bank'} readOnly /> 
                      Direct Bank Transfer
                    </label>
                    {formData.paymentMethod === 'bank' && <p className="text-xs text-gray-400 mt-2 ml-7 leading-relaxed">Funds clear in 1-3 business days. Use Order ID as reference.</p>}
                  </div>
                  
                  <div className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${formData.paymentMethod === 'cod' ? 'bg-white/10 border-orange-500' : 'border-transparent bg-white/5'}`}
                       onClick={() => setFormData({...formData, paymentMethod: 'cod'})}>
                    <label className="flex items-center font-black text-sm cursor-pointer">
                      <input type="radio" name="payment" className="mr-3 w-4 h-4 accent-orange-500" checked={formData.paymentMethod === 'cod'} readOnly /> 
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all hover:shadow-lg hover:shadow-orange-500/30 active:scale-95">
                  Complete Purchase
                </button>
                
                <p className="text-[10px] text-gray-500 text-center mt-6 font-bold uppercase tracking-widest flex items-center justify-center">
                    <Lock size={12} className="mr-2" /> SSL Encrypted Checkout
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const IconButton = ({ Icon }) => (
  <button className="p-3 border-2 border-gray-100 rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all">
    <Icon size={22} />
  </button>
);

const CategoryItem = ({ label, count }) => (
  <li className="flex justify-between px-6 py-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 group">
    <span className="font-bold text-sm group-hover:text-blue-600">{label}</span>
    <span className="bg-gray-100 text-gray-400 text-[10px] font-black px-2 py-1 rounded-md">{count}</span>
  </li>
);

const ServiceBox = ({ Icon, title, desc }) => (
  <div className="p-6 flex flex-col items-center text-center bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all group">
    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={24} />
    </div>
    <h6 className="font-black uppercase text-[10px] tracking-widest mb-1">{title}</h6>
    <p className="text-[10px] font-bold text-gray-400">{desc}</p>
  </div>
);

const InputGroup = ({ label, name, type = "text", placeholder = "", required = false, onChange }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <input 
      name={name}
      type={type} 
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      className="bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-xl px-5 py-4 outline-none transition-all font-medium"
    />
  </div>
);

export default CheckoutPage;