import { useState } from "react";

import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../services/firebase";

export function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState();

  async function uploadTaskPromise() {
      if (!selectedFile) return;

      const storageRef = ref(storage, `/images/${selectedFile.name}.png`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed', taskSnapshot => {
      const percent = ((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100).toFixed(0);
      console.log(`percent ${percent}`);

      console.log(`total bytes: ${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`)
    })

    uploadTask.then(() => {
      window.alert('Upload concluído!')}
    )
  }

 	function handleUploadImage() {
    if (!selectedFile) return;

    const storageRef = ref(storage, `img/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
	};

  return (
    <>
      <label htmlFor="avatar">
        Escolha uma imagem
      </label>
      <input
        className="block px-3 py-1.5 border border-solid border-gray-300 rounded" 
        type="file"
        id="avatar" 
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={(event) => {setSelectedFile(event.target.files[0])}}
        />
      <button onClick={uploadTaskPromise}>Fazer Upload</button>
    </>
  )
}