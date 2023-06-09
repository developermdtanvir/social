import PostCard from "../components/PostCard";
import usePost from "../hooks/usePost";

function Home() {
    const [data, refetch] = usePost();
    console.log(data);
    return (
        <div className="  w-full mx-auto">
            {
                data.map(item => <PostCard item={item} />)
            }
        </div>
    )
}

export default Home;