import logo from '@/assets/img/logo.png'


const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          {/* Logo - Centered at top */}
          <div className="flex justify-center mb-4">
  <div className="w-30 h-30 rounded-lg grid place-items-center">
    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
  </div>
</div>
          
          {/* Company Name - Below logo */}
          <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Nawalowa Constructions
          </h1>
          </div>
          
          {/* Admin Login Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Admin Login
          </h2>
          
          {/* Welcome Message */}
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Welcome back! Please sign in to access your<br />
            dashboard.
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email or Username
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;