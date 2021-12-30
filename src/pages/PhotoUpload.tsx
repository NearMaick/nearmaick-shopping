import { useEffect, useState } from "react";

import { uploadBytesResumable, ref, getDownloadURL, list } from 'firebase/storage'
import { storage } from "../services/firebase";

type FileProps = ArrayBuffer & {
  name: string
}

export function PhotoUpload() {
  const [photos, setPhotos] = useState<{ name: string; path: string; }[]>([])
  const [selectedImage, setSelectedImage] = useState<any>();

  const imageChange = (event: any) => {
    event.preventDefault()
    if (!event.target) return;
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  
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
      if (!selectedImage) return;

      const storageRef = ref(storage, `/images/${selectedImage.name}.png`);
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

    const storageRef = ref(storage, `img/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    return uploadTask
	};

  // async function handlePickImage(event: Event) {
  //   event.preventDefault()
  //   console.log(event.target.files[0])
  //   setSelectedFile(event.target.files[0])
  // //  if(!selectedFile) return    const storageRef = ref(storage, `/images/${event.target.files[0].name}.png`);
  //   const urlImage = await getDownloadURL(storageRef);
  //   console.log(urlImage)

  //   // const info = await storage().ref(path).getMetadata()
  //   // setPhotoInfo(`Upload realizado em ${info.timeCreated}`)
  // }

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