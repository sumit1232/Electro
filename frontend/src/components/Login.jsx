import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Lock, Mail, Eye, EyeOff, 
  Chrome, Github, ArrowRight, ChevronLeft 
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // 1. LOGIC HANDLERS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API Call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome back, ${formData.email}!`);
      navigate('/shop'); // Redirect to shop after success
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Back to Home Link */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center text-sm font-bold text-gray-400 hover:text-blue-600 transition">
          <ChevronLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center text-4xl font-black text-blue-600 tracking-tighter">
            <ShoppingBag className="text-orange-500 mr-2" size={42} /> ELECTRO
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 uppercase tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          New to Electro?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:text-orange-500 transition-colors">
            Create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl shadow-blue-900/5 sm:rounded-[2.5rem] border border-gray-100 sm:px-12 relative overflow-hidden">
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 opacity-[0.03] rounded-full -mr-12 -mt-12"></div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400">
                  Password
                </label>
                <Link to="/forgot-password" size={12} className="text-xs font-bold text-blue-600 hover:text-orange-500">
                  Forgot?
                </Link>
              </div>
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
            </div>

            <div className="flex items-center">
              <input
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-lg cursor-pointer"
              />
              <label className="ml-3 block text-sm font-bold text-gray-500 cursor-pointer">
                Keep me logged in
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl text-white bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-200 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="flex items-center">
                    Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black">
                <span className="px-4 bg-white text-gray-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-4 px-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all font-bold text-sm">
                <Chrome size={18} className="mr-3 text-red-500" /> Google
              </button>
              <button className="flex items-center justify-center py-4 px-4 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all font-bold text-sm">
                <Github size={18} className="mr-3 text-gray-900" /> Github
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center">
          <Lock size={12} className="mr-2" /> 256-bit SSL Secure Connection
        </p>
      </div>
    </div>
  );
};

export default Login;