import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const { user } = useContext(AuthContext)
function useProfile() {
    const { refetch: faching, isLoading, data: profile } = useQuery({
        queryKey: ['post',],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/profile?email=${user?.email}`)
            return res.json();
        }
    })
    return [profile, faching, isLoading]
}
export default useProfile;