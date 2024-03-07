import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { title: "makan", isDone: false },
    { title: "ngoding", isDone: false },
    { title: "tidur", isDone: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const getTodosDone = () => {
    return todos.filter((todo) => {
      return todo.isDone;
    });
  };

  const handleDelete = (idx) => {
    const temp = [...todos];
    temp.splice(idx, 1);
    setTodos(temp);
  };

  const handleisDone = (idx, value) => {
    const temp = [...todos];
    temp[idx].isDone = value;
    setTodos(temp);
  };

  const handleAddTodo = () => {

    if(!newTodo){
      return alert ("must input")
    }
    const temp = [...todos];
    temp.push({title: newTodo, isDone: false})
    setTodos(temp)
    setNewTodo('')
  }

  return (
    <div className="bg-slate-800 h-screen">
      <div className="container mx-auto text-white max-w-[800px]">
        <h1 className="text-center text-3xl font-bold">Chores ToDo List</h1>

        <table className="w-full">
          {todos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={(e) => handleisDone(index, e.target.checked)}
                  />
                </td>
                <td>
                  <p className={todo.isDone ? "line-through" : ""}>
                    {todo.title}
                  </p>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>delete</button>
                </td>
              </tr>
            );
          })}
        </table>

        <h1 className="text-center text-3xl font-bold">
          Done : {getTodosDone().length}
        </h1>

        <div>
          <input
            type="text"
            className="w-full text-black"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}

          />
          <button className="bg-slate-400 p-2 rounded-2xl"
          onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
    </div>
  );
}

export default App;
