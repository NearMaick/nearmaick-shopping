import { ChangeEvent, useState } from "react";

import { uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from "../services/firebase";
import { Header } from "../components/Header";

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
    <div className="flex flex-col">
      <Header />
      <>
        <div className="w-72 h-48 mx-auto my-4 rounded-md border-2 border-dashed">
          {selectedImage && (
            <div className="my-auto">
              <img
                src={URL.createObjectURL(selectedImage)}              
                alt="Thumb"
              />            
            </div>
          )}
        </div>
        <input
          className="block w-80 px-3 py-1.5 font-normal text-gray-400 border border-solid border-gray-300 rounded mx-auto"
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
      </>
      <h1 
        className="text-gray-400 font-medium mx-auto text-xl"
      >
        {progress}%
      </h1>
      <h1 
        className="text-gray-400 font-medium mx-auto text-xl"
      >
        {bytesTransferred}.
      </h1>
      <button
        onClick={handleUploadPhoto}
        className="border-solid my-4 mx-auto rounded-md px-12 py-2 bg-green-400 text-white font-medium"
      >
        Fazer Upload
      </button>
    </div>
  )
}