const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);
router.get("/profile", authMiddleware, user.getProfileDetails);
router.post("/logout", user.logoutUser);
router.put("/profile", authMiddleware, user.updateUserDetails);
router.delete("/profile", authMiddleware, user.deleteUser);

module.exports = router;
