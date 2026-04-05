import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PageArticles = () => {

  const [articles, setArticles] = useState([]);

  const location = useLocation();

 const slugMap = {
  "/": "home",
  "/aboutpage": "about",
  "/company/all-jobs": "jobs",
  "/candidateslogin": "candidate-login",
  "/company/login": "company-login"
};

const pageKey = slugMap[location.pathname] || "";

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/articles/page/${pageKey}`)
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));

  }, [location.pathname, pageKey]);



  if (articles.length === 0) return null;

return (
  <div className="bg-gray-100 ">
    <div className="container mx-auto py-10">
      {articles.map((article) => (
        <div key={article.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{article.title}</h2>

          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
      ))}
    </div>
  </div>
);

};

export default PageArticles;