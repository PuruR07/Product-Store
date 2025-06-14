// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./Config/db.js";
// import path from 'path'
// import productRoutes from "./Routes/product.routes.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// dotenv.config();
// const __dirname = path.resolve()
// app.use(express.json());//* This will parse the JSON data in the body of the request req.body and this is a middleware
// app.use("/api/products", productRoutes);//* This will use the productRoutes for all the routes that start with /api/products
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(__dirname + '/Front-End/dist'));

//   // catch anything (including '/')
//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "Front-End", "dist", "index.html"));
//   });
// }

// app.listen(PORT, ()=>{
//     connectDB();
//     console.log(`Server is running on http://localhost:${PORT}`);
    
// })

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import path from "path";
import productRoutes from "./Routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "Front-End", "dist");

  // Serve static files
  app.use(express.static(frontendPath));

  // Catch-all for SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
