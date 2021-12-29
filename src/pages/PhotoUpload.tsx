import { useEffect, useState } from "react";
import 'firebase/storage'

import { uploadBytesResumable, ref, getDownloadURL, list } from 'firebase/storage'
import { storage } from "../services/firebase";

type FileProps = ArrayBuffer & {
  name: string
}

export function PhotoUpload() {
  const [selectedFile, setSelectedFile] = useState<FileProps>();
  const [photos, setPhotos] = useState<{ name: string; path: string; }[]>([])

  
async function loadPhotos() {
  const storageRef = ref(storage, `/images/`);
  const listPhotos = list(storageRef)

  listPhotos.then(photos => {
    photos.items.forEach((file: { name: string; fullPath: string; }) => {
      const files: { name: string; path: string; }[] = [];

      files.push({
        name: file.name,
        path: file.fullPath
      })
        setPhotos(files)
      })
    }) 
  }

 useEffect(() => {
   loadPhotos()
   console.log(handleProgressUploadImage())
 }, [])

  async function handleUploadPhoto() {
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

  function handleProgressUploadImage() {
    if (!selectedFile) return;

    const storageRef = ref(storage, `img/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    return uploadTask
	};

  async function handlePickImage(event: Event) {
    event.preventDefault()
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  //  if(!selectedFile) return
   const storageRef = ref(storage, `/images/${event.target.files[0].name}.png`);
    const urlImage = await getDownloadURL(storageRef);
    console.log(urlImage)

    // const info = await storage().ref(path).getMetadata()
    // setPhotoInfo(`Upload realizado em ${info.timeCreated}`)
  }

  return (
    <>
      <label htmlFor="avatar">
        Escolha uma imagem
      </label>
      <img src="" alt="" />
      <input
        className="block px-3 py-1.5 border border-solid border-gray-300 rounded" 
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={(event: any) => {handlePickImage(event)}}
        />
      <button onClick={handleUploadPhoto}>Fazer Upload</button>
    </>
  )
}