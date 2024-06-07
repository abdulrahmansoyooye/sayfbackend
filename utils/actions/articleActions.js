"use server";
import { Articles } from "@/models/articles";
import { connectToDb } from "../database";
import { Category } from "@/models/categories";
export const getArticles = async (name) => {
  console.log("fetching Articles");
  await connectToDb();
  try {
    if (name == "All") {
      const articles = await Articles.find({});

      return JSON.parse(JSON.stringify(articles.reverse()));
    } else {
      const foundCategory = await Category.findOne({ name });
      if (!foundCategory) {
        return {
          message: `"${name}" wasn't found`,
          status: 404,
        };
      }

      return JSON.parse(JSON.stringify(foundCategory.articles.reverse()));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getEachArticle = async (id) => {
  console.log("fetching this article");
  await connectToDb();
  try {
    const articles = await Articles.findById(id);

    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.log(error);
  }
};

export const EditArticle = async (articleId, title, content, categoryValue) => {
  console.log("Editing this article");
  await connectToDb();

  try {
    const foundCategory = await Category.findOne({ name: categoryValue });
    if (!foundCategory) {
      return { message: "Add a category to continue" };
    }
    const newArticle = await Articles.findByIdAndUpdate(articleId, {
      title,
      content,
    });
    foundCategory.articles.forEach((article, index) => {
      const articleid = article._id.toString();
      if (articleid === articleId) {
        article = newArticle;
      }
    });

    return { message: "Article Edited Succesfully", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteArticle = async (id) => {
  console.log("Deleting this article");
  await connectToDb();
  try {
    const article = await Articles.findByIdAndDelete(id);

    const response = JSON.parse(JSON.stringify(article));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createArticles = async (data) => {
  await connectToDb();
  const { title, content, categoryValue } = data;
  try {
    const foundCategory = await Category.findOne({ name: categoryValue });
    if (!foundCategory) {
      return res.status(404).json({ message: "Add a category to continue" });
    }
    const article = await Articles.create({ title, content });
    foundCategory.articles.push(article);
    foundCategory.save();
    return { message: "Article Created Succesfully", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (name) => {
  try {
    await connectToDb();
    const foundCategory = await Category.findOne({ name });

    if (foundCategory) {
      return {
        message: `"${name}" has been used Try a different one `,
        status: 400,
      };
    } else {
      await Category.create({ name, articles: [] });

      return { message: "Category has been Created", status: 200 };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  await connectToDb();
  try {
    const category = await Category.find({});

    const response = JSON.parse(JSON.stringify(category));
    return response;
  } catch (error) {
    console.log(error);
  }
};
