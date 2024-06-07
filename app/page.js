import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-[2rem] justify-start h-[100vh]  bg-alt-color">
      <h1 className="text-center mt-[2rem] text-[2rem] font-[600] text-gradient">
        Create New
      </h1>
      <div className="flex flex-wrap  gap-[2rem] items-center  justify-center  p-[2rem] m-[2rem] rounded-md">
        <h1 className=" p-[1rem] bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/articles/create-article`}
            className="font-[400] cursor-pointer"
          >
            <div>Article</div>
          </Link>
        </h1>
        <h1 className=" p-[1rem]   bg-white border  rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/podcasts/create-podcast`}
            className="font-[400] cursor-pointer"
          >
            <div>Podcast</div>
          </Link>
        </h1>
        <h1 className=" p-[1rem]  bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/courses/create-course`}
            className="font-[400] cursor-pointer"
          >
            <div>Course</div>
          </Link>{" "}
        </h1>
      </div>
    </main>
  );
}
