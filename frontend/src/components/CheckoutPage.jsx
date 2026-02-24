import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, ShoppingCart, 
  Menu, Phone, RefreshCcw, Send, LifeBuoy, CreditCard, Lock, Newspaper, ChevronRight,
  X, ArrowLeft 
} from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState([]);
  
  const SHIPPING_COST = 3.00;
  const FREE_SHIPPING_THRESHOLD = 1000.00;

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', 
    zip: '', mobile: '', email: '', paymentMethod: 'bank', createAccount: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cart calculations
  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]
  );

  const shippingCost = useMemo(() => 
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST, [subtotal]
  );

  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  // Cart handlers
  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => prev.map(item => 
      item._id === id || item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
  }, []);

  // Form handlers
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

    setTimeout(() => {
      console.log('✅ ORDER PLACED:', {
        customer: formData,
        items: cartItems,
        subtotal,
        shipping: shippingCost,
        total,
        orderId: `ORD-${Date.now()}`
      });

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success', { 
        state: { orderId: `ORD-${Date.now()}`, total } 
      });
    }, 2000);
  }, [formData, cartItems, subtotal, shippingCost, total, clearCart, navigate]);

  const hasItems = cartItems.length > 0;

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      <Topbar />
      <Header subtotal={subtotal} cartCount={cartItems.length} />
      <Navbar isCategoryOpen={isCategoryOpen} setIsCategoryOpen={setIsCategoryOpen} />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {hasItems ? (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
              <BillingForm formData={formData} onChange={handleInputChange} />
              <OrderSummary 
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
                formData={formData}
                onChange={handleInputChange}
                isSubmitting={isSubmitting}
                updateQuantity={updateQuantity}
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

// ✅ ALL MISSING COMPONENTS DEFINED:

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

const Header = ({ subtotal, cartCount }) => (
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
        <Link to="/cart" className="flex items-center space-x-3 border-2 border-blue-600 rounded-full px-6 py-2.5 bg-blue-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
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
        <Link to="/cart" className="hover:text-orange-400 py-4 transition">Cart</Link>
        <Link to="/checkout" className="text-orange-400 py-4 border-b-4 border-orange-400">Checkout</Link>
      </div>
    </div>
  </nav>
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
  isSubmitting,
  updateQuantity 
}) => (
  <div className="w-full lg:w-5/12">
    <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
      
      <h2 className="text-2xl font-black mb-8 pb-4 border-b border-white/10 uppercase tracking-widest">Your Order</h2>
      
      <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item._id || item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
            <div className="flex items-center space-x-3 max-w-[200px]">
              <img 
                src={item.thumbnail || item.image || "https://via.placeholder.com/60"} 
                alt={item.title || item.name}
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div>
                <p className="font-bold text-white truncate text-sm">{item.title || item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
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
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to="/cart" className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700">
        Go to Cart
      </Link>
      <Link to="/" className="inline-flex items-center bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800">
        Continue Shopping
      </Link>
    </div>
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
