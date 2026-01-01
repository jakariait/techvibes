export default function NotFound() {
  return (
    <div className="">
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center py-16">
        <div className="text-center space-y-8">
          {/* 404 Number */}
          <div className="relative">
            <h1
              className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
              style={{
                filter: "drop-shadow(0 0 60px rgba(168, 85, 247, 0.5))",
              }}
            >
              404
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white/90">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-md mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the
              digital void.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
