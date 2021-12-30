import { useState } from "react";

export function FileInput() {
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return(
    <>
      <input
        accept="image/*"
        type="file"
        onChange={imageChange}
      />
      {selectedImage && (
          <div >
            <img
              src={URL.createObjectURL(selectedImage)}              
              alt="Thumb"
            />            
          </div>
        )}
    </>
  )
}