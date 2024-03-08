import { useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodoStatus } from "../redux/slices/todosSlices";

function Home() {
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()

  const [newTodo, setNewTodo] = useState("");


  const handleDelete = (idx) => {
    dispatch(deleteTodo(idx))
  };

  const handleisDone = (index, value) => {
    dispatch(updateTodoStatus({index, isDone: value}))
  };

  const handleAddTodo = () => {
    if (!newTodo) {
      return alert("No todos for Today!");
    }
    dispatch(addTodo({title, isDone: false}))
    setNewTodo("");
  };

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
                    onChange={(e) => handleisDone(index, e.target.checked)}
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
                    onClick={() => handleDelete(index)}
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
          Done : {getTodosDone().length}
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
            onClick={handleAddTodo}
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home
