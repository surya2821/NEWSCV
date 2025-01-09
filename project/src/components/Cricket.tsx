import React, { useEffect, useState } from "react";
import axios from "axios";

interface LiveMatch {
  match_id: string;
  league_name: string;
  team_home_name: string;
  team_away_name: string;
  status: string;
  score_home: string;
  score_away: string;
}

export default function Cricket() {
  const [liveScores, setLiveScores] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "6f3dae79e171f96b06f80d5beda4bad7fbcc0bf7b2777b055e2ad8da923e6e97"; // Replace with your actual API key
  const API_URL = `https://apiv2.api-cricket.com/?method=get_livescore&APIkey=${API_KEY}`;

  useEffect(() => {
    fetchLiveScores();
    const interval = setInterval(fetchLiveScores, 60000); // Refresh scores every minute
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const fetchLiveScores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.result) {
        setLiveScores(response.data.result);
      } else {
        console.error("No live scores available");
      }
    } catch (error) {
      console.error("Error fetching live scores:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Live Cricket Scores</h1>
      {loading ? (
        <div className="text-center">Loading live scores...</div>
      ) : liveScores.length === 0 ? (
        <div className="text-center text-gray-600">No live matches currently.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {liveScores.map((match) => (
            <div
              key={match.match_id}
              className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
            >
              <h2 className="text-lg font-semibold text-center mb-2">
                {match.team_home_name} vs {match.team_away_name}
              </h2>
              <p className="text-gray-600 text-center mb-2">
                League: {match.league_name}
              </p>
              <p className="text-blue-600 text-center mb-2">
                Status: {match.status}
              </p>
              <div className="flex justify-center space-x-4">
                <span className="text-green-600 font-bold">
                  {match.team_home_name}: {match.score_home || "N/A"}
                </span>
                <span className="text-red-600 font-bold">
                  {match.team_away_name}: {match.score_away || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
