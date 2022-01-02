import { ChangeEvent, useState } from "react";

import { uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from "../services/firebase";

export function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState<Blob & { name: string }>();

  const [bytesTransferred, setBytesTransferred] = useState('');
  const [progress, setProgress] = useState('0');

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
      setProgress(`percent ${percent}`);

      setBytesTransferred(`total bytes: ${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`)
    })

    uploadTask.then(() => {
      window.alert('Upload concluído!')}
    )
  }

  return (
    <>
      <>
        {selectedImage && (
          <div>
            <img
              src={URL.createObjectURL(selectedImage)}              
              alt="Thumb"
            />            
          </div>
        )}
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
      </>
      <button onClick={handleUploadPhoto}>Fazer Upload</button>
      <h1>{progress}%</h1>
      <h1>{bytesTransferred}</h1>
    </>
  )
}