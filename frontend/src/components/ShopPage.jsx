import React, { useState } from 'react';

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState(0);

  return (
    <div className="font-sans text-gray-700 bg-white">
      {/* --- TOPBAR --- */}
      <div className="hidden lg:block border-bottom border-gray-200 px-12 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex space-x-3 text-gray-500">
            <a href="#" className="hover:text-blue-600">Help</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Support</a>
            <span>/</span>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
          <div className="text-gray-500">
            Call Us: <a href="tel:+0121234567890" className="font-medium text-gray-800">(+012) 1234 567890</a>
          </div>
          <div className="flex space-x-4 items-center">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option>
              <option>Spanish</option>
            </select>
            <a href="#" className="flex items-center"><i className="fa fa-home mr-2"></i> My Dashboard</a>
          </div>
        </div>
      </div>

      {/* --- HEADER / SEARCH --- */}
      <div className="px-12 py-6 hidden lg:flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-blue-600 flex items-center">
            <i className="fas fa-shopping-bag text-orange-500 mr-2"></i>Electro
          </h1>
        </div>
        
        <div className="flex-1 max-w-2xl px-10">
          <div className="relative flex items-center border rounded-full overflow-hidden">
            <input 
              type="text" 
              placeholder="Search Looking For?" 
              className="w-full px-6 py-3 outline-none"
            />
            <select className="border-l px-4 py-3 bg-gray-50 outline-none">
              <option>All Category</option>
            </select>
            <button className="bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-gray-500">
          <button className="w-10 h-10 border rounded-full hover:bg-gray-100"><i className="fas fa-random"></i></button>
          <button className="w-10 h-10 border rounded-full hover:bg-gray-100"><i className="fas fa-heart"></i></button>
          <div className="flex items-center">
            <button className="w-10 h-10 border rounded-full hover:bg-gray-100"><i className="fas fa-shopping-cart"></i></button>
            <span className="ml-2 font-bold text-gray-900">$0.00</span>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="bg-blue-600 text-white">
        <div className="flex px-12 items-center">
          <div className="w-64 bg-white/10 py-4 px-6 flex items-center cursor-pointer">
            <i className="fa fa-bars mr-3"></i>
            <span className="font-bold">All Categories</span>
          </div>
          <div className="flex-1 flex justify-center space-x-8 font-medium">
            <a href="#" className="hover:text-orange-400 py-4">Home</a>
            <a href="#" className="text-orange-400 border-b-2 border-orange-400 py-4">Shop</a>
            <a href="#" className="hover:text-orange-400 py-4">Shop Cart</a>
            <a href="#" className="hover:text-orange-400 py-4">Checkout</a>
            <a href="#" className="hover:text-orange-400 py-4">Contact</a>
          </div>
          <div className="bg-orange-500 rounded-full px-6 py-2 my-2 cursor-pointer hover:bg-orange-600 transition">
            <i className="fa fa-mobile-alt mr-2"></i> +0123 456 7890
          </div>
        </div>
      </nav>

      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-800 py-16 text-center text-white bg-[url('https://via.placeholder.com/1920x400')] bg-cover bg-center">
        <h1 className="text-5xl font-bold mb-4">Shop Page</h1>
        <div className="flex justify-center space-x-2 text-gray-300">
          <a href="#">Home</a> <span>/</span> <a href="#">Pages</a> <span>/</span> <span className="text-white">Shop</span>
        </div>
      </div>

      {/* --- SERVICES BAR --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b">
        {[
          { icon: 'fa-sync-alt', title: 'Free Return', desc: '30 days guarantee' },
          { icon: 'fa-paper-plane', title: 'Free Shipping', desc: 'On all orders' },
          { icon: 'fa-life-ring', title: 'Support 24/7', desc: 'Online 24 hours' },
          { icon: 'fa-credit-card', title: 'Gift Cards', desc: 'Orders over $50' },
          { icon: 'fa-lock', title: 'Secure Payment', desc: '100% safe' },
          { icon: 'fa-blog', title: 'Online Service', desc: 'Free returns' },
        ].map((item, idx) => (
          <div key={idx} className="p-6 border-r last:border-r-0 flex flex-col items-center text-center">
            <i className={`fas ${item.icon} text-2xl text-blue-600 mb-3`}></i>
            <h6 className="font-bold text-xs uppercase">{item.title}</h6>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* --- MAIN SHOP CONTENT --- */}
      <div className="container mx-auto px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Categories */}
            <section>
              <h4 className="text-xl font-bold border-b pb-2 mb-4">Categories</h4>
              <ul className="space-y-3">
                {['Accessories', 'Electronics', 'Laptops', 'Mobiles', 'Smart TV'].map(cat => (
                  <li key={cat} className="flex justify-between hover:text-blue-600 cursor-pointer">
                    <span><i className="fas fa-apple-alt text-orange-500 mr-2 text-xs"></i>{cat}</span>
                    <span className="text-gray-400">(5)</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Price Filter */}
            <section>
              <h4 className="text-xl font-bold border-b pb-2 mb-4">Price</h4>
              <input 
                type="range" 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0" max="500"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <div className="mt-2 font-bold text-blue-600">${priceRange}</div>
            </section>

            {/* Featured Section */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Featured</h4>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 mb-4 items-center">
                  <div className="w-16 h-16 bg-white border p-1 rounded">
                    <img src={`https://via.placeholder.com/60`} alt="prod" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm">Smart Device {i}</h6>
                    <div className="text-orange-400 text-xs flex"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></div>
                    <div className="font-bold">$2.99 <span className="text-red-500 line-through text-xs font-normal">$4.11</span></div>
                  </div>
                </div>
              ))}
            </section>

            {/* Banner */}
            <div className="relative rounded-lg overflow-hidden group">
               <img src="https://via.placeholder.com/300x400" className="w-full" alt="banner" />
               <div className="absolute inset-0 bg-orange-500/20 flex flex-col items-center justify-center p-6 text-center">
                  <h5 className="text-4xl font-bold text-blue-600">SALE</h5>
                  <p className="text-gray-900 font-bold mb-4">Up to 50% Off</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Shop Now</button>
               </div>
            </div>
          </aside>

          {/* PRODUCT GRID (Placeholder) */}
          <main className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offer Item 1 */}
              <div className="border rounded-lg p-6 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
                <div>
                  <p className="text-gray-400 text-sm">Best Camera for You!</p>
                  <h3 className="text-2xl font-bold text-blue-600">Smart Camera</h3>
                  <h1 className="text-4xl font-bold text-orange-500">40% <span className="text-blue-600 font-light">Off</span></h1>
                </div>
                <img src="https://via.placeholder.com/150" alt="camera" className="w-32" />
              </div>
              {/* Offer Item 2 */}
              <div className="border rounded-lg p-6 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
                <div>
                  <p className="text-gray-400 text-sm">Best Watch for You!</p>
                  <h3 className="text-2xl font-bold text-blue-600">Smart Watch</h3>
                  <h1 className="text-4xl font-bold text-orange-500">20% <span className="text-blue-600 font-light">Off</span></h1>
                </div>
                <img src="https://via.placeholder.com/150" alt="watch" className="w-32" />
              </div>
            </div>
            
            {/* Tag Cloud */}
            <div className="mt-12">
              <h4 className="font-bold mb-4 uppercase tracking-wider">Product Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['New', 'Brand', 'Gadget', 'Mobile', 'Camera', 'Sale'].map(tag => (
                  <span key={tag} className="px-4 py-1 border rounded hover:bg-blue-600 hover:text-white cursor-pointer transition">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;