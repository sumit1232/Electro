import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Shuffle, Heart, ShoppingCart, 
  Menu, Phone, RefreshCcw, Send, LifeBuoy, CreditCard, Lock, Newspaper 
} from 'lucide-react';

const CheckoutPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="font-sans text-gray-700 bg-white">
      {/* Topbar */}
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
            <span className="text-gray-900 font-medium">Call Us:</span> (+012) 1234 567890
          </div>
          <div className="flex space-x-4">
            <select className="bg-transparent outline-none cursor-pointer">
              <option>USD</option>
              <option>EUR</option>
            </select>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header / Search Bar */}
      <div className="px-12 py-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <a href="/" className="flex items-center text-4xl font-bold text-blue-600">
              <ShoppingBag className="mr-2 text-orange-500" size={40} />
              Electro
            </a>
          </div>
          
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex border-2 border-blue-600 rounded-full overflow-hidden">
              <input 
                type="text" 
                placeholder="Search Looking For?" 
                className="w-full px-6 py-3 outline-none"
              />
              <select className="hidden md:block border-l px-4 bg-gray-50 outline-none">
                <option>All Category</option>
                <option>Electronics</option>
              </select>
              <button className="bg-blue-600 text-white px-8 hover:bg-blue-700 transition">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex justify-end space-x-5 mt-4 lg:mt-0">
            <IconButton Icon={Shuffle} />
            <IconButton Icon={Heart} />
            <div className="flex items-center space-x-2 border rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <ShoppingCart size={20} />
              <span className="font-bold">$0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-12">
        <div className="flex items-center">
          <div className="relative w-64 bg-blue-700 py-4 px-6 cursor-pointer group" 
               onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
            <div className="flex items-center font-bold">
              <Menu className="mr-3" /> All Categories
            </div>
            {isCategoryOpen && (
              <ul className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-xl z-50 border-t-2 border-orange-500">
                <CategoryItem label="Accessories" count={3} />
                <CategoryItem label="Electronics" count={5} />
                <CategoryItem label="Laptops" count={2} />
              </ul>
            )}
          </div>
          <div className="flex-1 flex space-x-8 px-8 font-medium">
            <a href="#" className="hover:text-orange-400 py-4 border-b-2 border-transparent hover:border-orange-400">Home</a>
            <a href="#" className="hover:text-orange-400 py-4">Shop</a>
            <a href="#" className="text-orange-400 py-4">Checkout</a>
          </div>
          <div className="hidden lg:flex items-center bg-orange-500 px-6 py-2 rounded-full hover:bg-orange-600 transition cursor-pointer">
            <Phone size={18} className="mr-2" /> +0123 456 7890
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-slate-800 py-16 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Checkout Page</h1>
        <p className="text-gray-400">Home / Pages / <span className="text-white">Checkout</span></p>
      </div>

      {/* Service Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b">
        <ServiceBox Icon={RefreshCcw} title="Free Return" desc="30 days guarantee" />
        <ServiceBox Icon={Send} title="Free Shipping" desc="On all orders" />
        <ServiceBox Icon={LifeBuoy} title="Support 24/7" desc="Online 24 hours" />
        <ServiceBox Icon={CreditCard} title="Gift Cards" desc="On orders over $50" />
        <ServiceBox Icon={Lock} title="Secure Payment" desc="100% secure" />
        <ServiceBox Icon={Newspaper} title="Online Service" desc="Free returns" />
      </div>

      {/* Checkout Form Section */}
      <div className="bg-gray-50 py-16 px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Billing Details */}
          <div className="flex-1 bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-3xl font-bold mb-8">Billing Details</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="First Name" required />
                <InputGroup label="Last Name" required />
              </div>
              <InputGroup label="Company Name" required />
              <InputGroup label="Address" placeholder="House number and street name" required />
              <InputGroup label="Town / City" required />
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Country" required />
                <InputGroup label="Postcode / Zip" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Mobile" type="tel" required />
                <InputGroup label="Email Address" type="email" required />
              </div>
              
              <div className="space-y-3 pt-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Create an account?</span>
                </label>
                <hr className="my-6" />
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Ship to a different address?</span>
                </label>
              </div>
              <textarea 
                placeholder="Order Notes (Optional)" 
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-40"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-5/12 bg-white p-8 rounded-xl shadow-sm h-fit">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 font-bold">Product</th>
                  <th className="py-4 text-center">Qty</th>
                  <th className="py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <OrderRow name="Apple iPad Mini" qty={2} price={538} />
                <OrderRow name="Smart Watch V8" qty={1} price={299} />
              </tbody>
              <tfoot className="font-bold">
                <tr className="border-t">
                  <td className="py-4">Subtotal</td>
                  <td></td>
                  <td className="py-4 text-right">$837.00</td>
                </tr>
                <tr className="border-t">
                  <td className="py-4 align-top">Shipping</td>
                  <td colSpan="2" className="py-4 space-y-2">
                    <ShippingOption id="s1" label="Free Shipping" />
                    <ShippingOption id="s2" label="Flat rate: $15.00" />
                  </td>
                </tr>
                <tr className="border-t-2 border-blue-600 text-xl text-blue-600">
                  <td className="py-6">TOTAL</td>
                  <td></td>
                  <td className="py-6 text-right">$852.00</td>
                </tr>
              </tfoot>
            </table>

            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-center font-bold mb-2">
                  <input type="radio" name="payment" className="mr-2 w-4 h-4" defaultChecked /> Direct Bank Transfer
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Make your payment directly into our bank account. Your order will not be shipped until funds clear.
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const IconButton = ({ Icon }) => (
  <div className="p-3 border rounded-full text-gray-400 hover:text-blue-600 hover:border-blue-600 cursor-pointer transition">
    <Icon size={20} />
  </div>
);

const CategoryItem = ({ label, count }) => (
  <li className="flex justify-between px-6 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0">
    <span>{label}</span>
    <span className="text-gray-400">({count})</span>
  </li>
);

const ServiceBox = ({ Icon, title, desc }) => (
  <div className="p-6 flex flex-col items-center text-center border-r last:border-0 hover:bg-gray-50 transition">
    <Icon className="text-blue-600 mb-3" size={32} />
    <h6 className="font-bold uppercase text-xs mb-1">{title}</h6>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

const InputGroup = ({ label, type = "text", placeholder = "", required = false }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-semibold text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
    />
  </div>
);

const OrderRow = ({ name, qty, price }) => (
  <tr className="border-b border-gray-100">
    <td className="py-4">{name}</td>
    <td className="py-4 text-center">{qty}</td>
    <td className="py-4 text-right">${price.toFixed(2)}</td>
  </tr>
);

const ShippingOption = ({ id, label }) => (
  <label className="flex items-center justify-end space-x-2 cursor-pointer">
    <span className="text-sm text-gray-600">{label}</span>
    <input type="radio" name="shipping" id={id} className="w-4 h-4 text-blue-600" />
  </label>
);

export default CheckoutPage;