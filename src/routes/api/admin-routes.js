const express = require("express");
const { Setting, Category } = require("../../models");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

router.get("/products", function (req, res, next) {
  res.render("admin/products");
});

router.get("/categories", function (req, res, next) {
  res.render("admin/categories");
});

router.delete("/category/:id", async function (req, res, next) {
  const category = await Category.findOne({
    where: { id: req.params.id },
  });

  if (category) {
    await category.destroy(); // deletes the row
  }

  res.redirect("/admin/categories");
});

router.get("/set", function (req, res, next) {
  res.send("hello");
});

router.get("/settings", async function (req, res, next) {
  const settings = await Setting.findAll();

  res.render("admin/settings", { title: "Settings", allSettings: settings });
});

router.get("/privacy-policy", async function (req, res, next) {
  const privacy = await Setting.findOne({
    where: {
      setting_name: "privacy",
    },
  });

  res.render("admin/privacy-policy", {
    title: "Privacy policy",
    privacy,
  });
});

router.delete("/setting/:id", async function (req, res, next) {
  const setting = await Setting.findOne({
    where: { id: req.params.id },
  });

  if (setting) {
    await setting.destroy(); // deletes the row
  }

  res.redirect("/admin/settings");
});
module.exports = router;
