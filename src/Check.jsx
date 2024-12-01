import React, { useEffect, useState } from "react";
import axios from "axios";

function Check() {
  const [tasks, setTasks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTask, setNewTask] = useState({ task_name: "", name: "" });
  const [email] = useState(localStorage.getItem("email"));
  const date = new Date().toISOString().split("T")[0];

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask, status: "Incomplete" }]);

    axios.post("http://localhost:3000/task", {
      email: email,
      task_name: newTask.task_name,
      name: newTask.name,
      status: "Incomplete",
      date: date,
    });

    setNewTask({ task_name: "", name: "" });
    setShowDialog(false);
  };

  const handleRemoveCompleted = () => {
    setTasks(tasks.filter(task => task.status !== "Completed"));
    axios.delete('http://localhost:3000/task');
  };

  const handleCompleteTask = (id) => {
    setTasks( 
      tasks.map(task =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
    axios.put('http://localhost:3000/task', { id: id });
  };

  useEffect(() => {
    if (email) {
      axios
        .get("http://localhost:3000/task", { params: { email: email } })
        .then((response) => setTasks(response.data))
        .catch((error) => console.error(error));
    }
  }, [email]);

  return (
    <div>
      <div className="relative mx-auto mt-8 max-w-4xl shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-purple-400 via-indigo-600 to-blue-900">
        <table className="min-w-full divide-y-2 divide-gray-300 text-sm bg-white shadow-lg rounded-lg">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(task => (
              <tr className="hover:bg-gray-100 transition-all duration-200" key={task.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{task.task_name}</td>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">
                  {task.status === "Incomplete" ? (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
                    >
                      Complete
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 space-x-4">
          <button
            onClick={() => setShowDialog(true)}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
          >
            Add Task
          </button>
          <button
            onClick={handleRemoveCompleted}
            className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300"
          >
            Remove Completed Tasks
          </button>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-indigo-600">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.task_name}
              onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddTask}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Check;
