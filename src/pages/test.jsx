import { useState } from "react";

// FOR TESTING will be deleted before merging into main

export default function Test() {
  const [ dogId, setDogId ] = useState("");
  const [ file, setFile ] = useState();
  const [ imageUrl, setImageUrl ] = useState("");

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      await fetch("api/images", {
        method: "POST",
        headers: {
          "Dog-Id": dogId
        },
        body: file,
      }).then(async () => {
        const dog = await (await fetch(`api/dogs/${dogId}`, { method: "GET" })).json();
        setImageUrl(dog.data.image);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDog = async () => {
    await fetch(`api/dogs/${dogId}`, { method: "DELETE" });
  }

  return (
    <div>
      <div className="mt-4">
        <h2>Dog Id</h2>
        <p>Find in MongoDB Database</p>
        <input 
          className="textbox-base text-input textbox-border"
          value={dogId}
          onChange={(e) => {
            setDogId(e.target.value)}
          }
        />
      </div>
      <div className="mt-4 flex flex-col">
        <h2 className="mb-2">Upload Image</h2>
        <input
          type="file"
          name="my-image-id"
          onChange={handleChange}
          accept="image/png, image/jpeg"
        />
        <button
          className="button-base primary-button primary-button-text w-36 mt-2"
          onClick={upload}
        >Upload Image</button>
      </div>
      <div className="mt-4">
        <h2>Delete Dog</h2>
        <button
          className="button-base secondary-button secondary-button-text mt-2"
          onClick={deleteDog}
        >Delete Dog</button>
      </div>
      <div className="mt-4 flex flex-col">
        <h2 className="mb-2">Uploaded Image</h2>
        <img src={imageUrl} width="300" height="auto" />
      </div>
    </div>
  )
}