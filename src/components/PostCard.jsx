import { useForm } from "react-hook-form";
import { AiOutlineHeart, AiOutlineSave } from "react-icons/ai";
import { FaRegComment } from 'react-icons/fa';

function PostCard({ item }) {
    const { register, handleSubmit } = useForm()
    console.log(item)

    const postSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit(postSubmit)} className="card  bg-base-100 shadow-xl space-y-10">
            <figure><img src={item.image} alt="Shoes" /></figure>

            <div className="card-body">
                <p>{item.post}</p>
            </div>
            <div className=" flex justify-around bottom-5">
                <AiOutlineHeart className=" text-white text-2xl cursor-pointer" />
                <FaRegComment className=" text-white text-2xl cursor-pointer" />
                <AiOutlineSave className=" text-white text-2xl cursor-pointer" />
            </div>
            <input className=" input rounded-full" {...register('comment')} placeholder="Wright a comment ............." type="text" />
        </form>
    )
}

export default PostCard;