// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CLIENT_ID = "01JY41WPVVWSBQK0AYBMCVKXYS";
const CLIENT_SECRET = "249c6af7d30d09f4b06b2776a2781fd37f388078dcd0a7508b9596e86f9f240c";
const REDIRECT_URI = "https://najemshop-5ceb5.web.app/auth/callback";

// مسار تبادل الكود مع التوكن
app.post("/exchange-token", async (req, res) => {
  const { code, code_verifier } = req.body;

  try {
    const response = await fetch("https://id.kick.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
        code_verifier,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error exchanging token:", error);
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

// ✅ هنا التعديل المهم: استخدم المنفذ الديناميكي في Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Kick backend is running on port ${PORT}`);
});
