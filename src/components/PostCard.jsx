import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineHeart, AiOutlineSave } from "react-icons/ai";
import { FaRegComment } from 'react-icons/fa';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";


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


function PostCard({ item, refetch, react }) {



    const [showReact, setShowReact] = useState([])

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


    const { register, handleSubmit } = useForm()

    const { user, setComment } = useContext(AuthContext);

    const filterLike = (items) => {
        console.log(react);
        const reactfilter = react.filter(item => item.postId === items._id)
        setShowReact(reactfilter);
        console.log(reactfilter);

    }

    const postSubmit = (data) => {
        const { comment } = data;
        const commentdata = { comment, email: user?.email, name: user?.displayName, postId: item._id }
        if (user) {
            fetch(`http://localhost:3000/comment`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(commentdata)
            }).then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        Swal.fire(
                            'comment added successfully !',
                            'You clicked the button!',
                            'success'
                        )
                        refetch()
                    }
                    console.log(data)
                })
        }
    }

    const handleReact = (item) => {
        const email = item.email
        const userName = item.userName
        const postId = item._id
        const reactUserEmail = user.email
        const reactInfo = { email, userName, postId, reactUserEmail }
        fetch('http://localhost:3000/react', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reactInfo)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire(
                        'successfull',
                        'You clicked the button!',
                        'success'
                    )
                }



            });
    }




    const showComment = (id) => {

        fetch(`http://localhost:3000/comment/${id}`)
            .then(res => res.json())
            .then(data => {
                setComment(data);
                console.log(data);
            });

    }

    const handelSavePost = id => {
        // const saveId = item._id;
        // const userName = item.userName
        // const saveInfo = { saveId, userName };
        // fetch('http://localhost:3000/save', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(saveInfo)
        // }).then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data.acknowledged) {
        //             Swal.fire(
        //                 'Successfully saved',
        //                 'You clicked the button!',
        //                 'success'
        //             )
        //         }
        //     });



        fetch(`http://localhost:3000/post/${id}?email=${user?.email}`, {
            method: 'PATCH',
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire(
                        'Successfully saved',
                        'You clicked the button!',
                        'success'
                    )
                    refetch()
                }
            });


    }

    const [showEmojiPopup, setShowEmojiPopup] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleHover = () => {
        setShowEmojiPopup(true);
    };

    const handleLeave = () => {
        setShowEmojiPopup(false);
    };

    const handleEmojiSelection = (emoji) => {
        setSelectedEmoji(emoji);
        setShowEmojiPopup(false);
    };

    useEffect(() => {
        let timer;
        if (selectedEmoji) {
            timer = setTimeout(() => {
                setSelectedEmoji(null);
            }, 30000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [selectedEmoji]);





    const photo = user?.photoURL || 'https://i.ibb.co/411LDqh/fashion-boy-with-yellow-jacket-blue-pants.jpg'

    const handleDeletePost = id => {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted Sucessfully',
                        'You clicked the button!',
                        'success'
                    )
                    refetch()
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(postSubmit)} className="card  bg-base-100 shadow-xl space-y-10 ">

                <div className="card-body">
                    <span>post by {item.userName}</span>

                    <p>{item.post}</p>
                </div>
                <figure><img src={item.image} alt="Shoes" /></figure>
                <div onClick={openModal}>
                    <span onClick={() => filterLike(item)} className=" text-red-600 underline cursor-pointer">show like</span>
                </div>
                <div className=" flex justify-around bottom-5">
                    <AiOutlineHeart onClick={() => handleReact(item)} className=" text-white text-2xl cursor-pointer" />
                    <div
                        className="emoji-button relative"
                        onMouseEnter={handleHover}
                        onMouseLeave={handleLeave}
                    >
                        <button className="">{selectedEmoji ? selectedEmoji : 'Select Emoji'}</button>
                        {showEmojiPopup && (
                            <div className="emoji-popup">
                                <span className="emoji-option" onClick={() => handleEmojiSelection("😍")}>😍</span>
                                <span className="emoji-option" onClick={() => handleEmojiSelection("👍")}>👍</span>
                                <span className="emoji-option" onClick={() => handleEmojiSelection("😆")}>😆</span>
                                {/* Add more emoji options as needed */}
                            </div>
                        )}
                    </div>
                    <FaRegComment className=" text-white text-2xl cursor-pointer" />
                    <span onClick={() => handleDeletePost(item._id)} className="btn  btn-secondary">Delete Post</span>
                    <div className={item.color}>
                        <AiOutlineSave onClick={() => handelSavePost(item._id)} className={` text-2xl cursor-pointer`} />
                    </div>
                </div>

                <div className=" flex justify-center pb-2 ">
                    <div className="avatar">
                        <div className="w-14 rounded-full">
                            <img src={photo} />
                        </div>
                    </div>
                    <input className=" input rounded-full" {...register('comment')} placeholder="Wright a comment ............." type="text" />
                </div>
            </form>
            <div onClick={() => window.my_modal_3.showModal()} className="flex justify-center">
                <button onClick={() => showComment(item._id)} className=" btn btn-primary">show comment</button>
            </div>



            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <button onClick={closeModal} className="text-3xl">x</button>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Emoji</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showReact.map((react, index) => <tr
                                    key={index + 1}
                                    className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{react.userName}</td>
                                    <td>Like</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                # Table with a row that high
            </Modal>

        </div>
    )
}

export default PostCard;