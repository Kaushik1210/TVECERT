import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const NewsSec = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data/certificationInfo/newsUpdate");
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news data", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative z-20 cursor-default">

    <Box sx={{ margin: "20px" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        News Updates
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {newsData.map((newsItem) => (
          <Box
            key={newsItem._id}
            sx={{
              maxWidth: "350px",
              padding: "16px",
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <a href="#">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "12px",
                  textDecoration: "none",
                }}
              >
                {newsItem.title}
              </Typography>
            </a>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", fontWeight: "normal", marginBottom: "8px" }}
            >
              {newsItem.description}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#9CA3AF", fontWeight: "normal" }}
            >
              Date: {new Date(newsItem.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
    </div>
  );
};

export default NewsSec;
