const router = require("express").Router();
const {
  addNewUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  }
});
const upload = multer({ storage: storage });
router.post("/add", upload.single("image"), addNewUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.put("/:id/edit", updateUser);
router.delete("/:id/delete", deleteUser);
module.exports = router;
