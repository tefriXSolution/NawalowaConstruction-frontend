import heroCoverImg from "@/assets/img/heroSectionImg.jpg"

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroCoverImg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl w-full py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-pj mb-6">
            Building the Future,
            <span className="block mt-2">One Project at a Time</span>
          </h1>
          
          <div className="relative inline-flex justify-center w-full mb-6">
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full"></div>
          </div>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-200 font-inter mb-10 leading-relaxed">
            Your trusted partner for robust construction, precise painting, and reliable equipment rentals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
            <a
              href="#"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 border border-transparent rounded-xl font-pj transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl"
            >
              Get a Free Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </a>

            <a
              href="#"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-xl font-pj transition-all duration-300 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Message Us Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </a>
          </div>
          
          <div className="mt-20 animate-bounce">
            <div className="flex justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}