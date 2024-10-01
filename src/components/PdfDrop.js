import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import pdfIcon from "../assets/icons/pdf_file_icon.svg";
import toast from "./react-stacked-toast";

const PdfDrop = ({ pdfFile, setPdfFile, className }) => {
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (file.type === 'application/pdf') {
      return true;
    } else {
      toast({
        type: "warning",
        title: "Arquivo inválido",
        description: "Por favor, envie um arquivo PDF válido",
        duration: 3000  
      });
      return false;
    }
  };

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
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setPdfFile(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setPdfFile(selectedFile);
    }
  };

  const handleBrowseFiles = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-full " + className
      }
    >
      <button
        type="button"
        onClick={handleBrowseFiles}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex items-center justify-center w-full h-22 overflow-hidden border-2 ${
          pdfFile ? "border-inherit" : "border-dashed"
        } rounded-lg cursor-pointer focus:outline-none 
      ${
        dragActive
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-gray-50"
      }`}
      >
        <input
          type="file"
          accept="application/pdf"
          ref={inputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        {pdfFile ? (
          <div className="p-2 flex items-center">
            <img src={pdfIcon} alt="PDF icon" className="h-8 mr-2" />
            <p className="text-gray-600 text-center">
              {pdfFile.name}
            </p>
          </div>
        ) : (
          <div className="py-2 px-4 flex items-center">
          <p className="text-gray-600 text-center">
            Arraste e solte um arquivo aqui, ou clique para selecionar do seu
            dispositivo
          </p>
          <span className="ml-4 text-2xl text-gray-600">
            <ion-icon name="cloud-upload-outline"></ion-icon>
          </span>
        </div>
        )}
        
      </button>
    </div>
  );
};

PdfDrop.propTypes = {
  pdfFile: PropTypes.string.isRequired,
  setPdfFile: PropTypes.func.isRequired,
  className: PropTypes.func.isRequired,
};

export default PdfDrop;
