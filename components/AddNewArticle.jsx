import Image from "next/image";
import { useState } from "react";

const AddNewArticle = ({ setCategories, categories }) => {
  const [value, setValue] = useState("");
  const [istoggle, setIsToggle] = useState(false);
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setIsToggle(!istoggle);
  };
  const handleSubmit = () => {
    setCategories([...categories.filter((item) => item !== value), value]);
    setIsToggle(false);
  };
  return (
    <div className="border p-[1rem] rounded-md cursor-pointer">
      <div onClick={handleClick} className="flex gap-[1rem]">
        {" "}
        <Image src={"/assets/add.png"} width={30} height={30} alt="close" /> Add
        new Category
      </div>
      {istoggle && (
        <div className="flex  z-[100] items-center absolute bg-[#f6f6f6f8] top-0 right-0 h-[100vh] w-[100vw] px-[2rem]">
          <div className="bg-white w-[50%] max-lg:w-full z-[100]  m-auto  p-[2rem] rounded-md flex flex-col gap-[2rem] items-center">
            <div onClick={handleClick}>
              <Image
                src={"/assets/close.png"}
                width={20}
                height={20}
                alt="close"
              />
            </div>
            {message && <p className="text-center text-red-500">{message}</p>}{" "}
            <h1 className="font-[500] text-center">Add a new Category</h1>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="content"
              type="text"
              className="input"
            />
            <button className="black_btn w-full" onClick={handleSubmit}>
              Add New
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewArticle;
