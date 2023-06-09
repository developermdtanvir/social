import { useQuery } from "react-query";

const usePost = () => {

    const { refetch, isLoading, data } = useQuery({
        queryKey: ['post',],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/posts`)
            return res.json();
        }
    })
    return [data, refetch]
}

export default usePost;

