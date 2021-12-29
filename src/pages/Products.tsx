import { MdAddShoppingCart, MdOutlineCheck } from 'react-icons/md'
import { IoMdTrash, IoMdReturnLeft } from 'react-icons/io'

import { db } from '../services/firebase'
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

export function Products() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function loadData() {
    const docRef = collection(db, "products");
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id, 
          ...doc.data() 
        }
      }) as ProductProps[]

      setProducts(data)
    })

    return () => { unsubscribe() }
  }
  
    useEffect(() => {
      loadData()
    }, [])

    async function handleAddProduct() {
      await addDoc(collection(db, 'products'), {
        description,
        quantity,
        done: false
      })
    }

    async function handleToggleDone(id: string, done: boolean) {
      await updateDoc(doc(db, 'products', id), {
        done: !done
      })
    }

    async function handleDeleteProduct(id: string) {
      await deleteDoc(doc(db, 'products', id))
    }

  return (
    <>
      <div className="w-full h-24 bg-purple-700 flex items-end py-6 justify-center">
        <h1 className="text-gray-200 font-semibold text-xl">Lista de Compras</h1>
      </div>

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

      {products.map(product => (
        <div key={product.id} className="bg-gray-200 rounded-md flex w-5/6 mx-12 px-2 mb-4 h-20 items-center justify-between">
        <div className="ml-2">
          <h4 className="font-bold">{product.description}</h4>
          <span className="font-thin text-gray-400">{`Quantidade: ${product.quantity}`}</span>
        </div>
        <div className="flex flex-col h-full justify-around">
          <button
            onClick={() => {handleToggleDone(product.id, product.done)}} 
            className="bg-green-600 text-white p-2 rounded-md"
          >
            {product.done ? <IoMdReturnLeft /> : <MdOutlineCheck />}
          </button>
          <button
            onClick={() => {handleDeleteProduct(product.id)}} 
            className="bg-red-600 text-white p-2 rounded-md"
          >
            <IoMdTrash />
          </button>
        </div>
      </div>
      ))}      
    </>
  )
}