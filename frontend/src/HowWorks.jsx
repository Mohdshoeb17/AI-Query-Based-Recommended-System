import React from "react";

const HowWorks = () => {
  return (
    <div className="min-h-screen text-white bg-[radial-gradient(circle_at_top,#1b1f3a,#06070f)] md:px-[200px] px-[50px] pt-[100px] pb-[50px]">
    
      <h2 className="text-3xl font-semibold mb-10 text-center">
        ⚙️ How CineAI Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Step 1 */}
        <div className="bg-[#12142a] p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-[#181b35] transition-all duration-300 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">🔎 User Query</h3>
          <p className="text-[#b0b4ff] text-sm">
            Users type questions like “Movies like Inception” or “Sci-Fi movies about space”.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-[#12142a] p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-[#181b35] transition-all duration-300 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">🧠 Entity Detection</h3>
          <p className="text-[#b0b4ff] text-sm">
            AI detects entities such as movies, actors, directors, and genres.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-[#12142a] p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-[#181b35] transition-all duration-300 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">🕸️ GraphRAG Search</h3>
          <p className="text-[#b0b4ff] text-sm">
            The system searches relationships in the graph and vector database.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-[#12142a] p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-[#181b35] transition-all duration-300 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-3">
            4
          </div>
          <h3 className="text-xl font-semibold mb-2">🎬 AI Recommendation</h3>
          <p className="text-[#b0b4ff] text-sm">
            CineAI generates intelligent movie recommendations based on the results.
          </p>
        </div>

      </div>
    
    </div>
  );
};

export default HowWorks;