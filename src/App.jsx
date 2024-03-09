import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodoStatus,
} from "./redux/slices/todosSlices";
import { toast } from "react-toastify";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post("http://localhost:3000/todos", {
        title: newTodo,
        isDone: false,
      });
      const response = await axios.get("http://localhost:3000/todos");
      const updatedTodos = response.data;
      setTodos(updatedTodos);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getDoneTodos = async (index, isChecked) => {
    try {
      const updatedTodosDone = todos.map((todo, i) => {
      return i === index ? { ...todo, isDone: isChecked } : todo;
      });
      setTodos(updatedTodosDone);
      
      if (isChecked) {
            const todoUpdate = updatedTodosDone[index]
            await axios.patch(`http://localhost:3000/todos/${todoUpdate.id}`, {
            isDone: true,
        });
        setTodos(done.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen w-screen">
      <div className="container mx-auto text-white max-w-[800px]">
        <h1 className="text-center text-3xl font-bold">Chores ToDo List</h1>

        <table className="w-full mt-6">
          {todos.map((todo, index) => {
            return (
              <tr key={index}>
                <td className="p-4">
                  <input
                    // className="flex w-4 h-4 rounded-lg shadow-lg cursor-pointer g focus:ring-2 "
                    className="flex peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-green-400 before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity  checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={(e) => getDoneTodos(index, e.target.checked)}
                  />
                </td>
                <td>
                  <p className={todo.isDone ? "line-through" : ""}>
                    {todo.title}
                  </p>
                </td>
                <td>
                  <button
                    className="flex bg-transparent hover:bg-blue-500 text-red-300 font-semibold hover:text-white py-1 px-3 border border-red-300 hover:border-transparent rounded"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <hr class="my-6 divide-y divide-dashed md:divide-solid" />

        <h1 className="text-center text-3xl font-bold mb-5">
          Done : {todos.filter((todo) => todo.isDone).length}
        </h1>
        <p className="mb-2">Add Todo</p>
        <div>
          <input
            type="text"
            className="w-full text-white mb-3 rounded-lg py-2 bg-transparent border-solid border-2 border-gray-400  "
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-cyan-200 p-2 px-5 rounded-lg text-gray-900 font-bold"
            onClick={addTodo}
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
