import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, Menu, Phone, ChevronRight, X, ShoppingBag 
} from 'lucide-react';

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Real cart logic

  const categories = ['Accessories', 'Electronics', 'Laptops', 'Smart TV'];

  // 1. DYNAMIC PRODUCT DATA WITH REAL URLs
  const products = [
    { 
      id: 1, name: 'Smart Camera', category: 'Electronics', price: 299, discount: '40%', 
      img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop' 
    },
    { 
      id: 2, name: 'Smart Watch', category: 'Accessories', price: 150, discount: '20%', 
      img: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop' 
    },
    { 
      id: 3, name: 'iPad Mini', category: 'Laptops', price: 450, discount: '10%', 
      img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop' 
    },
    { 
      id: 4, name: 'Noise Cancel Headphones', category: 'Accessories', price: 199, discount: '15%', 
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' 
    },
  ];

  // 2. SEARCH & FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesPrice = product.price <= priceRange;
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesCategory && matchesSearch;
    });
  }, [priceRange, selectedCategory, searchQuery]);

  // 3. CART ACTIONS
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="font-sans text-gray-700 bg-white min-h-screen">
      {/* --- HEADER --- */}
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

      {/* --- NAVIGATION --- */}
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
                {['All', ...categories].map(cat => (
                  <button 
                    key={cat}
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

      {/* --- MAIN CONTENT --- */}
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
                type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0" max="1000" value={priceRange}
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
                {['All', ...categories].map(cat => (
                  <li 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex justify-between items-center cursor-pointer transition-all px-4 py-3 rounded-xl border-2 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'hover:bg-gray-50 border-transparent'}`}
                  >
                    <span className="flex items-center font-bold text-sm"><ChevronRight size={14} className="mr-2" />{cat}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-2xl border">
               <p className="text-sm font-bold">Found <span className="text-blue-600">{filteredProducts.length}</span> results</p>
               {selectedCategory !== 'All' && (
                 <button onClick={() => setSelectedCategory('All')} className="text-[10px] font-black uppercase flex items-center bg-white px-4 py-2 rounded-full border shadow-sm hover:bg-red-50 hover:text-red-500 transition-all">
                   Reset Category <X size={12} className="ml-2" />
                 </button>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group border-2 border-gray-100 rounded-[2rem] p-6 flex justify-between items-center bg-white hover:shadow-2xl hover:border-blue-200 transition-all duration-500 relative overflow-hidden">
                  <div className="space-y-2 z-10">
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-2xl font-black text-gray-800 leading-tight">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-orange-500">${product.price}</span>
                        <span className="text-xs text-gray-400 line-through">$500</span>
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
                <h2 className="text-2xl font-black text-gray-400 italic tracking-tighter">No items match your search.</h2>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setPriceRange(1000)}} className="mt-4 text-blue-600 font-bold underline hover:text-orange-500 transition-colors">Clear all filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;