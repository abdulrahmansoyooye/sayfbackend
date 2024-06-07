import { createCategory } from "@/utils/actions/articleActions";
import Image from "next/image";
import React, { useState } from "react";

const AddNew = ({ setCategoryValue }) => {
  const [value, setValue] = useState("");
  const [istoggle, setIsToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setIsToggle(!istoggle);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createCategory(value);
      if (res.status === 200) {
        window.location.reload();
      } else {
        setMessage(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };
  return (
    <div className="border p-[1rem] rounded-md cursor-pointer">
      <div onClick={handleClick}>Add new Category</div>
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
              {loading ? (
                <Image
                  src={"/assets/loading.svg"}
                  width={20}
                  height={20}
                  alt="loading"
                />
              ) : (
                "Add New"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNew;
