import { useEffect } from "react"
import axios from 'axios';

function LandingPage() {
    useEffect(()=> {
        axios.get('/api/hello')
        .then(response => console.log(response.data))   // 서버에서 돌아오는것을 콘솔창에 띄워본다!
    }, [])

    return (
        <div>
            LadnigPage
        </div>
    )
}

export default LandingPage