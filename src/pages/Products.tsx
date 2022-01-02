import { db } from '../services/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { FormBox } from '../components/FormBox'
import { ShoppingList } from '../components/ShoppingLIst'

type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

export function Products() {
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

  return (
    <>
      <Header title="Lista de Produtos" />
      <FormBox />

      {products.map(product => (
        <ShoppingList
          key={product.id} 
          id={product.id}
          description={product.description}
          quantity={product.quantity}
          done={product.done}
        />
      ))}      
    </>
  )
}