import { useContext, useEffect, useState } from 'react';
import loader from '../assets/spinner.gif';
import PostCard from "../components/PostCard";
import usePost from "../hooks/usePost";
import { AuthContext } from '../providers/AuthProvider';
import ChatBot from './ChatBot/ChatBot';

function Home() {
    const [data, refetch, isLoading] = usePost();
    const { user } = useContext(AuthContext)
    const [react, setReact] = useState([]);



    if (isLoading) {
        return <img src={loader} alt="" />
    }


    useEffect(() => {
        fetch(`http://localhost:3000/react?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReact(data);
            });
    }, [])

    console.log(react)

    return (
        <div className="  w-full mx-auto space-y-5">
            {
                data.map(item => <PostCard react={react} key={item._id} refetch={refetch} item={item} />)
            }
            <div>
                <ChatBot />
            </div>
        </div>
    )
}

export default Home;