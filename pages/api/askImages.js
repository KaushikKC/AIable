// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../firebaseAdmin";
import admin from "firebase-admin";
import queryImg from "../../lib/queryImg";
import openai from "../../lib/chatgpt";

// type Data = {
//   answer: string | void | object;
//   success: boolean;
//   data: string;
// };

export default async function handler(
  req,
  res 
) {
  const { prompt, size,session,chatId } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  // if (!prompt) {
  //   res.status(400).json({ answer: "Please provide a prompt!" });
  //   return;
  // }

  // if (!chatId) {
  //   res.status(400).json({ answer: "Please provide a valid chat ID!" });
  //   return;
  // }
  console.log("I'm here");

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    const message = {
        text: imageUrl || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
          _id: "Able",
          name: "Able",
          avatar: "https://links.papareact.com/89k",
        },
      };

    await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("ImageChats")
    .doc(chatId)
    .collection("messages")
    .add(message);

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }

  // const message: Message = {
  //   text: response || "ChatGPT was unable to find an answer for that!",
  //   createdAt: admin.firestore.Timestamp.now(),
  //   user: {
  //     _id: "Able",
  //     name: "Able",
  //     avatar: "https://links.papareact.com/89k",
  //   },
  // };

  // await adminDb
  //   .collection("users")
  //   .doc(session?.user?.email)
  //   .collection("ImageChats")
  //   .doc(chatId)
  //   .collection("messages")
  //   .add(message);

  // res.status(200).json({
  //   answer: response,
  // });
}