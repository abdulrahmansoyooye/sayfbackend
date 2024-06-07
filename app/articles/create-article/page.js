"use client";
import AddNew from "@/components/AddNew";
import { createArticles, getCategory } from "@/utils/actions/articleActions";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import dynamic from "next/dynamic";
const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getCategory();
        setCategory(res);
      } catch (error) {
        setMessage(error.message);
      }
    }
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("title", title);
    // formData.append("content", content);
    // formData.append("categoryValue", categoryValue);

    setTitle("");
    setContent("");
    try {
      const res = await createArticles(title, content, categoryValue);
      if (res.status === 201) {
        router.push("/articles");
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="p-[2rem] w-[50%] max-lg:w-full m-auto serif">
      <form action={handleSubmit}>
        {" "}
        <div className="text-[1.5rem] text-center mb-[1rem] text-gradient">
          Create Article
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Category </label>
            <div className="flex justify-between w-full max-lg:flex-col gap-[1rem] border rounded-md">
              <select
                onChange={(e) => setCategoryValue(e.target.value)}
                className="section"
                required
              >
                <option>Choose Category</option>
                {category &&
                  category.map(({ name, _id }) => (
                    <option value={name} key={_id}>
                      {name}{" "}
                    </option>
                  ))}
              </select>
              <AddNew setCategoryValue={setCategoryValue} />
            </div>
          </div>

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
          <div>
            <ImageUpload
              handleSubmit={handleSubmit}
              setImage={setImage}
              image={image}
            />
          </div>
          <div className="flex gap-[1rem] items-start flex-col  pb-[1rem]">
            <label className="font-[500]">Content</label>
            <div className="w-full">
              <ReactQuill value={content} onChange={setContent} />
            </div>
          </div>

          <button type="submit" className="black_btn">
            Create Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewArticle;
