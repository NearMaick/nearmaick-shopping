import { IoMdReturnLeft, IoMdTrash } from "react-icons/io"
import { MdOutlineCheck } from "react-icons/md"

import { db } from '../services/firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

export function ShoppingList({ id, description, quantity, done }:ProductProps) {
  async function handleDeleteProduct(id: string) {
    await deleteDoc(doc(db, 'products', id))
  }

  async function handleToggleDone(id: string, done: boolean) {
    await updateDoc(doc(db, 'products', id), {
      done: !done
    })
  }

  return(
    <div className="bg-gray-200 rounded-md flex w-5/6 mx-12 px-2 mb-4 h-20 items-center justify-between">
        <div className="ml-2">
          <h4 className="font-bold">{description}</h4>
          <span className="font-thin text-gray-400">{`Quantidade: ${quantity}`}</span>
        </div>
        <div className="flex flex-col h-full justify-around">
          <button
            onClick={() => {handleToggleDone(id, done)}} 
            className="bg-green-600 text-white p-2 rounded-md"
          >
            {done ? <IoMdReturnLeft /> : <MdOutlineCheck />}
          </button>
          <button
            onClick={() => {handleDeleteProduct(id)}} 
            className="bg-red-600 text-white p-2 rounded-md"
          >
            <IoMdTrash />
          </button>
        </div>
      </div>
  ) 
}