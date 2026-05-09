import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      {/* Hide Footer on Mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}