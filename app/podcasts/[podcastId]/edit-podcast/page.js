"use client";

import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditPodcast, getEachPodcast } from "@/utils/actions/podcastActions";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const { podcastId } = useParams();
  const router = useRouter();
  const EditPodcastWithId = EditPodcast.bind(null, podcastId);
  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getEachPodcast(podcastId);
        setTitle(res.title);
        setDescription(res.description);
        setTag(res.tag);
      } catch (error) {
        setError("Something went wrong. Try Again");
      }
    }
    fetchpodcasts();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setDescription("");
    setTag("");
    try {
      const res = await EditPodcastWithId(title, description, tag);
      if (res.status === 201) {
        router.push("/podcasts");
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
        {message && <p className="text-center text-red-500">{message}</p>}

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
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Description </label>
            <input
              value={description}
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
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
            <label className="font-[500]">Tag </label>
            <input
              value={tag}
              name="tag"
              type="text"
              onChange={(e) => setTag(e.target.value)}
              className="input"
            />
          </div>
          {/* <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
          <label className="font-[500]">Audio </label>
          <input
            value={audio}
            name="audio"
            type={"file"}
            onChange={(e) => setAudio(e.target.value)}
          />
        </div> */}
          <button type="submit" className="black_btn">
            Edit Podcast
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
