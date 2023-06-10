import { useQuery } from 'react-query';
import loader from '../../assets/spinner.gif';
import PostCard from '../../components/PostCard';

function Save() {

    const color = 'text-green-600'

    const { refetch, isLoading, data } = useQuery({
        queryKey: ['post', color],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/post?color=${color}`)
            return res.json();
        }
    })

    console.log(data);

    if (isLoading) {
        return <img src={loader} alt="" />
    }

    return (
        <div>
            {
                data.map(item => <PostCard item={item} />)
            }
        </div>
    )
}

export default Save;