"use client";
import Welcome from "@/components/Welcome";
import { getPodcasts } from "@/utils/actions/podcastActions";
import Link from "next/link";
import { useEffect, useState } from "react";

const Podcasts = () => {
  const [podcasts, setpodcasts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getPodcasts();
        console.log(res);
        setpodcasts(res);
      } catch (error) {
        setError("Failed to fetch podcasts");
      }
    }
    fetchpodcasts();
  }, []);
  return (
    <div className="flex flex-col rubik">
      <Welcome title="Podcasts" text="Some podcasts for you to read" />
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto] p-[2rem] ">
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
              <div className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300">
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
                    <div className="flex flex-col gap-[2rem] p-[1rem] ">
                      <div className="flex justify-between">
                        <div className="text-[1.5rem] font-[600] text-primary-color">
                          {title}
                        </div>
                        <div className="bg-slate-100 p-[0.5rem] text-slate-700 rounded-md text-[0.75rem]">
                          #{tag}
                        </div>
                      </div>

                      <div className="">{description}</div>
                      <div className="flex gap-1 justify-end  hover:text-primary-color ">
                        {" "}
                        <p className="hover:scale-[1.2] transition-all duration-500 border border-primary-color border-1 p-[1rem] rounded-md max-lg:w-full text-center">
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
