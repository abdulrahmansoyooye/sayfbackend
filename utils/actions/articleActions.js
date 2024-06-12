"use server";

import { Articles } from "@/models/articles";
import { connectToDb } from "../database";

export const getArticles = async (category) => {
  console.log("fetching Articles");
  await connectToDb();
  try {
    if (category == "All") {
      const res = await Articles.find({});
      return JSON.parse(JSON.stringify(res.reverse()));
    } else {
      const foundCategory = await Podcasts.find({ category });
      if (!foundCategory) {
        return {
          message: `"${category}" wasn't found`,
          status: 404,
        };
      }
      return JSON.parse(JSON.stringify(foundCategory));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getEachArticle = async (id) => {
  console.log("fetching this Article");
  await connectToDb();
  try {
    const podcast = await Articles.findById(id);

    const response = JSON.parse(JSON.stringify(podcast));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditArticle = async (articleId, content, tag) => {
  console.log("Editing this podcast");
  await connectToDb();
  try {
    await Articles.findByIdAndUpdate(articleId, {
      title,
      content,
    });

    return { message: "Article has Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteArticle = async (id) => {
  console.log("Deleting this podcast");
  await connectToDb();
  try {
    const article = await Articles.findByIdAndDelete(id);

    const response = JSON.parse(JSON.stringify(article));
    return response;
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
    const article = await Articles.create({
      title,
      content,
      category: "format",
    });
    console.log(article);
    return { message: "Article has been Created", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  await connectToDb();
  try {
    const article = await Articles.find({});
    // const foundCategory = article.map(({ category }) => category);
    // const formattedCateogries = [...new Set(foundCategory)];
    const response = JSON.parse(JSON.stringify(["formattedCateogries"]));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedPodcasts = async (podcastId) => {
  await connectToDb();
  try {
    const foundArticle = await Articles.findById(podcastId);

    const relatedArticles = await Articles.find({
      category: foundArticle.category,
    });

    const filteredArticle = relatedArticles.filter(
      ({ _id }) => _id == JSON.stringify(foundPodcast._id)
    );
    const response = JSON.parse(JSON.stringify(filteredArticle));
    return response;
  } catch (error) {
    console.log(error);
  }
};
