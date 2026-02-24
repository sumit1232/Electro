import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, ShoppingCart, 
  Menu, Phone, RefreshCcw, Send, LifeBuoy, CreditCard, Lock, Newspaper, ChevronRight
} from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // 1. CART DATA - EXACTLY SAME AS CART PAGE
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Apple iPad Mini', 
      model: 'G2356', 
      price: 299.00, 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200&h=200&fit=crop'
    },
    { 
      id: 2, 
      name: 'Samsung Galaxy Tab', 
      model: 'S9 Ultra', 
      price: 899.00, 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?q=80&w=200&h=200&fit=crop'
    }
  ]);

  // 2. CART CALCULATIONS - IDENTICAL TO CART PAGE
  const SHIPPING_COST = 3.00;
  const FREE_SHIPPING_THRESHOLD = 1000.00;

  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]
  );

  const shippingCost = useMemo(() => 
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST, [subtotal]
  );

  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  // 3. FORM STATE
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', 
    zip: '', mobile: '', email: '', paymentMethod: 'bank', createAccount: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4. CART HANDLERS (SAME AS CART PAGE)
  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 5. FORM HANDLERS
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('✅ ORDER PLACED:', {
        customer: formData,
        items: cartItems,
        subtotal,
        shipping: shippingCost,
        total,
        orderId: `ORD-${Date.now()}`
      });

      clearCart(); // Clear cart after successful order
      setIsSubmitting(false);
      
      // Redirect to success page
      navigate('/order-success', { 
        state: { orderId: `ORD-${Date.now()}`, total } 
      });
    }, 2000);
  }, [formData, cartItems, subtotal, shippingCost, total, clearCart, navigate]);

  const hasItems = cartItems.length > 0;

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Header */}
      <Header subtotal={subtotal} />

      {/* Navbar */}
      <Navbar isCategoryOpen={isCategoryOpen} setIsCategoryOpen={setIsCategoryOpen} />

      {/* Hero Section */}
      <HeroSection />

      {/* Service Features */}
      <ServiceFeatures />

      {/* Checkout Form */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {hasItems ? (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
              {/* Billing Details */}
              <BillingForm formData={formData} onChange={handleInputChange} />
              
              {/* Order Summary */}
              <OrderSummary 
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
                formData={formData}
                onChange={handleInputChange}
                isSubmitting={isSubmitting}
              />
            </form>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ SUB-COMPONENTS WITH CART LOGIC
const Topbar = () => (
  <div className="hidden lg:block border-b border-gray-100 px-12 py-2 bg-gray-50">
    <div className="container mx-auto flex justify-between items-center text-xs">
      <div className="flex space-x-4 text-gray-400 font-medium">
        <Link to="/help" className="hover:text-blue-600">Help</Link>
        <Link to="/support" className="hover:text-blue-600">Support</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-gray-500">
          <span className="text-gray-900 font-bold">Call Us:</span> (+012) 1234 5678
        </div>
        <div className="flex space-x-2 border-l pl-6">
          <span className="cursor-pointer hover:text-blue-600">English</span>
          <span className="text-gray-300">|</span>
          <span className="cursor-pointer hover:text-blue-600">USD</span>
        </div>
      </div>
    </div>
  </div>
);

const Header = ({ subtotal }) => (
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
);

const Navbar = ({ isCategoryOpen, setIsCategoryOpen }) => (
  <nav className="bg-blue-600 text-white sticky top-0 z-50">
    <div className="container mx-auto px-6 lg:px-12 flex items-center">
      <div className="relative w-64 bg-blue-700 py-4 px-6 cursor-pointer group" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
        <div className="flex items-center font-bold uppercase text-sm tracking-widest">
          <Menu className="mr-3" size={20} /> All Categories
        </div>
        {isCategoryOpen && (
          <ul className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-2xl z-50 border-t-4 border-orange-500">
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
);

const HeroSection = () => (
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
);

const ServiceFeatures = () => (
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
);

const BillingForm = ({ formData, onChange }) => (
  <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
    <h2 className="text-3xl font-black mb-10 flex items-center tracking-tight">
      <div className="w-2 h-8 bg-orange-500 mr-4 rounded-full"></div>
      Billing Details
    </h2>
    
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <InputGroup label="First Name" name="firstName" value={formData.firstName} required onChange={onChange} />
        <InputGroup label="Last Name" name="lastName" value={formData.lastName} required onChange={onChange} />
      </div>
      <InputGroup label="Street Address" name="address" placeholder="House number and street name" value={formData.address} required onChange={onChange} />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <InputGroup label="Town / City" name="city" value={formData.city} required onChange={onChange} />
        </div>
        <InputGroup label="Postcode" name="zip" value={formData.zip} required onChange={onChange} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <InputGroup label="Phone" name="mobile" type="tel" value={formData.mobile} required onChange={onChange} />
        <InputGroup label="Email" name="email" type="email" value={formData.email} required onChange={onChange} />
      </div>
      
      <div className="pt-6 space-y-4">
        <label className="flex items-center group cursor-pointer">
          <input 
            type="checkbox" 
            name="createAccount"
            checked={formData.createAccount}
            onChange={onChange}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
          />
          <span className="ml-3 font-bold text-gray-500 group-hover:text-blue-600 transition">Create an account?</span>
        </label>
        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200">
          <p className="text-sm font-medium text-blue-800">Note: Account creation will send an automated password to your email.</p>
        </div>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ 
  cartItems, 
  subtotal, 
  shippingCost, 
  total, 
  formData, 
  onChange, 
  isSubmitting 
}) => (
  <div className="w-full lg:w-5/12">
    <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
      
      <h2 className="text-2xl font-black mb-8 pb-4 border-b border-white/10 uppercase tracking-widest">Your Order</h2>
      
      <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
            <div className="max-w-[200px]">
              <p className="font-bold text-white truncate">{item.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity} • ${item.price.toFixed(2)}/unit</p>
            </div>
            <span className="font-black text-orange-500">${(item.price * item.quantity).toFixed(2)}</span>
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
          <span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between items-end pt-4">
          <span className="text-xl font-black uppercase italic text-orange-500">Total</span>
          <span className="text-5xl font-black text-white">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-10 space-y-4">
        <PaymentOption 
          isActive={formData.paymentMethod === 'bank'}
          onSelect={() => onChange({ target: { name: 'paymentMethod', value: 'bank' } })}
          title="Direct Bank Transfer"
          description="Funds clear in 1-3 business days. Use Order ID as reference."
        />
        <PaymentOption 
          isActive={formData.paymentMethod === 'cod'}
          onSelect={() => onChange({ target: { name: 'paymentMethod', value: 'cod' } })}
          title="Cash on Delivery"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full mt-10 py-6 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all active:scale-95 ${
          isSubmitting 
            ? 'bg-orange-400 cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30'
        } text-white`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <RefreshCcw className="animate-spin mr-2" size={20} />
            Processing...
          </span>
        ) : (
          'Complete Purchase'
        )}
      </button>
      
      <p className="text-[10px] text-gray-500 text-center mt-6 font-bold uppercase tracking-widest flex items-center justify-center">
        <Lock size={12} className="mr-2" /> SSL Encrypted Checkout
      </p>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-300">
    <ShoppingCart size={64} className="mx-auto mb-6 text-gray-300" />
    <h2 className="text-3xl font-black text-gray-900 mb-4">No Items in Cart</h2>
    <p className="text-gray-500 mb-8 max-w-md mx-auto">Your cart is empty. Add items to proceed with checkout.</p>
    <Link to="/cart" className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700">
      Go to Cart
    </Link>
  </div>
);

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

const InputGroup = ({ label, name, type = "text", placeholder = "", required = false, value, onChange }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <input 
      name={name}
      type={type} 
      required={required}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      className="bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-xl px-5 py-4 outline-none transition-all font-medium"
    />
  </div>
);

const PaymentOption = ({ isActive, onSelect, title, description }) => (
  <div 
    className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${
      isActive ? 'bg-white/10 border-orange-500' : 'border-transparent bg-white/5'
    }`}
    onClick={onSelect}
  >
    <label className="flex items-center font-black text-sm cursor-pointer w-full">
      <input type="radio" className="mr-3 w-4 h-4 accent-orange-500" readOnly />
      {title}
    </label>
    {description && isActive && (
      <p className="text-xs text-gray-400 mt-2 ml-7 leading-relaxed">{description}</p>
    )}
  </div>
);

export default CheckoutPage;
