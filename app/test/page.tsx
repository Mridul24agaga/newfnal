// app/test/page.tsx
"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
};

export default function TestPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  
  // Use your provided API key (the user receives this key)
  const apiKey = "8aaba96bbcddf78cbff44c4fe5d9604c9b44f08ad19c6a95362054540860426f";

  useEffect(() => {
    // Use the full URL for external requests or a relative URL if on the same domain
    fetch("http://localhost:3000/api/user-blogs", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setError("Unexpected data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs");
      });
  }, [apiKey]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Blogs (External Website)</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {blogs.length === 0 && !error ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} style={{ marginBottom: "1rem" }}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
