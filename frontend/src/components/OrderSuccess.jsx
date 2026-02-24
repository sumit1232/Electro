import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, ShoppingCart, 
  Menu, CheckCircle, Package, Truck, CreditCard, 
  Phone, ChevronRight, ArrowLeft, Clock, Star 
} from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Get order data from navigation state
  useEffect(() => {
    const orderId = location.state?.orderId || `ORD-${Date.now()}`;
    const total = location.state?.total || 0;
    setOrderData({ orderId, total });
  }, [location.state]);

  // Load cart (should be empty after checkout)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Format date
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">No order data found</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      {/* Topbar */}
      <Topbar />

      {/* Header */}
      <Header cartCount={cartItems.length} subtotal={0} />

      {/* Navbar */}
      <Navbar />

      {/* Success Hero */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10 text-center">
          <div className="w-32 h-32 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-8 border-white">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2 font-bold">Thank you for your purchase</p>
          <p className="text-4xl font-black text-gray-900 mb-12">${orderData.total.toFixed(2)}</p>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl inline-block">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Order ID</p>
            <p className="text-2xl font-black text-gray-900">{orderData.orderId}</p>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Order Summary */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black mb-10 flex items-center tracking-tight">
                <Package className="mr-4 text-orange-500" size={40} />
                Order Summary
              </h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl">
                  <span className="text-lg font-bold text-gray-900">Order ID</span>
                  <span className="font-black text-xl text-blue-600">{orderData.orderId}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="p-6 bg-blue-50 rounded-2xl">
                    <p className="text-gray-500 uppercase font-bold tracking-wide mb-2">Order Date</p>
                    <p className="font-black text-gray-900">{formatDate()}</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-2xl">
                    <p className="text-gray-500 uppercase font-bold tracking-wide mb-2">Status</p>
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                      <CheckCircle size={16} className="mr-2" />
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200">
                  <h3 className="font-black text-lg mb-4 flex items-center text-orange-800">
                    <Truck size={24} className="mr-3" />
                    Delivery Timeline
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Processing</span>
                      <Clock size={20} className="text-orange-500" />
                    </div>
                    <div className="w-full h-1 bg-orange-200 rounded-full">
                      <div className="h-1 bg-orange-500 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>1-2 Days</span>
                      <span className="font-bold text-orange-700">Shipping Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-8">
              {/* Track Order */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-black mb-6 flex items-center">
                  <Truck size={32} className="mr-4" />
                  Track Your Order
                </h3>
                <div className="space-y-4">
                  <p className="text-blue-100">Enter your order ID to track delivery status in real-time</p>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder={orderData.orderId}
                      className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white/50 font-bold"
                    />
                    <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-wider hover:bg-blue-50 transition-all shadow-xl">
                      Track
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/shop" className="group bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all flex flex-col items-center text-center">
                  <ShoppingBag size={48} className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-xl mb-2">Continue Shopping</h4>
                  <p className="text-gray-500 text-sm">Discover more amazing products</p>
                </Link>
                
                <Link to="/orders" className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CreditCard size={48} className="relative z-10 mb-4" />
                  <h4 className="relative z-10 font-black text-xl mb-2">View Orders</h4>
                  <p className="relative z-10 text-gray-300 text-sm">Manage your order history</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="group hover:bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all cursor-pointer">
              <Phone size={48} className="text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-2xl mb-3">Call Us</h4>
              <p className="text-2xl font-bold text-gray-900">(+012) 1234 5678</p>
            </div>
            <div className="group hover:bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all cursor-pointer">
              <Clock size={48} className="text-green-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-2xl mb-3">Support Hours</h4>
              <p className="text-xl font-bold text-gray-900">24/7 Available</p>
            </div>
            <div className="group hover:bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all cursor-pointer">
              <Star size={48} className="text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-2xl mb-3">Reviews</h4>
              <p className="text-2xl font-bold text-gray-900">4.9/5 Stars</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Header & Navbar Components (same as other pages)
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

const Header = ({ cartCount, subtotal }) => (
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
        <button className="p-3 border-2 border-gray-100 rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all">
          <Heart size={22} />
        </button>
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

const Navbar = () => (
  <nav className="bg-blue-600 text-white sticky top-0 z-50">
    <div className="container mx-auto px-6 lg:px-12 flex items-center justify-center">
      <div className="flex space-x-10 font-bold text-xs uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-orange-400 py-4 transition">Home</Link>
        <Link to="/shop" className="hover:text-orange-400 py-4 transition">Shop</Link>
        <Link to="/cart" className="hover:text-orange-400 py-4 transition">Cart</Link>
        <Link to="/checkout" className="hover:text-orange-400 py-4 transition">Orders</Link>
      </div>
    </div>
  </nav>
);

export default OrderSuccess;
