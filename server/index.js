const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database.js");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const fileUploadingRoutes=require("./routes/fileUploadingRoutes.js");
const contactRoutes=require("./routes/contactRoutes.js");

dotenv.config();

connectDB();
cloudinaryConnect();

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // Allow frontend domain
    credentials: true, // Allow cookies
}));

app.use(express.json());
app.use(cookieParser());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/uploads", fileUploadingRoutes);
app.use("/api/v1/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
}
);
