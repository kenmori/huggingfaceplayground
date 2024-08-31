import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import dotenv from 'dotenv';

dotenv.config();

const payload = {
  prompt: "Lighthouse on a cliff overlooking the ocean",
  output_format: "webp"
};

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
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}

