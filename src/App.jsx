import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Route/router';
import { AuthContext } from './providers/AuthProvider';

function App() {

  const { register, handleSubmit, reset } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API}`
  const { user, comment } = useContext(AuthContext)

  console.log(comment)

  // modal 


  // Make sure to bind modal to your appElement (https://reactcommunity.org/


  return (
    <div className=' container mx-auto'>
      <RouterProvider router={router} > </RouterProvider>
      <Toaster />

      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          {
            comment.map(item => <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-20">
                  {item.name}
                </div>
              </div>
              <div className="chat-bubble">{item.comment}</div>
            </div>)
          }
        </form>
      </dialog>
    </div>
  )
}

export default App
