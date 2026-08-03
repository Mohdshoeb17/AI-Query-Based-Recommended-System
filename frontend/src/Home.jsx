import React, { useState } from "react";
import axios from "axios";
import { Film, User, Users } from "lucide-react";
import { toast } from "react-toastify";
const queries = [
  { text: "Movies like Inception", icon: <Film size={18} /> },
  { text: "Movies starring Leonardo DiCaprio", icon: <Users size={18} /> },
  { text: "Sci-Fi movies about space", icon: <Film size={18} /> },
  { text: "Movies directed by Christopher Nolan", icon: <Film size={18} /> },
  { text: "Who is Christopher Nolan", icon: <User size={18} /> },
  { text: "Give actors who worked in Inception movie", icon: <Users size={18} /> }
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login first");
      return;
    }
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }

  setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "http://localhost:3000/query",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAnswer(res.data.answer);
      setQuery("");

    } catch (err) {
      console.error(err);
      setAnswer("Server error or unauthorized access");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(circle_at_top,#1b1f3a,#06070f)]">
      <div className="max-w-[900px] mx-auto pt-[100px] text-center">

        <h1 className="text-3xl md:text-5xl mb-10 font-bold tracking-wide">
          <div>🎬 GraphRAG Movie</div>
          <div className="md:ml-15">Query System</div>
        </h1>

        <div className="flex justify-center gap-3 mb-10">

          <input
            className="w-[60%] md:w-[500px] p-3 md:p-4 rounded-xl border border-white/10 bg-[#0e1020]"
            placeholder='Ask something like "movies like Inception"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={searchMovies}
            className="px-4 cursor-pointer py-3 md:px-8 md:py-4 rounded-xl bg-gradient-to-br from-[#6a6afc] to-[#9b6cff] hover:scale-105 transition"
          >
            Search
          </button>
        </div>

        {!answer && !loading && (
          <div className="mt-10 bg-[rgba(20,22,40,0.9)] p-8 rounded-2xl text-left">
            <h2 className="mb-6 text-2xl font-semibold">
              Example Queries
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {queries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(q.text)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg bg-[#12142a] text-[#d0d3ff] hover:bg-[#1a1d3a] hover:text-white transition"
                >
                  {q.icon}
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-5 text-[#b0b4ff] text-2xl font-semibold">
            • AI thinking... •
          </div>
        )}

        {answer && (
          <div className="mt-10 bg-[rgba(20,22,40,0.9)] p-8 rounded-2xl text-left">
            <h2 className="mb-5 text-2xl">Recommendations</h2>

            <div className="bg-[#0c0e1c] p-5 rounded-lg">
              <pre className="whitespace-pre-wrap text-[#d0d3ff]">
                {answer}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;