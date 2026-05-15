import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets API configuration
  const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1UUB9nqBZ8nw34FTaBECMj1Uj7GyYeZ5NWwUmaTY_IxE";
  
  const getGoogleSheetClient = () => {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!email || !privateKey) {
      console.warn("GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY is missing. Form submissions will fail.");
      return null;
    }

    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    return google.sheets({ version: 'v4', auth });
  };

  // API route for recruitment form
  app.post("/api/recruit", async (req, res) => {
    try {
      const { name, phone, email, position, cvUrl } = req.body;
      const client = getGoogleSheetClient();
      
      if (!client) {
        return res.status(500).json({ 
          error: "Thiếu cấu hình Google Sheets. Vui lòng kiểm tra các biến môi trường GOOGLE_SERVICE_ACCOUNT_EMAIL và GOOGLE_PRIVATE_KEY." 
        });
      }

      const timestamp = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

      // Rows correspond to: Time; Họ và tên; Số điện thoại; Email ứng tuyển; Vị trí ứng tuyển; Đính kèm CV
      const values = [
        [timestamp, name, phone, email, position, cvUrl || "Không có"]
      ];

      await client.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "'danh sách'!A:F",
        valueInputOption: "RAW",
        requestBody: { values },
      });

      res.status(200).json({ message: "Đăng ký thành công" });
    } catch (error: any) {
      console.error("Google Sheets Error:", error);
      res.status(500).json({ error: "Không thể lưu dữ liệu vào Google Sheets", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
