import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload (){
  const [image, setImage] = useState<any>(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const presetKey = import.meta.env.VITE_PRESETKEY;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', presetKey); 
    formData.append('cloud_name', cloudName); 
  
    await axios
      .post(import.meta.env.VITE_CLOUDINERY_API, formData)
      .then((res) => {
        console.log(res.data.url);

        alert('Image uploaded successfully');
      })
      .catch((err) => {
        console.error('Error uploading image:', err);
      });
  };
  return (
      <div>
        <h1>Image Upload</h1>
        <input type="file" name="image" onChange={handleImageChange} />
        <button onClick={handleSubmit}>Upload</button>
      </div>
  )
}
export default ImageUpload;
