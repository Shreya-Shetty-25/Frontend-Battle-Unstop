import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import PillProgressSection from "./components/PillProgressSection";
import ScrollImageTextReveal from "./components/ScrollImageTextReveal";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader ? (
        <Loader onComplete={() => setShowLoader(false)} />
      ) : (
        <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all duration-1000 overflow-x-hidden">
          <Navbar />

          <main className="pt-20 space-y-32 relative">
            {/* Home Section */}
            <section id="home" className="relative z-10">
              <PillProgressSection />
            </section>

            {/* About Section */}
            <section id="about" className="relative z-20 min-h-screen">
              <ScrollImageTextReveal />
            </section>

            {/* Placeholder for other sections */}
            <section id="features" className="min-h-screen flex items-center justify-center">
              <h2 className="text-3xl font-bold">Features Section</h2>
            </section>

            <section id="contact" className="min-h-screen flex items-center justify-center">
              <h2 className="text-3xl font-bold">Contact Section</h2>
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
