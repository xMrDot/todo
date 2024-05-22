import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Todo.module.css";
import Timer from "./Timer";
const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const [activeUser, ] = useState(localStorage.getItem("activeUser"));
    const [filterState, setFilterState] = useState("all");
    let fetchTodo = async () => {
        if(!activeUser) return;
        try{
            let response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${activeUser}`)
            console.log(response.data)
            setTodoList(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        // fetch data from the server
        if(!activeUser){
            window.location.href = "/login";
        }
        fetchTodo("all");
    }, [activeUser])

    return <div id={style.todoContainer}>
        <Timer />
        <section className={style.topContainer}>
        <h1>Todos for {localStorage.getItem('activeUserName')}</h1>
        <span className={style.todoFilter}>
            <select onChange={(e)=>setFilterState(e.target.value)} defaultValue="all">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not completed</option>
            </select>
        </span>
        <button onClick={() => window.location.href = "/login"}>Change user</button>
        </section>
        <section className={style.todoList}>
            <h2>Displaying {filterState} records</h2>
            {todoList?.map((todo) => {
                if(filterState === "all") return <div key={todo.id} className={style.todoItem}>
                    <span>{todo.title}</span>
                    <span className={todo.completed ? style.completed : style.notCompleted}>{todo.completed?"Completed":"Not completed"}</span>

                </div>
                else if(filterState === "completed" && todo.completed) return <div key={todo.id} className={style.todoItem}>
                    <span>{todo.title}</span>
                    <span className={style.completed}>Completed</span>
                </div>
                else if(filterState === "not completed" && !todo.completed) return <div key={todo.id} className={style.todoItem}>
                    <span>{todo.title}</span>
                    <span className={style.notCompleted}>Not completed</span>
                </div>
                return null;
            })}
        </section>
    </div>;
}
export default Todo;