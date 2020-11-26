import React, { useState,useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput =useRef<HTMLInputElement>(null);
//Agregando tareas y mostrandolas con el Boton Submit
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    console.log(tasks);
  };
  //añade una nueva tarea  con el name y done:false
  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };
//Cambiar el estado de la tarea por el id
  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };
  //Elimina la Tarea por el id
  const removeTask = (i: number): void => {
   const newTasks: ITask[] = [...tasks];
   newTasks.splice(i);
   setTasks(newTasks);
  };
  return (
    <div className="containet p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  ref={taskInput }
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (// recorre las tareas y en base al done los tacha con 'line-through'
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}//cambia el boton de check a x
                >
                  {t.done ? "✓" : "x"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}//bton que elimina la tarea
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
