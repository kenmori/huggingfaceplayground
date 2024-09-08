import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = 3000;

const payload = {
  prompt: "もりけん塾という名前のフロントエンド技術を学べるコミュニティ。JavaScriptなどを学びます",
  output_format: "webp"
};

const generateImage = async () => {
  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
    axios.toFormData(payload, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.SK_MY_API_KEY}`,
        Accept: "image/*"
      },
    },
  );

  if(response.status === 200) {
    fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
    console.log("Image saved as lighthouse.webp");
  } else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
  }
};

generateImage();

// 静的ファイルの配信
app.use(express.static('public'));

// 画像のエンドポイント
app.get('/image', (req, res) => {
  res.sendFile(`${__dirname}/lighthouse.webp`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
