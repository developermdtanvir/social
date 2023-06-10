import { useQuery } from "react-query";

const useSave = () => {

    const { refetch, data } = useQuery({
        queryKey: ['save',],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/save`)
            return res.json();
        }
    })
    return [data, refetch]
}

export default useSave;

