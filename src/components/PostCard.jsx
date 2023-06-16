import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";
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


function PostCard({ item, refetch, react, showButton }) {



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



        fetch(`http://localhost:3000/posts/${id}?email=${user?.email}`, {
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

    const [isHovered, setIsHovered] = useState(false);
    const [isReactionHovered, setIsReactionHovered] = useState(false);
    const [isDelayActive, setIsDelayActive] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);

    useEffect(() => {
        let reactionTimer;

        if (isHovered || isReactionHovered) {
            setIsDelayActive(true);
            reactionTimer = setTimeout(() => {
                setIsReactionVisible(true);
            }, 200);
        } else if (isDelayActive) {
            reactionTimer = setTimeout(() => {
                setIsReactionVisible(false);
                setSelectedReaction(null);
                setIsDelayActive(false);
            }, 2000);
        }

        return () => {
            clearTimeout(reactionTimer);
        };
    }, [isHovered, isReactionHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsReactionHovered(false);
    };

    const handleReactionSelect = (reaction) => {
        setSelectedReaction(reaction);
        setIsReactionHovered(true);
    };


    const photo = user?.photoURL || 'https://i.ibb.co/411LDqh/fashion-boy-with-yellow-jacket-blue-pants.jpg'




    const handleDeletePost = id => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            refetch()
                        }
                    })


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
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
                    <div
                        className="cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        {isHovered && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: '#f1f1f1',
                                padding: '5px',
                                borderRadius: '5px',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                            }}>
                                <span className="cursor-pointer" onClick={() => handleReactionSelect('like 👍')}>👍</span>
                                <span className="cursor-pointer" onClick={() => handleReactionSelect('love ❤️')}>❤️</span>
                                <span className="cursor-pointer" onClick={() => handleReactionSelect('angry 😡')}>😡</span>
                                <span className="cursor-pointer" onClick={() => handleReactionSelect('haha 😄')}>😄</span>
                            </div>
                        )}

                        {selectedReaction ? (
                            <span>{selectedReaction}</span>
                        ) : (
                            <button className="cursor-pointer">Like</button>
                        )}
                    </div>
                    <FaRegComment className=" text-white text-2xl cursor-pointer" />
                    {showButton && <span onClick={() => handleDeletePost(item._id)} className="btn  btn-secondary">Delete Post</span>}
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
                    <input className=" input rounded-full" {...register('comment')} placeholder="Write a comment ............." type="text" />
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