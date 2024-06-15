"use client";
import {
  EditArticle,
  getCategory,
  getEachArticle,
} from "@/utils/actions/articleActions";
import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const { articleId } = useParams();
  const router = useRouter();
  const EditArticleWithId = EditArticle.bind(null, articleId);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getEachArticle(articleId);
        setTitle(res.title);
        setContent(res.content);
      } catch (error) {
        setError("Something went wrong. Try Againarticles");
      }
    }
    fetchArticles();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setContent("");
    try {
      const res = await EditArticleWithId(title, content);
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
        {" "}
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem] items-start flex-col  pb-[1rem]">
            <label className="font-[500]">Title</label>
            <input
              value={title}
              name="title"
              type="text"
              className="input"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-[1rem] items-start flex-col  pb-[1rem]">
            <label className="font-[500]">Content</label>
            <div className="w-full">
              <ReactQuill value={content} onChange={setContent} />
            </div>
          </div>

          <button type="submit" className="black_btn">
            Edit Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
