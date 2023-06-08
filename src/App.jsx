import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RouterProvider } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';
import router from './Route/router';
import { AuthContext } from './providers/AuthProvider';

function App() {

  const { register, handleSubmit, reset } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API}`
  const { user } = useContext(AuthContext)

  const handlePost = (data) => {
    const { post } = data
    const formData = new FormData()
    formData.append('image', data.image[0]);

    fetch(img_hosting_url, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(responseData => {
        console.log(responseData)
        if (responseData.success) {
          const image = responseData.data.display_url
          const email = user?.email
          const userName = user?.displayName
          const postData = { post, image, email, userName }
          fetch('http://localhost:3000/post',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(postData)
            }).then(res => res.json())
            .then(data => {
              if (data.acknowledged) {
                Swal.fire(
                  'Successfully Post!',
                  'You clicked the button!',
                  'success'
                )
              }
            })

        }


      })

  }




  return (
    <div className=' container mx-auto'>

      <RouterProvider router={router} > </RouterProvider>

      <dialog id="my_modal_3" className="modal">
        <form onSubmit={handleSubmit(handlePost)} method="dialog" className="modal-box">
          <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg text-center">Create Post</h3>
          <div className="divider"></div>
          <input {...register('post')} placeholder=' What`s On Your mind' type="text" className=' outline-none input w-full border-none' />

          <input {...register("image")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
          <br />
          <input type="submit" value="submit" className=' btn text-center' />
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </form>
      </dialog>
    </div>
  )
}

export default App
