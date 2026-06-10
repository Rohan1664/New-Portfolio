import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { ProfileContext } from "../context/ProfileContext";

import AnimatedBackground from "../components/AnimatedBackground";
import { ActivityCalendar } from "react-activity-calendar";

export default function Home() {
  const { profile } = useContext(ProfileContext);

  const username = "Rohan1664";

  const [repos, setRepos] = useState(0);
  const [thisYearContrib, setThisYearContrib] = useState(0);
  const [totalContrib, setTotalContrib] = useState(0);
  const [contribData, setContribData] = useState([]);
  const [allContributions, setAllContributions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [yearOpen, setYearOpen] = useState(false);
  const [blockSize, setBlockSize] = useState(10);
  const [loading, setLoading] = useState(true);

  // ---------------- RESPONSIVE BLOCK SIZE ----------------
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;

      if (w < 480) setBlockSize(5);        // mobile
      else if (w < 768) setBlockSize(7);   // tablet
      else if (w < 1024) setBlockSize(9);  // small desktop
      else setBlockSize(11);               // large screen
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        setRepos(data?.public_repos ?? 0);

        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`
        );

        const contribJson = await contribRes.json();
        const contributions = contribJson?.contributions ?? [];

        setAllContributions(contributions);

        const yearList = [
          ...new Set(
            contributions.map((item) =>
              new Date(item.date).getUTCFullYear()
            )
          ),
        ].sort((a, b) => b - a);

        setYears(yearList);

        const defaultYear = yearList[0] || new Date().getUTCFullYear();

        setSelectedYear(defaultYear);
        applyYearData(defaultYear, contributions);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // ---------------- APPLY FILTER ----------------
  const applyYearData = (year, data = allContributions) => {
    const filtered = data.filter(
      (item) => new Date(item.date).getUTCFullYear() === year
    );

    setContribData(filtered);

    setThisYearContrib(
      filtered.reduce((s, i) => s + (i.count || 0), 0)
    );

    setTotalContrib(
      data.reduce((s, i) => s + (i.count || 0), 0)
    );
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    applyYearData(year, allContributions);
    setYearOpen(false);
  };

  return (
    <>

      <Helmet>
        <title>
          {profile?.name
            ? `${profile.name} | MERN Stack Developer Portfolio | React & Node.js Developer`
            : "Rohan Fasate | MERN Stack Developer Portfolio | React & Node.js Developer"}
        </title>

        <meta
          name="description"
          content={
            profile?.bio ||
            "Rohan Fasate is a Full Stack MERN Developer specializing in React.js, Node.js, Express.js, MongoDB, scalable web applications, REST APIs, and modern user experiences."
          }
        />

        <meta
          name="keywords"
          content="Rohan Fasate, Rohan, Fasate, Rohan Developer, MERN Developer, Full Stack Developer, React Developer, Node.js Developer, MongoDB Developer, JavaScript Developer, Portfolio"
        />

        <meta
          name="author"
          content={profile?.name || "Rohan Fasate"}
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://rohan.nishantp.me/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${profile?.name || "Rohan Fasate"} | MERN Stack Developer`}
        />

        <meta
          property="og:description"
          content={
            profile?.bio ||
            "Rohan Fasate - Full Stack MERN Developer building scalable web applications using React.js, Node.js and MongoDB."
          }
        />

        <meta
          property="og:image"
          content="https://rohan.nishantp.me/og-image.avif"
        />

        <meta property="og:url" content="https://rohan.nishantp.me/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content={`${profile?.name || "Rohan Fasate"} | MERN Stack Developer`}
        />

        <meta
          name="twitter:description"
          content={
            profile?.bio ||
            "Full Stack MERN Developer specializing in React.js, Node.js, Express.js and MongoDB."
          }
        />

        <meta
          name="twitter:image"
          content="https://rohan.nishantp.me/og-image.avif"
        />

        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rohan Fasate",
            alternateName: ["Rohan", "Fasate"],
            jobTitle: "Full Stack MERN Developer",
            description:
              "Full Stack MERN Developer specializing in React.js, Node.js, Express.js and MongoDB.",
            url: "https://rohan.nishantp.me/",
            image: "https://rohan.nishantp.me/Rohanfasate.avif",
            sameAs: [
              profile?.github,
              profile?.linkedin,
            ].filter(Boolean),
          })}
        </script>
      </Helmet>
      <AnimatedBackground />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[80vh] bg-transparent text-white flex items-center pt-20 lg:pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="text-center md:text-left order-2 md:order-1">

              <p className="text-blue-400 font-semibold tracking-widest text-sm uppercase">
                Welcome To My Portfolio
              </p>

              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="text-blue-500">
                  {profile?.name || "Rohan Fasate"}
                </span>{" "}
                👋
              </h1>

              <h2 className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium">
                {profile?.title || "MERN Stack Developer"}
              </h2>

              <p className="mt-6 text-gray-400 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
                {profile?.bio ||
                  "I build modern, scalable and high-performance web applications using React.js, Node.js, Express.js and MongoDB. Passionate about creating beautiful user experiences and solving real-world problems through code."}
              </p>

              {/* TECH STACK */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">

                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm">
                  React.js
                </span>

                <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm">
                  Node.js
                </span>

                <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm">
                  JavaScript
                </span>

                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm">
                  MongoDB
                </span>

              </div>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

                <Link
                  to="/projects"
                  className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-medium transition duration-300 text-center"
                >
                  View Projects
                </Link>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-700 hover:bg-gray-800 px-8 py-3 rounded-xl font-medium transition duration-300 text-center"
                >
                  Download Resume
                </a>

              </div>

              {/* SOCIAL LINKS */}
              <div className="flex gap-4 mt-8 justify-center md:justify-start">

                <a
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <FaGithub size={22} />
                </a>

                <a
                  href={profile?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <FaLinkedin size={22} />
                </a>

                <a
                  href={`mailto:${profile?.email}`}
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <FaEnvelope size={22} />
                </a>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center order-1 md:order-2">

              <div className="relative">

                {/* GLOW */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>

                <img
                  src="../Rohanfasate.avif"
                  alt={`${profile?.name || "Rohan Fasate"} - ${profile?.title || "MERN Stack Developer"
                    }`}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-gray-700 shadow-2xl"
                />

              </div>

            </div>

          </div>
        </section>



        {/* github activity section */}

        <section className="bg-transparent text-white py-10 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                GitHub <span className="text-blue-500">Activity</span>
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Year-wise contribution analytics
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">

              <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-sm">Repositories</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mt-2">
                  {repos}
                </h3>
              </div>

              <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-sm">Selected Year</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mt-2">
                  {thisYearContrib}
                </h3>
              </div>

              <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-800">
                <p className="text-gray-400 text-sm">Total</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mt-2">
                  {totalContrib}
                </h3>
              </div>

            </div>

            {/* GRAPH */}
            <div className="mt-10 bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">

              {/* HEADER */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">

                <h3 className="text-sm sm:text-lg font-semibold text-center sm:text-left">
                  Contribution Graph ({selectedYear})
                </h3>

                {/* DROPDOWN */}
                <div className="relative">

                  <button
                    onClick={() => setYearOpen(!yearOpen)}
                    className="px-4 py-2 bg-blue-500 rounded-lg text-sm flex items-center gap-2"
                  >
                    {selectedYear}
                    <span className={`transition ${yearOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>

                  {yearOpen && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setYearOpen(false)}
                      />

                      <div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">

                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => handleYearChange(year)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-800 ${selectedYear === year
                              ? "text-blue-400"
                              : "text-gray-300"
                              }`}
                          >
                            {year}
                          </button>
                        ))}

                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* GRAPH (FULL RESPONSIVE FIX) */}
              {loading ? (
                <div className="h-24 flex items-center justify-center text-gray-400">
                  Loading...
                </div>
              ) : (
                <div className="flex justify-center w-full overflow-hidden">

                  <ActivityCalendar
                    data={contribData}
                    blockSize={blockSize}
                    blockMargin={2}
                    fontSize={12}
                    colorScheme="dark"
                    theme={{
                      dark: [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ],
                    }}
                  />

                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8 mb-12">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                className="px-6 py-3 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition"
              >
                View GitHub Profile
              </a>
            </div>

          </div>
        </section>


      </div>
    </>
  );
}