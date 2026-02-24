import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Lock, Mail, User, Eye, EyeOff, 
  Chrome, Github, ArrowRight, ChevronLeft, ShieldCheck
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!formData.agreeTerms) {
        alert("Please agree to the Terms & Conditions");
        return;
    }
    setIsLoading(true);
    
    // Simulating API Registration
    setTimeout(() => {
      setIsLoading(false);
      alert(`Account created successfully for ${formData.fullName}!`);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Navigation Helper */}
      <div className="absolute top-8 left-8">
        <Link to="/login" className="flex items-center text-sm font-bold text-gray-400 hover:text-blue-600 transition">
          <ChevronLeft size={18} /> Back to Login
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center text-4xl font-black text-blue-600 tracking-tighter">
            <ShoppingBag className="text-orange-500 mr-2" size={42} /> ELECTRO
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 uppercase tracking-tight">
          Join the Club
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-orange-500 transition-colors">
            Sign In here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl shadow-blue-900/5 sm:rounded-[2.5rem] border border-gray-100 sm:px-12 relative">
          
          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Simple Password Strength UI */}
              <div className="mt-2 flex gap-1">
                <div className={`h-1 flex-1 rounded-full ${formData.password.length > 0 ? 'bg-orange-500' : 'bg-gray-100'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${formData.password.length > 5 ? 'bg-orange-500' : 'bg-gray-100'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${formData.password.length > 8 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-center group cursor-pointer">
                <input
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-lg cursor-pointer transition-all"
                />
                <span className="ml-3 block text-sm font-bold text-gray-500 group-hover:text-gray-700">
                  I agree to the <Link to="/terms" className="text-blue-600 underline">Terms</Link> & <Link to="/privacy" className="text-blue-600 underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl text-white bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center">
                  Create Account <ShieldCheck className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                </span>
              )}
            </button>
          </form>

          {/* Social Register */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                <span className="px-4 bg-white text-gray-300">Quick Connect</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm">
                <Chrome size={18} className="mr-3 text-red-500" /> Google
              </button>
              <button className="flex items-center justify-center py-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm">
                <Github size={18} className="mr-3 text-gray-900" /> Github
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Electro Secure Registration • © 2026
        </p>
      </div>
    </div>
  );
};

export default Register;