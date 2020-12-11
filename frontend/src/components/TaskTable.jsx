import { useEffect, useState } from "react";
import Task from "./Task";
const axios = require("axios");


const TaskTable = (props) =>
{
    const [tasks, setTasks] = useState([]); //empty initial array

    /* task Model/Schema
    {
        "_id": "5fd2b67742e7a50ecd3251d5",
        "Name": "Do something",
        "Priority": 1,
        "Complete": true
    }
    */

    useEffect(() => {
        const getTasks = async () =>
        {
            await axios.get("http://localhost:3001/api/tasks/all")
            .then(response => setTasks(response.data));
        };

        getTasks();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Complete</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map(i => {
                    return <Task id={i._id} name={i.Name} priority={i.Priority} complete={i.Complete}></Task>
                })}
            </tbody>
        </table>

    );
}

export default TaskTable;