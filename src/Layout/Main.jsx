import { Link, Outlet } from "react-router-dom";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsPostcard } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import usePost from "../hooks/usePost";
import { AuthContext } from "../providers/AuthProvider";


function Main() {
    const { register, handleSubmit, reset } = useForm();

    const [data, refetch] = usePost();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API}`
    const { user } = useContext(AuthContext)

    const { signOutUser } = useContext(AuthContext)
    function openModal() {
        setIsOpen(true);
    }


    Modal.setAppElement('#root');


    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


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
                            refetch()
                            setIsOpen(false)
                        })

                }


            })

    }

    return (
        <div className=" flex">
            <div className="drawer drawer-start  lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/login'><BsPostcard /> All Posts</Link></li>
                        <li><Link to='/login'><AiOutlineUsergroupAdd />Following</Link></li>
                        <li><Link to='/login'><AiFillSave />Save</Link></li>
                        <li ><Link to='/profile'> <CgProfile /> Profile</Link></li>
                        <li onClick={signOutUser}><Link ><FiLogOut /> Logout</Link></li>
                        <div className="divider"></div>

                        <li onClick={openModal} className="bg-green-600 rounded-md font-bold text-lg"><Link >Create Post</Link></li>
                    </ul>

                </div>
            </div>
            <Outlet />

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form onSubmit={handleSubmit(handlePost)} >
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg text-center">Create Post</h3>
                    <div className="divider"></div>
                    <input {...register('post')} placeholder=' What`s On Your mind' type="text" className=' outline-none input w-full border-none' />

                    <input {...register("image")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                    <br />
                    <input type="submit" value="submit" className=' btn text-center' />
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </form>
            </Modal>
        </div>
    )
}

export default Main;