const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const { createArticle, getArticlesByPage, getAllArticles, updateArticle } = require("../controllers/article.controller");

//admin create
router.post("/", auth, role("root"), createArticle);

router.get("/admin", auth, role("root"), getAllArticles);

//public get by page
router.get("/page/:page", getArticlesByPage);

router.put("/:id", auth, role("root"), updateArticle);

module.exports = router;