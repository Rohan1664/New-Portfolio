import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

export default function GitHubActivity() {
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
        <section className="bg-gray-950 text-white py-10 sm:py-16 lg:py-20">
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
                                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-800 ${
                                                    selectedYear === year
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
    );
}