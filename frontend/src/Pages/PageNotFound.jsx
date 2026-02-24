import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, Home, ArrowLeft, 
  Settings, Ghost, AlertTriangle 
} from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* --- MINIMAL HEADER --- */}
      <div className="px-12 py-6 flex justify-between items-center border-b border-gray-50">
        <Link to="/" className="flex items-center text-3xl font-black text-blue-600 tracking-tighter">
          <ShoppingBag className="text-orange-500 mr-2" size={32} /> ELECTRO
        </Link>
        <div className="hidden md:flex space-x-6 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link to="/shop" className="hover:text-blue-600 transition">Shop</Link>
          <Link to="/help" className="hover:text-blue-600 transition">Help Center</Link>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          {/* Large Stylized 404 */}
          <h1 className="text-[12rem] md:text-[20rem] font-black text-gray-50 leading-none select-none">
            404
          </h1>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-orange-500 text-white p-4 rounded-2xl rotate-12 mb-4 shadow-xl">
              <AlertTriangle size={48} strokeWidth={3} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">
              Page Unplugged
            </h2>
          </div>
        </div>

        <div className="max-w-md mx-auto -mt-8 relative z-10">
          <p className="text-gray-500 font-medium mb-8">
            The gadget you're looking for has been disconnected or moved to a different frequency. Let's get you back online.
          </p>

          {/* Search Bar on 404 */}
          <div className="flex border-2 border-blue-600 rounded-full overflow-hidden mb-10 shadow-lg shadow-blue-100">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full px-6 py-3 outline-none font-medium" 
            />
            <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/shop" 
              className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-200 flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} /> Continue Shopping
            </Link>
            <Link 
              to="/" 
              className="w-full sm:w-auto bg-gray-100 text-gray-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <Home className="mr-2" size={18} /> Home Page
            </Link>
          </div>
        </div>
      </main>

      {/* --- FOOTER DECORATION --- */}
      <div className="py-12 flex justify-center opacity-20">
        <div className="flex space-x-12 grayscale">
          <Settings className="animate-spin-slow" size={40} />
          <Ghost size={40} />
          <Settings className="animate-reverse-spin" size={32} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 6s linear infinite; }
      `}} />
    </div>
  );
};

export default PageNotFound;