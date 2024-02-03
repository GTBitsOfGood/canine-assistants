import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

export default function ImageUpload({title}) {
  const [previewFile, setPreviewFile] = useState();

  /**
   * 
   * Reads in file from file input and sets preview file with base64 source url 
   */
  
  const handleChange = (e) => {
    const files = e.target.files;
    const file = files[files.length - 1];

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        setPreviewFile({
          file,
          base64: fileReader.result,
        });
        
      });
    } else {
      setPreviewFile(null);
    }
  };

  /**
   * Non-functional upload function for sending file to Backblaze via api/media/upload
   */

  const upload = async () => {
    const { file } = previewFile;
    
    console.log(file)
    
    const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
    const fileName = `image.${fileExt}`;
    const myHeaders = new Headers({
      "Content-Type": "image/png",
      "x-filename": fileName,
      
      
      
    });
    try {
      
      const { data } = await fetch(`/api/media/upload`, {
        method: "POST",
        headers: myHeaders,
        body: {file},
      });
      console.log(data);
      
    } catch (err) {
      console.error(err);
    }

    setPreviewFile();
  };

  return (
    <div>
      <div>
        {previewFile && <img src={previewFile.base64} />}
      </div>
      <label className="text-lg py-1 px-5 cursor-pointer bg-white center border border-solid border-primary-gray border-2 font-medium rounded-md flex justify-around items-center">
        
        <input
            type="file"
            id="my-image-id"
            name="my-image-id"
            onChange={handleChange}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            
        /><h3>{title}</h3>
        <ArrowUpTrayIcon className="h-8 w-8 pl-3"/>
      </label>
      
      
    </div>
  );
}