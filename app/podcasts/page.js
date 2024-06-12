"use client";
import Welcome from "@/components/Welcome";
import {
  getPodcastCategories,
  getPodcasts,
} from "@/utils/actions/podcastActions";
import Link from "next/link";
import { useEffect, useState } from "react";

const Podcasts = () => {
  const [podcasts, setpodcasts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getPodcasts("All");
        setpodcasts(res);
      } catch (error) {
        setError("Failed to fetch podcasts");
      }
    }
    async function fetchPodcastCategories() {
      try {
        const res = await getPodcastCategories();
        setCategories(res);
      } catch (error) {
        setMessage(error.message);
      }
    }
    fetchPodcastCategories();
    fetchpodcasts();
  }, []);
  const handleCategoryClick = async (category, _id) => {
    setCurrentCategory(category);
    setpodcasts([]);
    try {
      const res = await getPodcasts(category);
      // console.log(res);a
      setpodcasts(res);
    } catch (error) {
      setError("Failed to fetch Podcasts");
    }
  };
  return (
    <div className="flex flex-col serif">
      <Welcome title="Podcasts" text="Some podcasts for you to read" />
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
            categories.map((category) => (
              <div
                className={`cursor-pointer border hover:border-primary-color p-[0.5rem] transition-all duration-500 bg-alt-color border-alt-color border-1 rounded-md  text-center  w-[150px] ${
                  category == currentCategory && "border-primary-color"
                }`}
                onClick={() => handleCategoryClick(category)}
                key={category}
              >
                <div className="font-[500]">{category}</div>
              </div>
            ))}
        </div>
        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {podcasts && podcasts.length === 0 ? (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            podcasts.map(({ _id, title, description, tag, audio, image }) => (
              <div className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300 ">
                <div className="">
                  <Link
                    href={`/podcasts/${_id}`}
                    className="font-[400] cursor-pointer"
                  >
                    <div className="w-full">
                      <img
                        src={"/assets/article3.jpg"}
                        className="w-full h-[250px] object-cover rounded-md "
                        alt="article-img"
                      />
                    </div>
                    <div className="flex flex-col gap-[2rem] p-[1rem]">
                      <div className="flex justify-between flex-wrap gap-[0.5rem]">
                        <div className="text-[1.5rem] font-[500]">{title}</div>
                        <div className="bg-slate-100 p-[0.5rem] text-slate-700 rounded-md text-[0.75rem]">
                          #{tag}
                        </div>
                      </div>

                      <div className="">{description}</div>
                      <div className="flex w-full hover:text-primary-color ">
                        {" "}
                        <p className="hover:scale-[1.2] transition-all duration-500 border border-primary-color border-1 p-[1rem] rounded-md w-full text-center">
                          See Podcast
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
