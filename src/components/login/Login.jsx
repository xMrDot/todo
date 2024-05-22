import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Login.module.css";
import LoginUser from "./LoginUser";
const Login = () => {
    const [userList, setUserList] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    let login = async () => {
        try{
            let response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
            console.log(response.data)
            setUserList(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    let handleStart = () => {
        if(!activeUser) 
            return alert("Please select a user to login as");

        localStorage.setItem("activeUser", activeUser)
        localStorage.setItem("activeUserName", userList.find(user => user.id === parseInt(activeUser)).name)

        console.log("activeUser", activeUser)
        window.location.href = "/todo"
    }
    useEffect(() => {
        login();
    }, [])
    return <div id={style.loginContainer}>
        <section className={style.loginSection}>
        <h1>Login</h1>
        <LoginUser setActiveUser={setActiveUser} userList={userList}/>
        <button onClick={handleStart}>Get started</button>
        </section>
    </div>;
}
export default Login;