import { useEffect, useMemo, useState } from "react";

export default function AnimatedBackground() {
  const [shootingStars, setShootingStars] = useState([]);

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const star = {
        id: Date.now(),
        top: Math.random() * 50,
        left: Math.random() * 100,
      };

      setShootingStars((prev) => [...prev, star]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((item) => item.id !== star.id)
        );
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
        {/* Aurora */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[180px] animate-pulse" />

        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[180px] animate-pulse" />

        <div className="absolute bottom-[-250px] left-1/3 w-[800px] h-[800px] rounded-full bg-indigo-600/15 blur-[220px] animate-pulse" />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Stars */}
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      <style>{`
        .shooting-star {
          position: absolute;
          width: 220px;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(96,165,250,1),
            rgba(96,165,250,0)
          );
          transform: rotate(-35deg);
          animation: shoot 2s linear forwards;
        }

        @keyframes shoot {
          0% {
            opacity: 1;
            transform: translate(0,0) rotate(-35deg);
          }

          100% {
            opacity: 0;
            transform: translate(350px,180px) rotate(-35deg);
          }
        }
      `}</style>
    </>
  );
}