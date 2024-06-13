"use client";
import {
  DeleteArticle,
  EditArticle,
  getArticles,
  getEachArticle,
} from "@/utils/actions/articleActions";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const EachArticle = () => {
  const { articleId } = useParams();
  const [error, setError] = useState("");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getEachArticle(articleId);
        setTitle(res.title);
        setContent(res.content);
      } catch (error) {
        setError("Failed to fetch articles");
      }
    }
    fetchArticles();
  }, []);

  const handleDelete = () => {
    DeleteArticle(articleId);
    router.push("/articles");
  };

  return (
    <div className="flex max-lg:flex-col gap-[4rem] mt-[4rem] rubik">
      {error && <p>{error}</p>}
      <div className="flex flex-col  gap-[4rem] max-lg:w-full w-[70%] border-r-2 p-[1rem_2rem]">
        <div className="flex flex-col gap-[2rem] ">
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-[1.5rem] font-[600] text-primary-color serif"
          />
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-slate-700 "
          />
        </div>
        <div className="flex gap-[1rem] justify-between max-lg:flex-col ">
          <Link
            className="bg-primary-color cursor-pointer p-[1rem] text-white text-center rounded-md w-[150px] h-[60px] max-lg:w-full hover:scale-[1.2] transition-all duration-500"
            href={`/articles/${articleId}/edit-article/`}
          >
            Edit
          </Link>

          <div
            onClick={handleDelete}
            className="border border-red-600 p-[1rem] cursor-pointer flex gap-[1rem] justify-center items-center rounded-md  w-[150px] h-[60px] max-lg:w-full hover:scale-[1.2] transition-all duration-500"
          >
            <Image
              src={"/assets/delete1.png"}
              width={40}
              height={40}
              alt="delete"
              className="object-contain "
            />
            Delete
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <div className="text-[1.2rem] p-[2rem] font-[500]">
          See Related Articles
        </div>
      </div>
    </div>
  );
};

export default EachArticle;
