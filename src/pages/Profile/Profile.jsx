import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import loader from '../../assets/spinner.gif';
import PostCard from "../../components/PostCard";
import { AuthContext } from "../../providers/AuthProvider";

function Profile() {
    const { user } = useContext(AuthContext);
    const photo = user?.photoURL || 'https://i.ibb.co/411LDqh/fashion-boy-with-yellow-jacket-blue-pants.jpg'

    const [edit, setEdit] = useState(false);
    const { handleSubmit, register } = useForm();

    const [updateUserName, setUpdateUserName] = useState('')


    const handleUserUpdate = (data) => {
        const { name } = data;
        const email = user?.email;
        const userInfo = { name, email }
        fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json())
            .then(data => {
                setUpdateUserName(name);
                if (data.acknowledged) {

                }
            })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/profile?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUpdateUserName(data.name)
            })
    }, [])

    console.log(updateUserName)

    const { data, refetch } = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/posts?email=${user.email}`)
            return res.json()
        }
    })

    if (!data) {
        return <img src={loader} />
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">

                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={photo} />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold">{!updateUserName ? user?.displayName : updateUserName}</h1>
                    </div>
                    <div>
                        <span>posts: {data.length}</span>
                    </div>
                    <div>
                        {edit ? <form className="form-control space-y-4" onSubmit={handleSubmit(handleUserUpdate)}>

                            <input className="input" type="text" {...register('name')} />
                            <input type="submit" value="submit" className="btn btn-secondary" />
                        </form> : <span onClick={() => setEdit(true)} className=" text-red-600 underline cursor-pointer">Edit</span>}
                    </div>
                </div>
            </div>
            <div>
                {
                    data.map(item => <PostCard item={item} key={item._id} />)
                }
            </div>
        </div>
    )
}

export default Profile;