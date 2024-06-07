
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const ImageUpload = ({ setImage, image }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="cursor-pointer  border-dashed border-2 p-[1rem]"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the image here</p>
        ) : (
          <p>Drag 'n' drop image here, or click to select image</p>
        )}
        {image && <p>{image.name}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
