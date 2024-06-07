// pages/api/upload.js

import { connectToDb } from "@/utils/database";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Articles } from "@/models/articles";
import { upload } from "@/lib/multer";
import { Category } from "@/models/categories";

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
export async function POST(req, res) {
  // await runMiddleware(req, res, upload.single("image"));

  // await connectToDb();

  const { title, content, categoryValue, image } = req.body;

  console.log(req);
  // try {

  // } catch (error) {
  //   console.log(error);
  // }
}

