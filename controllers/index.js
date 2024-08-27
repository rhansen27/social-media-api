const router = require("express").Router();
const apiRoutes = require("./api");

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/api", apiRoutes);

module.exports = router;
