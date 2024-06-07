"use client";
import ArticlesCard from "@/components/ArticlesCard";
import Welcome from "@/components/Welcome";
import { getArticles, getCategory } from "@/utils/actions/articleActions";
import Link from "next/link";
import { useEffect, useState } from "react";

const Articles = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [error, setError] = useState("");
  const [categoryId, setcategoryId] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getArticles("All");
        setArticles(res);
      } catch (error) {
        setError("Failed to fetch articles");
      }
    }
    async function fetchCatrogries() {
      try {
        const res = await getCategory();
        setCategories(res);
      } catch (error) {
        setError("Failed to fetch articles");
      }
    }
    fetchCatrogries();
    fetchArticles();
  }, []);

  const handleCategoryClick = async (name, _id) => {
    setCurrentCategory(name);
    setcategoryId(_id);
    setArticles([]);
    try {
      const res = await getArticles(name);

      console.log(articles);
      setArticles(res);
    } catch (error) {
      setError("Failed to fetch articles");
    }
  };
  return (
    <div className="flex flex-col rubik">
      <Welcome title="Sayf Articles" text="Some articles for you to read" />
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto] p-[2rem] ">
        <div className="flex gap-[1rem] justify-center flex-wrap ">
          <div
            className={`cursor-pointer  hover:border-primary-color p-[0.5rem] transition-all duration-500   bg-alt-color rounded-md  text-center w-[150px] ${
              currentCategory == "All" && "border border-1 border-primary-color"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            <h1 className="font-[500]">All</h1>
          </div>
          {categories &&
            categories.map(({ _id, name }) => (
              <div
                className={`cursor-pointer border hover:border-primary-color p-[0.5rem] transition-all duration-500 bg-alt-color border-alt-color border-1 rounded-md  text-center  w-[150px] ${
                  name == currentCategory && "border-primary-color"
                }`}
                onClick={() => handleCategoryClick(name, _id)}
                key={_id}
              >
                <h1 className="font-[500]">{name}</h1>
              </div>
            ))}
        </div>

        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {articles && articles.length === 0 && (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          )}
          {currentCategory === "All" ? (
            <AllCategories articles={articles} categoryId={categoryId} />
          ) : (
            <OtherCategories articles={articles} categoryId={categoryId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;

const OtherCategories = ({ articles }) => {
  return articles.map(({ _id, title, content }) => (
    <ArticlesCard _id={_id} title={title} content={content} key={_id} />
  ));
};

const AllCategories = ({ articles, categoryId }) => {
  return articles.map(({ _id, title, content }) => (
    <ArticlesCard
      _id={_id}
      title={title}
      content={content}
      categoryId={categoryId}
      key={_id}
    />
  ));
};
