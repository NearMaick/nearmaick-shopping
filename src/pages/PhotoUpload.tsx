import { ChangeEvent, useState } from "react";

import { uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from "../services/firebase";

export function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState<Blob & { name: string }>();

  function imageChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    if (!event.target) return;
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  async function handleUploadPhoto() {
      if (!selectedImage) return;

      const storageRef = ref(storage, `/images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on('state_changed', taskSnapshot => {
      const percent = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
      console.log(`percent ${percent}`);

      console.log(`total bytes: ${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`)
    })

    uploadTask.then(() => {
      window.alert('Upload concluído!')}
    )
  }

  function handleProgressUploadImage() {
    if (!selectedImage) return;

    const storageRef = ref(storage, `images/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    return uploadTask
	}; 

  return (
    <>
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
      <button onClick={handleUploadPhoto}>Fazer Upload</button>
    </>
  )
}