import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Route/router';
import { AuthContext } from './providers/AuthProvider';

function App() {

  const { register, handleSubmit, reset } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API}`
  const { user } = useContext(AuthContext)



  // modal 


  // Make sure to bind modal to your appElement (https://reactcommunity.org/


  return (
    <div className=' container mx-auto'>
      <RouterProvider router={router} > </RouterProvider>
    </div>
  )
}

export default App
