import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [line, setLine] = useState(0);

  const loadingLines = [
    "Initializing portfolio...",
    "Loading projects...",
    "Loading skills...",
    "Loading experience...",
    "Optimizing assets...",
    "Ready.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLine((prev) => {
        if (prev >= loadingLines.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-[9999]">
      <div className="w-full max-w-2xl px-6">

        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            Rohan<span className="text-blue-500">.</span>
          </h1>

          <p className="text-gray-400 mt-3">
            MERN Stack Developer
          </p>
        </div>

        {/* Terminal */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">

          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>

            <span className="ml-3 text-gray-500 text-sm">
              portfolio.sh
            </span>
          </div>

          <div className="p-5 font-mono text-sm">
            <p className="text-blue-400">
              $ npm run portfolio
            </p>

            <div className="mt-4 space-y-2">
              {loadingLines.slice(0, line + 1).map((item, index) => (
                <p
                  key={index}
                  className="text-gray-300 animate-fadeIn"
                >
                  <span className="text-blue-500 mr-2">✓</span>
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-6">
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="loading-progress h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}