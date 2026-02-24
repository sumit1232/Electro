import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, ShoppingCart, Heart, Menu, Phone, ChevronRight, X, ShoppingBag 
} from 'lucide-react';

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Added error state

  const categories = ['All', 'smartphones', 'laptops', 'tablets', 'accessories', 'gaming', 'cameras', 'smartwatches', 'televisions', 'headphones'];

  // ✅ Fixed useEffect dependency & error handling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.products || response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please check backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Fixed mapping - safe field access
  const mappedProducts = useMemo(() => {
    return (products || []).map(product => ({
      id: product._id || product.id || `product-${Math.random()}`,
      name: product.title || 'Unnamed Product',
      category: product.category || 'accessories',
      price: product.price || 0,
      discountPercentage: product.discountPercentage || 0,
      discount: `${product.discountPercentage || 0}%`,
      img: product.thumbnail || 'https://via.placeholder.com/300',
      stock: product.stock || 0,
      brand: product.brand || 'Brand'
    }));
  }, [products]);

  // ✅ Fixed filter dependencies
  const filteredProducts = useMemo(() => {
    return mappedProducts.filter(product => {
      const matchesPrice = product.price <= priceRange;
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesCategory && matchesSearch;
    });
  }, [mappedProducts, priceRange, selectedCategory, searchQuery]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl font-bold text-gray-700">Loading Electro products...</p>
          <p className="text-sm text-gray-500 mt-2">Connecting to your database</p>
        </div>
      </div>
    );
  }

  // ✅ Error screen
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-12 max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-4">Products Failed to Load</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Retry Loading Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      {/* HEADER */}
      <div className="px-12 py-6 flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="text-4xl font-black text-blue-600 flex items-center tracking-tighter">
          <ShoppingBag className="text-orange-500 mr-2" size={36} /> ELECTRO
        </Link>
        
        <div className="flex-1 max-w-2xl px-4">
          <div className="flex border-2 border-blue-600 rounded-full overflow-hidden focus-within:ring-4 ring-blue-100 transition-all">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full px-6 py-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-all">
            <ShoppingCart size={20} />
            <span className="font-bold">${cartTotal.toFixed(2)}</span>
            <span className="bg-orange-500 text-[10px] px-2 py-0.5 rounded-full">{cart.length}</span>
          </Link>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div className="flex px-12 items-center">
          <div className="relative w-64">
            <button 
              onClick={() => setIsCatOpen(!isCatOpen)}
              className="bg-blue-700 py-4 px-6 w-full flex items-center justify-between font-bold hover:bg-blue-800 transition"
            >
              <span className="flex items-center"><Menu size={20} className="mr-3" /> Categories</span>
              <ChevronRight size={16} className={`transition-transform duration-300 ${isCatOpen ? 'rotate-90' : ''}`} />
            </button>

            {isCatOpen && (
              <div className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-2xl border-t-2 border-orange-500 py-2 z-50">
                {categories.map(cat => (
                  <button 
                    key={cat}  // ✅ Fixed key warning
                    onClick={() => { setSelectedCategory(cat); setIsCatOpen(false); }}
                    className="w-full text-left px-6 py-3 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center transition"
                  >
                    {cat} <ChevronRight size={14} className="text-gray-300" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center space-x-10 font-bold text-xs tracking-widest uppercase">
            <Link to="/" className="hover:text-orange-400 py-4 transition">Home</Link>
            <Link to="/shop" className="text-orange-400 border-b-2 border-orange-400 py-4">Shop</Link>
            <Link to="/contact" className="hover:text-orange-400 py-4 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - YOUR ORIGINAL JSX */}
      <div className="container mx-auto px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="lg:w-1/4 space-y-10">
            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Filter By Price
              </h4>
              <input 
                type="range" 
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0" max="4000" step="50" value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="flex justify-between mt-4">
                <span className="text-sm font-bold text-gray-400 uppercase">Max Price:</span>
                <span className="font-black text-blue-600 text-lg">${priceRange}</span>
              </div>
            </section>

            <section>
              <h4 className="text-xl font-bold border-b-2 border-gray-100 pb-3 mb-6">Department</h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li 
                    key={cat}  // ✅ Fixed key warning
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex justify-between items-center cursor-pointer transition-all px-4 py-3 rounded-xl border-2 ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'hover:bg-gray-50 border-transparent'
                    }`}
                  >
                    <span className="flex items-center font-bold text-sm">
                      <ChevronRight size={14} className="mr-2" />
                      {cat}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-2xl border">
              <p className="text-sm font-bold">
                Found <span className="text-blue-600">{filteredProducts.length}</span> results
              </p>
              {selectedCategory !== 'All' && (
                <button 
                  onClick={() => setSelectedCategory('All')} 
                  className="text-[10px] font-black uppercase flex items-center bg-white px-4 py-2 rounded-full border shadow-sm hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  Reset Category <X size={12} className="ml-2" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}  // ✅ Fixed key warning
                  className="group border-2 border-gray-100 rounded-[2rem] p-6 flex justify-between items-center bg-white hover:shadow-2xl hover:border-blue-200 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="space-y-2 z-10">
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </p>
                    <h3 className="text-2xl font-black text-gray-800 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-orange-500">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ${((product.price * 1.2) || 500).toFixed(0)}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 transition-all active:scale-90 flex items-center gap-2 shadow-lg"
                    >
                      <ShoppingCart size={18} /> Buy Now
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-125 transition-transform duration-700 opacity-20"></div>
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-40 h-40 object-cover rounded-2xl relative z-10 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                    {product.discount} OFF
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-200">
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <h2 className="text-2xl font-black text-gray-400 italic tracking-tighter">
                  No items match your search.
                </h2>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All'); 
                    setPriceRange(4000);
                  }} 
                  className="mt-4 text-blue-600 font-bold underline hover:text-orange-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
