import { useEffect, useState } from "react";
const axios = require("axios");


const Task = (props) =>
{
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [priority, setPriority] = useState();
    const [complete, setComplete] = useState();

    // save task
    const saveTask = async () => {
        let tempComplete;
        if (complete === "true")
        {
            tempComplete = true;
        }
        else if (complete === "false")
        {
            tempComplete = false;
        }

        const data = { "id" : id, "name" : name, "priority" : parseInt(priority), "complete" : tempComplete };
        await axios.put("http://localhost:3001/api/tasks/update", data);
        window.location.reload();
    };

    const deleteTask = async () => {
        console.log("deleting??");
        await axios.delete(`http://localhost:3001/api/tasks/delete/${id}`);
        window.location.reload();
    };

    useEffect(() => {
        setId(props.id);
        setName(props.name);
        setPriority(props.priority);
        setComplete(props.complete.toString());
    }, []);

    return (
        <tr>
            <td>
                <input className="input"
                defaultValue={name} style={{width : "200px"}} onChange={e=> setName(e.target.value)}></input>
            </td>
            <td>
                <input className="input"
                defaultValue={priority} style={{width : "200px"}} onChange={e=> setPriority(e.target.value)}></input>
            </td>
            <td>
                <input className="input"
                defaultValue={complete} style={{width : "200px"}} onChange={e=> setComplete(e.target.value)}></input>
            </td>

            <td>
                <button className="button is-primary" onClick={saveTask}>Save</button>
                <button className="button is-danger" onClick={deleteTask}>Delete</button>
            </td>
        </tr>
        
    );
};

export default Task;