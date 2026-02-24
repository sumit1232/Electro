import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, ShoppingCart, 
  Menu, X, ChevronRight, ArrowLeft, CreditCard 
} from 'lucide-react';

const CartPage = () => {
  const [isCatOpen, setIsCatOpen] = useState(false);
  
  // 1. DYNAMIC STATE WITH REAL IMAGE URLs
  const [items, setItems] = useState([
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
    },
    { 
      id: 3, 
      name: 'Beats Studio Pro', 
      model: 'Wireless', 
      price: 349.00, 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&fit=crop' 
    },
  ]);

  const shippingCost = 3.00;

  // 2. LOGIC HANDLERS
  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // 3. CALCULATIONS
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [items]);

  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
      {/* --- TOP HEADER --- */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 lg:px-12 py-6 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6 lg:col-span-3">
            <Link to="/" className="flex items-center text-3xl font-black text-blue-600 tracking-tighter">
              <ShoppingBag className="text-orange-500 mr-2" size={32} /> ELECTRO
            </Link>
          </div>
          
          <div className="hidden lg:block col-span-6">
            <div className="flex border-2 border-gray-100 rounded-full overflow-hidden focus-within:border-blue-600 transition-all">
              <input type="text" placeholder="Search for products..." className="w-full px-6 py-2 outline-none bg-gray-50 focus:bg-white" />
              <button className="bg-blue-600 text-white px-8 hover:bg-blue-700"><Search size={20} /></button>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-3 flex justify-end space-x-4 items-center">
            <button className="p-3 text-gray-400 hover:text-blue-600"><Heart size={22} /></button>
            <div className="flex items-center space-x-3 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg shadow-blue-200">
              <ShoppingCart size={20} />
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-6 lg:px-12 flex items-center">
          <div className="relative w-64 hidden lg:block">
            <button onClick={() => setIsCatOpen(!isCatOpen)} className="bg-blue-700 py-4 px-6 w-full flex items-center justify-between font-bold hover:bg-blue-800 transition">
              <span className="flex items-center"><Menu className="mr-3" size={20} /> Categories</span>
              <ChevronRight size={16} className={`transition-transform ${isCatOpen ? 'rotate-90' : ''}`} />
            </button>
            {isCatOpen && (
              <div className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-2xl border-t-2 border-orange-500 rounded-b-xl z-[100] py-2">
                {['Electronics', 'Laptops', 'Tablets', 'Audio', 'Mobiles'].map(c => (
                  <Link key={c} to={`/category/${c.toLowerCase()}`} className="block px-6 py-3 hover:bg-blue-50 hover:text-blue-600 transition">
                    {c}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-center space-x-10 font-bold text-xs uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-400 py-5 transition">Home</Link>
            <Link to="/shop" className="hover:text-orange-400 py-5 transition">Shop</Link>
            <Link to="/cart" className="text-orange-400 border-b-4 border-orange-400 py-5">My Cart</Link>
            <Link to="/checkout" className="hover:text-orange-400 py-5 transition">Checkout</Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center space-x-4 mb-10">
            <Link to="/shop" className="flex items-center text-sm font-bold text-blue-600 hover:underline">
                <ArrowLeft size={16} className="mr-1" /> Continue Shopping
            </Link>
            <div className="h-px flex-1 bg-gray-200"></div>
            <h1 className="text-2xl font-black uppercase italic">Shopping Cart</h1>
        </div>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* CART LIST */}
            <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-[0.2em] font-black">
                    <th className="px-8 py-5">Product Details</th>
                    <th className="py-5">Quantity</th>
                    <th className="py-5">Total</th>
                    <th className="px-8 py-5 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-5">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl shadow-inner border border-gray-100" />
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                            <p className="text-xs font-bold text-blue-600 bg-blue-50 w-max px-2 py-1 rounded mt-1">MOD: {item.model}</p>
                            <p className="text-sm text-gray-400 mt-1">${item.price.toFixed(2)} / unit</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex items-center bg-gray-100 rounded-full w-max p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-orange-500 font-bold">-</button>
                          <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-blue-600 font-bold">+</button>
                        </div>
                      </td>
                      <td className="py-6 font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => removeItem(item.id)} className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-8 bg-blue-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex bg-white rounded-full p-1 shadow-sm w-full md:w-96 border border-blue-100">
                    <input type="text" placeholder="Coupon Code" className="bg-transparent px-5 py-2 outline-none flex-1 text-sm" />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase">Apply</button>
                </div>
                <button onClick={() => setItems([])} className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-tighter">Clear All Items</button>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100">
                <h2 className="text-xl font-black mb-8 flex items-center">
                    <CreditCard className="mr-2 text-orange-500" size={24} /> Summary
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Flat Shipping</span>
                    <span className="text-gray-900">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-dashed bg-gray-200 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 font-bold uppercase text-xs">Total Amount</span>
                    <span className="text-4xl font-black text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" className="block text-center w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95">
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6 flex justify-center space-x-4 opacity-30 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="paypal" />
                </div>
              </div>
              
              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg">Free Delivery</h4>
                    <p className="text-blue-100 text-sm mt-1">On orders over $1000.00</p>
                  </div>
                  <ShoppingBag size={80} className="absolute -right-4 -bottom-4 text-blue-500 rotate-12 opacity-50 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-300">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={40} className="text-gray-200" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Your cart is feeling lonely.</h2>
            <p className="text-gray-400 mb-10 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest electronics and find something you love!</p>
            <Link to="/shop" className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Start Shopping <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;