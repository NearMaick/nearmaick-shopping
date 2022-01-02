import { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { addDoc, collection } from 'firebase/firestore'
import { db } from "../services/firebase";

export function FormBox() {
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  async function handleAddProduct() {
    await addDoc(collection(db, 'products'), {
      description,
      quantity,
      done: false
    })
  }


  return (
    <div className="m-4 flex justify-between">
        <input 
          type="text" 
          placeholder="Nome do produto"
          className="bg-gray-200 h-16 rounded-md px-2 w-3/4"
          value={description} 
          onChange={event => setDescription(event.target.value)}
        />
        <input 
          type="text" 
          placeholder="0"
          className="bg-gray-200 h-16 w-12 rounded-md text-center"
          onChange={event => setQuantity(Number(event.target.value))} 
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white text-2xl h-16 w-12 rounded-md flex items-center justify-center"
        >
          <MdAddShoppingCart />
        </button>
      </div>
  )
}