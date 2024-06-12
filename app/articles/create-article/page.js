"use client";

import AddNewArticle from "@/components/AddNewArticle";
import { createArticle, getCategory } from "@/utils/actions/articleActions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function fetchArticleCategories() {
      try {
        const res = await getCategory();
        setCategories(res);
      } catch (error) {
        setMessage(error.message);
      }
    }
    fetchArticleCategories();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setContent("");

    try {
      const res = await createArticle(title, content, categoryValue);
      if (res.status === 201) {
        router.push("/articles");
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-[2rem] w-[50%] max-lg:w-full m-auto serif">
      <form action={handleSubmit}>
        <div className="text-[1.5rem] text-center mb-[1rem] text-gradient">
          Create Article
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
          <label className="font-[500]">Category </label>
          <div className="flex justify-between w-full flex-col gap-[1rem] border rounded-md p-[1rem]">
            <div className="flex gap-[1rem] flex-wrap ">
              {categories.map((item, index) => (
                <div
                  className={`border p-[1rem] rounded-md hover:bg-alt-color transition-all duration-500 cursor-pointer ${
                    categoryValue == item && "bg-alt-color border-primary-color"
                  }`}
                  onClick={() => setCategoryValue(item)}
                  key={`${index}-${item}`}
                >
                  {item}
                </div>
              ))}
            </div>

            <AddNewArticle
              setCategories={setCategories}
              categories={categories}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Title </label>
            <input
              value={title}
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>

          {/* <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Image </label>
            <input
              value={image}
              name="image"
              type={"file"}
              onChange={(e) => setImage(e.target.value)}
            />
          </div> */}
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Content </label>
            <ReactQuill value={content} onChange={setContent} />
          </div>

          <button type="submit" className="black_btn">
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewArticle;
