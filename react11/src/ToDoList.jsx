import { useState, useEffect } from "react";
import { Trash2, ArrowUp, ArrowDown, PlusCircle, CheckCircle } from "lucide-react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    // Load from localStorage if available
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { text: "Eat breakfast", completed: false },
      { text: "Go to work", completed: false },
      { text: "Clean the home", completed: false },
    ];
  });
  const [newTask, setNewTask] = useState("");

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleTaskChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updates = [...tasks];
      [updates[index], updates[index - 1]] = [updates[index - 1], updates[index]];
      setTasks(updates);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updates = [...tasks];
      [updates[index], updates[index + 1]] = [updates[index + 1], updates[index]];
      setTasks(updates);
    }
  }

  function toggleComplete(index) {
    const updates = [...tasks];
    updates[index].completed = !updates[index].completed;
    setTasks(updates);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">My To-Do List</h1>

        {/* Input Section */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={handleTaskChange}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 flex items-center gap-1"
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>

        {/* Task List */}
        <ol className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm"
            >
              {/* Task text with completed style */}
              <span
                className={`flex-1 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>

              <div className="flex gap-2">
                {/* Complete / Uncomplete Button */}
                <button
                  onClick={() => toggleComplete(index)}
                  className={`p-2 rounded-full ${
                    task.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <CheckCircle size={16} />
                </button>

                {/* Move Up */}
                <button
                  onClick={() => moveTaskUp(index)}
                  disabled={index === 0}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
                >
                  <ArrowUp size={16} />
                </button>

                {/* Move Down */}
                <button
                  onClick={() => moveTaskDown(index)}
                  disabled={index === tasks.length - 1}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
                >
                  <ArrowDown size={16} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(index)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default ToDoList;
