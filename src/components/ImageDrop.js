import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const ImageDrop = ({ image, setImage, className }) => {
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const imageUrl = image && window.URL.createObjectURL(image);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImage(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleBrowseFiles = () => {
    inputRef.current?.click();
  }

  return (
    <div className={"flex flex-col items-center justify-center w-full " + className}>
      <button
        type="button"
        onClick={handleBrowseFiles}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex items-center justify-center w-full h-64 overflow-hidden border-2 ${
          image ? "border-inherit" : "border-dashed"
        } rounded-lg cursor-pointer focus:outline-none 
      ${
        dragActive
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-gray-50"
      }`}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        {image ? (
          <img
            src={imageUrl}
            alt={`Uploaded ${image.name}`}
            className={`w-full h-full object-cover ${dragActive ? "bg-blue-500 opacity-60" : ""}`}
          />
        ) : (
            <div className="flex flex-col w-3/4 pt-2 justify-center">
                <p className="mb-1 text-center text-gray-600">
                    Arraste e solte uma imagem aqui, ou clique para selecionar do seu dispositivo
                </p>
                <span className="flex items-center justify-center text-5xl text-gray-600">
                    <ion-icon name="cloud-upload-outline"></ion-icon>
                </span>
            </div>
        )}
      </button>
    </div>
  );
};

ImageDrop.propTypes = {
    image: PropTypes.string.isRequired,
    setImage: PropTypes.func.isRequired,
    className: PropTypes.func.isRequired
}

export default ImageDrop;
