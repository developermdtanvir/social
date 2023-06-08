import { BiImages } from 'react-icons/bi'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Route/router'
import AuthProvider from './providers/AuthProvider'

function App() {

  return (
    <div className=' container mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} > </RouterProvider>
      </AuthProvider>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg text-center">Create Post</h3>
          <div className="divider"></div>
          <input placeholder=' What`s On Your mind' type="text" className=' outline-none input w-full border-none' />

          <span><BiImages className=' text-4xl
           mt-10 cursor-pointer' /></span>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </form>
      </dialog>
    </div>
  )
}

export default App
