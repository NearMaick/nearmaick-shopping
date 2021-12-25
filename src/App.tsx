import { MdAddShoppingCart, MdOutlineCheck } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'

import { firebase, db } from './services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  
    useEffect(() => {
      async function loadData() {
        const docRef = collection(db, "products");
        const productsSnapshot = await getDocs(docRef);
        const productsList = productsSnapshot.docs.map(doc => {
          return {
            id: doc.id, 
            ...doc.data() 
          }
        }) as ProductProps[]
        
        setProducts(productsList)
      }

      loadData()
    }, [])

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
        />
        <input 
          type="text" 
          placeholder="0"
          className="bg-gray-200 h-16 w-12 rounded-md text-center" 
        />
        <button className="bg-green-600 text-white text-2xl h-16 w-12 rounded-md flex items-center justify-center">
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
          <button className="bg-green-600 text-white p-2 rounded-md">
            <MdOutlineCheck />
          </button>
          <button className="bg-red-600 text-white p-2 rounded-md">
            <IoMdTrash />
          </button>
        </div>
      </div>
      ))}

      
    </>
  )
}

export default App
