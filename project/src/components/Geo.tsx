import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  title: string;
  link: string;
  description: string;
}

export default function GeographicPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const RSS_FEED_URL = "https://www.nationalgeographic.com/rss"; // Hypothetical RSS URL

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    setLoading(true);
    try {
      const response = await axios.get(RSS_FEED_URL, {
        headers: { "Content-Type": "application/xml" },
      });

      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, "text/xml");

      const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
        title: item.querySelector("title")?.textContent || "No title",
        link: item.querySelector("link")?.textContent || "#",
        description: item.querySelector("description")?.textContent || "No description",
      }));

      setArticles(items);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">National Geographic Stories</h1>

      {/* Embedded Website */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Explore Latest Stories</h2>
        <iframe
          src="https://www.nationalgeographic.com/pages/topic/latest-stories"
          title="National Geographic Stories"
          className="w-full h-[500px] border rounded-lg"
        ></iframe>
      </div>

      {/* Manual Link to National Geographic */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Visit National Geographic</h2>
       
      </div>

      {/* RSS Feed (Optional) */}
      <div>
        <h2 className="text-2xl font-semibold mb-4"></h2>
        {loading ? (
          <div className="text-center">Loading stories...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-600">No stories available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
              >
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
