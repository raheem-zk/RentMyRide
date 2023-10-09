import axios from "axios";
import React, { useEffect, useState } from "react";

function TestImage() {
    const [details, setDetails] = useState({
        name: '',
        age: '',
        images: [],
      });
    
      const [uploadedImages, setUploadedImages] = useState([]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails({
          ...details,
          [name]: value,
        });
      };
    
      const handleImageChange = (e) => {
        const selectedImages = e.target.files;
        setDetails({
          ...details,
          images: [...details.images, ...selectedImages],
        });
      };
    
      useEffect(() => {
        if (uploadedImages.length > 0) {
          // When uploadedImages state changes, update the details.images state
          setDetails({
            ...details,
            images: [...uploadedImages],
          });
        }
      }, [uploadedImages]);

    console.log(uploadedImages);
console.log(details);
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const uploadedUrls = await uploadImages(details.images);
          console.log(uploadedUrls);
          setUploadedImages(uploadedUrls);
        } catch (error) {
          console.error('Error uploading images:', error);
        }
      };
    
      const uploadImages = async (images) => {
        const url = [];
    
        const presetKey = import.meta.env.VITE_PRESETKEY;
        const cloudName = import.meta.env.VITE_CLOUD_NAME;
    
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          const formData = new FormData();
          formData.append('file', img);
          formData.append('upload_preset', presetKey);
          formData.append('cloud_name', cloudName);
    
          const response = await axios.post(
            import.meta.env.VITE_CLOUDINERY_API,
            formData
          );
          let urlData = response.data.url;
          url.push(urlData);
        }
        return url;
      };
  const handleChenges = (e)=>{
    const { name, value } = e.target;
    console.log(name, value);
    setDetails({...details, [images] : e.target.value})
  }

  return (
    <div className="bg-red-300">
      <h2>Add an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={details.name} onChange={handleChenges} />
        <input type="text" name="age" value={details.age} onChange={handleChenges} />
        <div>
          <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Upload Image</button>
        </div>
      </form>
    </div>
  );
}

export default TestImage;
