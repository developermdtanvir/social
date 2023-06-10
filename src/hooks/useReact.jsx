import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../providers/AuthProvider";

const useReact = () => {

    const { user } = useContext(AuthContext)

    const { refetch: fatching, isLoading, data } = useQuery({
        queryKey: ['react', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/react?email=${user?.email}`)
            return res.json();
        }
    })
    return [data, fatching, isLoading]
}

export default useReact;
