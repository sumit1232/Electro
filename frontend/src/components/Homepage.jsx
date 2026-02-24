import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, Shuffle, ShoppingCart, 
  Menu, Phone, User, RefreshCcw, Truck, LifeBuoy, 
  CreditCard, Lock, Newspaper, Eye, Star 
} from 'lucide-react';
import axios from 'axios';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // FIX: useEffect cannot be async directly. 
  // We define an internal async function instead.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?limit=12');
        // dummyjson returns { products: [...], total: 100, ... }
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* --- Topbar --- */}
      <div className="hidden lg:block border-b bg-white border-gray-100 px-12 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-blue-600"></a>
            <span></span>
            <a href="#" className="hover:text-blue-600"></a>
            <span></span>
            <a href="#" className="hover:text-blue-600"></a>
          </div>
          <div className="text-gray-600">
            Call Us: <a href="tel:01234567890" className="hover:text-blue-600">(+012) 1234 567890</a>
          </div>
          <div className="flex gap-6 items-center text-gray-600">
            <select className="bg-transparent outline-none cursor-pointer"><option>USD</option><option>EUR</option></select>
            <select className="bg-transparent outline-none cursor-pointer"><option>English</option><option>Spanish</option></select>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <User size={16} /> <span>My Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Header / Search --- */}
      <header className="px-6 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-blue-600">Electro</h1>
          </Link>

          <div className="w-full lg:max-w-2xl flex border-2 border-blue-600 rounded-full overflow-hidden">
            <input 
              type="text" 
              placeholder="Search Looking For?" 
              className="flex-grow px-6 py-3 outline-none"
            />
            <select className="hidden md:block border-l border-gray-200 px-4 bg-gray-50 outline-none">
              <option>All Category</option>
              <option>Electronics</option>
              <option>Smartphones</option>
            </select>
            <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <IconButton icon={<Shuffle size={20} />} />
            <IconButton icon={<Heart size={20} />} />
            <Link to="/cart" className="flex items-center gap-3 cursor-pointer group">
              <div className="relative p-3 border rounded-full group-hover:bg-blue-50">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
              <span className="font-bold">$0.00</span>
            </Link>
          </div>
        </div>
      </header>

      {/* --- Navigation --- */}
      <nav className="bg-blue-600 px-6 lg:px-12 relative">
        <div className="flex items-center">
          <div className="relative w-64 hidden lg:block">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-3 bg-white/10 text-white w-full py-4 px-6 hover:bg-white/20 transition"
            >
              <Menu size={20} /> <span className="font-bold">All Categories</span>
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-t-0 shadow-xl z-50">
                <CategoryLink label="Accessories" count={3} />
                <CategoryLink label="Electronics & Computer" count={5} />
                <CategoryLink label="Laptops & Desktops" count={2} />
                <CategoryLink label="Mobiles & Tablets" count={8} />
              </div>
            )}
          </div>

          <div className="flex-grow flex items-center justify-between text-white font-medium pl-6">
            <div className="flex gap-8">
              <Link to="/" className="hover:text-blue-200 transition">Home</Link>
              <Link to="/shop" className="hover:text-blue-200 transition">Shop</Link>
              <Link to="/cart" className="hover:text-blue-200 transition">Cart</Link>
              <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold">
              <Phone size={18} /> +0123 456 7890
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="bg-gray-100 py-12 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 bg-white rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="space-y-6 flex-1">
              <h4 className="text-blue-600 font-bold uppercase tracking-widest">Save Up To $400</h4>
              <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                Selected Laptops <br /> & Smartphones
              </h2>
              <p className="text-gray-500">Terms and Conditions Apply</p>
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all hover:shadow-lg">
                Shop Now
              </button>
            </div>
            <div className="flex-1 text-center">
              <img src="https://via.placeholder.com/500x400" alt="Hero" className="inline-block object-contain" />
            </div>
          </div>

          <div className="lg:col-span-3 bg-blue-900 rounded-2xl overflow-hidden relative group">
             <img src="https://via.placeholder.com/300x500" className="w-full h-full object-cover opacity-50" alt="Special Offer" />
             <div className="absolute inset-0 p-6 flex flex-col justify-center text-center text-white">
                <span className="bg-blue-600 text-xs font-bold py-1 px-3 rounded-full self-center mb-4">SAVE $48.00</span>
                <h3 className="text-2xl font-bold mb-2">Apple iPad Mini</h3>
                <div className="mb-6">
                  <span className="text-gray-400 line-through mr-2">$1,250</span>
                  <span className="text-blue-400 text-xl font-bold">$1,050</span>
                </div>
                <button className="bg-white text-blue-900 py-3 rounded-full flex items-center justify-center gap-2 font-bold hover:bg-blue-50 transition">
                  <ShoppingCart size={18} /> Add To Cart
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* --- Services --- */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-y border-gray-100 bg-white">
        <ServiceItem icon={<RefreshCcw className="text-blue-600" />} title="Free Return" desc="30 Days Guarantee" />
        <ServiceItem icon={<Truck className="text-blue-600" />} title="Free Shipping" desc="On all orders" />
        <ServiceItem icon={<LifeBuoy className="text-blue-600" />} title="Support 24/7" desc="Online Support" />
        <ServiceItem icon={<CreditCard className="text-blue-600" />} title="Gift Card" desc="Orders over $50" />
        <ServiceItem icon={<Lock className="text-blue-600" />} title="Secure Pay" desc="Value your safety" />
        <ServiceItem icon={<Newspaper className="text-blue-600" />} title="Online Service" desc="Fast returns" />
      </section>

      {/* --- Product Grid Section --- */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold">Our Products</h2>
          <div className="flex flex-wrap gap-2">
            <TabButton label="All Products" active />
            <TabButton label="New Arrivals" />
            <TabButton label="Featured" />
            <TabButton label="Top Selling" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// --- Sub-components (Updated to accept props) ---

const IconButton = ({ icon }) => (
  <button type="button" className="p-3 border rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-600 transition">
    {icon}
  </button>
);

const CategoryLink = ({ label, count }) => (
  <a href="#" className="flex justify-between px-6 py-3 hover:bg-gray-50 border-b border-gray-50 text-gray-700">
    <span>{label}</span>
    <span className="text-gray-400">({count})</span>
  </a>
);

const ServiceItem = ({ icon, title, desc }) => (
  <div className="p-6 border-r border-gray-100 flex items-center gap-4 group hover:bg-gray-50 transition">
    <div className="p-3 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h6 className="font-bold text-xs uppercase">{title}</h6>
      <p className="text-[10px] text-gray-500">{desc}</p>
    </div>
  </div>
);

const TabButton = ({ label, active }) => (
  <button type="button" className={`px-6 py-2 rounded-full text-sm font-semibold transition ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
    {label}
  </button>
);

const ProductCard = ({ product }) => (
  <div className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
    <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
      <img 
        src={product?.thumbnail || "https://via.placeholder.com/300"} 
        alt={product?.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
      />
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded">
        {product?.discountPercentage > 10 ? 'SALE' : 'NEW'}
      </div>
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <button type="button" className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition">
          <Eye size={20} />
        </button>
      </div>
    </div>
    <div className="p-6 text-center">
      <p className="text-xs text-blue-600 font-bold mb-2 uppercase">{product?.category}</p>
      <h3 className="font-bold mb-3 truncate px-2">{product?.title}</h3>
      <div className="flex justify-center gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < Math.round(product?.rating || 0) ? "currentColor" : "none"} />
        ))}
      </div>
      <div className="mb-4">
        <span className="text-gray-400 line-through mr-2">
          ${(product?.price * 1.2).toFixed(2)}
        </span>
        <span className="text-blue-600 text-xl font-bold">${product?.price}</span>
      </div>
      <Link to="/cart">
      <button type="button" className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors">
        <ShoppingCart size={18} /> Add To Cart
      </button>
      </Link>
    </div>
  </div>
);

export default Homepage;