const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// จำลองฐานข้อมูล (ในหน่วยความจำ)
let userProfile = {
    username: "ผู้ใช้งาน",
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("123456", 10), // รหัสผ่านเริ่มต้น
};

// 📌 API สำหรับอัปเดตโปรไฟล์
app.post("/api/update-profile", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email) {
            return res.status(400).json({ message: "กรุณากรอกชื่อผู้ใช้และอีเมล" });
        }

        // ตรวจสอบความถูกต้อง (สามารถใส่ validate email เพิ่มได้)
        userProfile.username = username;
        userProfile.email = email;

        if (password && password.trim() !== "") {
            const hashed = await bcrypt.hash(password, 10);
            userProfile.passwordHash = hashed;
        }

        return res.json({ message: "บันทึกข้อมูลโปรไฟล์สำเร็จ!" });
    } catch (err) {
        return res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message });
    }
});

// ✅ ทดสอบดูข้อมูลใน server
app.get("/api/profile", (req, res) => {
    res.json({ ...userProfile, passwordHash: "hidden" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
