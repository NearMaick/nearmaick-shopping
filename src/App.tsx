import { MdAddShoppingCart, MdOutlineCheck } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'

function App() {

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

      <div className="bg-gray-200 rounded-md flex w-5/6 mx-12 px-2 mb-4 h-20 items-center justify-between">
        <div className="ml-2">
          <h4 className="font-bold">Biscoito</h4>
          <span className="font-thin text-gray-400">Quantidade: 2</span>
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

      <div className="bg-gray-200 rounded-md flex w-5/6 mx-12 px-2 mb-4 h-20 items-center justify-between">
        <div className="ml-2">
          <h4 className="font-bold">Biscoito</h4>
          <span className="font-thin text-gray-400">Quantidade: 2</span>
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
    </>
  )
}

export default App
