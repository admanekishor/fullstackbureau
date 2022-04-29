import axios from 'axios';
import React,{useState} from 'react'

export default function Login() {
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");
   const HandleClick = () =>{
        console.log(User, Password)
    }
    return (
        <>
            <input type="text" placeholder='Enter User Name' value={User} onChange={(e) => setUser({ user: e.target.value })} />
            <input type="text" placeholder='Enter Password' onChange={(e) => setPassword({ password: e.target.value })} />
            <button onClick={HandleClick}></button>
        </>
    )
}
