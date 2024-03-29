import Image from 'next/image';
import { useState } from 'react';

import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import dogplaceholdericon from "../../public/dogplaceholdericon.svg";

export default function ImageUpload({ preview, setFileParam, previewImage }) {
  const [previewFile, setPreviewFile] = useState((previewImage && previewImage != "") ? previewImage : null);
  
  /**
   * Reads in file from file input and sets preview file with base64 source url 
   * Sets fileParam as the uploaded file to be uploaded to backblaze in index form
   */
  const handleChange = (e) => {
    const files = e.target.files;
    const file = files[files.length - 1];

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        setPreviewFile(fileReader.result);
        setFileParam(file);
      });
    } else {
      setPreviewFile(null);
    }
  };

  return (
    <div className="flex flex-col justify-center align-center items-center">
      <div>
        {previewFile ? (
                        <div style={{ position: 'relative', width: '350px', height: '350px', borderRadius: '10px', overflow: 'hidden' }}>
                        <Image
                            alt="Dog"
                            layout="fill"
                            objectFit="cover"
                            src={previewFile}
                        />
                    </div>
          
        ) : (
          <div className="bg-primary-gray">
            <Image src={dogplaceholdericon} />
          </div>
        )}
      </div>
      {!previewFile && !preview &&
        <label className="text-lg py-1 px-5 cursor-pointer bg-white center border border-solid border-primary-gray font-medium rounded-md flex justify-around items-center max-w-[200px]">
          <input
              type="file"
              id="my-image-id"
              name="my-image-id"
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
          />
          <h3>{"Upload Image"}</h3>
          <ArrowUpTrayIcon className="h-8 w-8 pl-3"/>
        </label> 
      }
          
      {(previewFile || preview) &&
        <div className="z-10 absolute bottom-10 flex justify-around items-center w-full ">
          <label className=" text-lg py-1 px-3 cursor-pointer bg-white  border border-solid border-primary-gray font-medium rounded-md flex justify-around items-center">
            <h3>Delete</h3>
            <XMarkIcon className="h-8 w-8 pl-3"/>
            <button type="button" onClick={() => {
              setFileParam("");
              setPreviewFile(null);
            }}></button>
          </label>
          <label className="text-lg py-1 px-5 cursor-pointer bg-white center border border-solid border-primary-gray font-medium rounded-md flex justify-around items-center">
            <input
                type="file"
                id="my-image-id"
                name="my-image-id"
                onChange={handleChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
            />
            <h3>{"Replace Image"}</h3>
            <ArrowUpTrayIcon className="h-8 w-8 pl-3"/>
          </label> 
        </div>
      }
      
    </div>
  );
}