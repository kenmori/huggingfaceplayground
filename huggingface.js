import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv';

dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);

// const model = "Salesforce/blip-image-captioning-large";
// const imageUrl = "https://kenjimorita.jp/wp-content/uploads/2019/10/F11CB3D1-8522-43C7-9917-F96BD163E7B7.jpeg";


// const response = await fetch(imageUrl);
// const imageBlob = await response.blob();

// const result = await hf.imageToText({
//   data: imageBlob,
//   model
// });

const result = await hf.textToImage({
  inputs: 'award winning high resolution photo of a giant tortoise/((ladybird)) hybrid, [trending on artstation]',
  model: 'stabilityai/stable-diffusion-2',
  parameters: {
    negative_prompt: 'blurry',
  }
})


console.log(result);

