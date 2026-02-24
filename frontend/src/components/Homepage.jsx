import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Search, Heart, Shuffle, ShoppingCart, 
  Menu, Phone, User, RefreshCcw, Truck, LifeBuoy, 
  CreditCard, Lock, Newspaper, Eye, Star, ChevronRight 
} from 'lucide-react';
import axios from 'axios';

const Homepage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('All Products');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from your Electro API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products?limit=50');
        setAllProducts(response.data.products || response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Category-wise grouping
  const getCategoryProducts = (category) => {
    return allProducts.filter(product => 
      category === 'All Products' ? true : product.category === category.toLowerCase()
    ).slice(0, 8);
  };

  const categories = [
    { label: 'All Products', slug: 'All Products' },
    { label: 'Smartphones', slug: 'smartphones' },
    { label: 'Laptops', slug: 'laptops' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Accessories', slug: 'accessories' }
  ];

  const currentProducts = getCategoryProducts(activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl font-bold text-gray-600">Loading Electro Store...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      {/* --- Topbar --- */}
      <div className="hidden lg:block border-b bg-white border-gray-100 px-12 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-blue-600">Help</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Support</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
          <div className="text-gray-600">
            Call Us: <a href="tel:01234567890" className="hover:text-blue-600">(+012) 1234 567890</a>
          </div>
          <div className="flex gap-6 items-center text-gray-600">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>USD</option><option>EUR</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option><option>Spanish</option>
            </select>
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
                {categories.map(cat => (
                  <CategoryLink 
                    key={cat.slug}
                    label={cat.label} 
                    count={allProducts.filter(p => p.category === cat.slug.toLowerCase()).length}
                  />
                ))}
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

      {/* Hero + Services sections remain SAME */}
      {/* ... Hero Section ... */}
      {/* ... Services Section ... */}

      {/* --- Category Tabs & Products --- */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold">Our Products</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <TabButton 
                key={category.slug}
                label={category.label}
                active={activeTab === category.label}
                onClick={() => setActiveTab(category.label)}
              />
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product._id || product.id}  // ✅ Fixed key prop
                product={product} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// ✅ Fixed Sub-components
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

const TabButton = ({ label, active, onClick }) => (
  <button 
    type="button" 
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
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
          <Star 
            key={`star-${i}`} 
            size={14} 
            fill={i < Math.round(product?.rating || 0) ? "currentColor" : "none"} 
          />
        ))}
      </div>
      <div className="mb-4">
        <span className="text-gray-400 line-through mr-2">
          ${(product?.price * 1.2 || 0).toFixed(2)}
        </span>
        <span className="text-blue-600 text-xl font-bold">${product?.price}</span>
      </div>
      <Link to={`/product/${product?._id || product?.id}`}>
        <button 
          type="button" 
          className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <ShoppingCart size={18} /> Add To Cart
        </button>
      </Link>
    </div>
  </div>
);

export default Homepage;
