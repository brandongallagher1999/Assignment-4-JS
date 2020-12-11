
import './App.css';
import 'bulma/css/bulma.css';
import TaskTable from "./components/TaskTable";
import { useState } from 'react';


const axios = require("axios");

function App() {

  const [name, setName] = useState();
  const [priority, setPriority] = useState();
  const [complete, setComplete] = useState();

  const newTask = async () => {
    let tempValue;
    if (complete === "on")
    {
      tempValue = true;
    }
    else
    {
      tempValue = false;
    }
    const data = { "Name" : name, "Priority" : parseInt(priority), "Complete" : tempValue};
    await axios.post("http://localhost:3001/api/tasks/create", data);
    window.location.reload();
  };

  return (
    <div>
      <p style={{ fontSize: "35px"}}>
        MERN Task Manager
      </p>
      <br/>

      <p>
        Name: 
      </p>
      <input className="input"
      style={{width: "300px"}}
      onChange={e=> setName(e.target.value)}
      ></input>

      <br/>
      <br/>
      <p>
        Complete:
      </p>
      <input type="checkbox"
      onChange={e=> setComplete(e.target.value)}
      ></input>

      <p>
        Priority:
      </p>

      <input className="input"
      style={{width: "300px"}}
      onChange={e=> setPriority(e.target.value)}
      ></input>

      <br/>
      <br/>
      <button className="button is-primary" onClick={newTask}>Save</button>

      <br/>
      <br/>
      <TaskTable/>


    </div>
  );
}

export default App;
