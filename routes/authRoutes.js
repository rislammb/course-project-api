const router = require("express").Router();
const {
  createUser,
  login,
  verifyToken,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", login);
router.get("/verify-token", authMiddleware, verifyToken);

module.exports = router;
