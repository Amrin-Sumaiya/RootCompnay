const db = require('../db');


// CREATE ARTICLE
exports.createArticle = (req, res) => {

  const { page_key, title, content } = req.body;
  const userId = req.user.id;

  if (!page_key || !title || !content) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    `INSERT INTO page_articles (page_key, title, content, created_by)
     VALUES (?, ?, ?, ?)`,
    [page_key, title, content, userId],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.status(201).json({ message: "Article created successfully" });

    }
  );

};



// GET ARTICLES BY PAGE
exports.getArticlesByPage = (req, res) => {

  const { page } = req.params;

  db.query(
    `SELECT id, title, content
     FROM page_articles
     WHERE page_key = ?
     ORDER BY id DESC`,
    [page],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

};



// ADMIN VIEW ALL ARTICLES
exports.getAllArticles = (req, res) => {

  db.query(
    `SELECT * FROM page_articles ORDER BY id DESC`,
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

};

// UPDATE ARTICLE
exports.updateArticle = (req, res) => {

  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  db.query(
    `UPDATE page_articles SET title=?, content=? WHERE id=?`,
    [title, content, id],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json({ message: "Article updated successfully" });

    }
  );

};