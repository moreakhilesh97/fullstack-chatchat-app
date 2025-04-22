const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="flex items-center justify-center bg-base-200  p-12 min-h-screen">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-2xl ${
                  i % 2 === 0 ? "bg-primary bg-green-700 animate-pulse" : "bg-primary/20"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-red-500">{title}</h2>
          <p className="text-green-500">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  