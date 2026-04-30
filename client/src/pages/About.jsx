import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>

      <section className="bg-gray-950 text-white min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT (IMAGE / CARD) */}
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
              AD
            </div>
          </div>

          {/* RIGHT (CONTENT) */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About Me
            </h1>

            <p className="text-gray-400 mb-4">
              I'm a passionate MERN Stack Developer who loves building modern,
              scalable, and user-friendly web applications.
            </p>

            <p className="text-gray-400 mb-6">
              I specialize in creating full-stack applications using React,
              Node.js, Express, and MongoDB. I enjoy solving real-world problems
              and continuously learning new technologies.
            </p>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {["React", "Node.js", "MongoDB", "Express", "JavaScript"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* STATS */}
            <div className="flex gap-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-500">10+</h2>
                <p className="text-gray-400 text-sm">Projects</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-500">1+</h2>
                <p className="text-gray-400 text-sm">Years Learning</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-500">100%</h2>
                <p className="text-gray-400 text-sm">Dedication</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}