"use server";

import { sayfArticle } from "@/models/sayfArticle";
import { connectToDb } from "../database";

export const getsayfArticle = async (category) => {
  console.log("fetching sayfArticle");
  await connectToDb();
  try {
    if (category == "All") {
      const res = await sayfArticle.find({});
      return JSON.parse(JSON.stringify(res.reverse()));
    } else {
      const foundArticle = await sayfArticle.find({ category });

      return JSON.parse(JSON.stringify(foundArticle));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getEachArticle = async (id) => {
  console.log("fetching this Article");
  await connectToDb();
  try {
    const article = await sayfArticle.findById(id);

    const response = JSON.parse(JSON.stringify(article));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditArticle = async (articleId, title, content) => {
  console.log("Editing this podcast");
  await connectToDb();
  try {
    await sayfArticle.findByIdAndUpdate(articleId, {
      title,
      content,
    });

    return { message: "Article was Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteArticle = async (id) => {
  console.log("Deleting this podcast");
  await connectToDb();
  try {
    await sayfArticle.findByIdAndDelete(id);

    return { message: "Article was deleted", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = async (title, content, category) => {
  await connectToDb();

  if (!category) {
    return { message: "Add a category to continue" };
  }
  console.log({ title, category });
  try {
    const article = await sayfArticle.create({
      title,
      content,
      category: category,
    });
    console.log(category);
    return { message: "Article has been Created", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  await connectToDb();
  try {
    const article = await sayfArticle.find({});
    const foundCategory = article.map(({ category }) => category);
    const formattedCateogries = [...new Set(foundCategory)];
    const response = JSON.parse(JSON.stringify(formattedCateogries));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedsayfArticle = async (podcastId) => {
  await connectToDb();
  try {
    const foundArticle = await sayfArticle.findById(podcastId);

    const relatedsayfArticle = await sayfArticle.find({
      category: foundArticle.category,
    });

    const filteredArticle = relatedsayfArticle.filter(
      ({ _id }) => _id == JSON.stringify(foundPodcast._id)
    );
    const response = JSON.parse(JSON.stringify(filteredArticle));
    return response;
  } catch (error) {
    console.log(error);
  }
};
