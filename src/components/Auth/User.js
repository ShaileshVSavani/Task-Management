

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", category: "", priority: "", dueDate: "" });
  const [categories] = useState(["Work", "Personal", "Shopping"]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10); // Tasks per page

  // Sort and Filter states
  const [sortBy, setSortBy] = useState(""); // Sorting criteria (e.g., "priority", "dueDate")
  const [filterBy, setFilterBy] = useState({ category: "", priority: "", status: "" }); // Filtering criteria
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      const userTasks = getUserTasks(currentUser.email);  // Use user email as the userId
      setTasks(userTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.email) {
        saveUserTasks(currentUser.email, tasks);  // Use email or user ID to store tasks
      }
    }
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.category || !newTask.priority || !newTask.dueDate) {
      return toast.error("Please fill out all fields.");
    }

    if (isEditing) {
      if (currentTask && currentTask.id) {
        const updatedTasks = tasks.map((task) =>
          task.id === currentTask.id ? { ...currentTask, ...newTask } : task
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully!");
      } else {
        console.error("Error: currentTask is null or does not have an id.");
        toast.error("Error: Unable to update the task.");
      }
    } else {
      const task = { ...newTask, id: Date.now(), completed: false };
      setTasks([...tasks, task]);
      toast.success("Task added successfully!");
    }

    setNewTask({ title: "", category: "", priority: "", dueDate: "" });
    setIsEditing(false);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    toast.success("Task status updated!");
  };

  const saveUserTasks = (userId, tasks) => {
    const storedTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
    storedTasks[userId] = tasks;
    localStorage.setItem('userTasks', JSON.stringify(storedTasks));
  };

  const getUserTasks = (userId) => {
    const storedTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
    return storedTasks[userId] || [];
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);  // Set the current task to display in the modal
    setShowModal(true);  // Show the modal
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);  // Set the task to be edited
    setNewTask({ ...task });  // Populate the form with task data
    setIsEditing(true);  // Switch to editing mode
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
    setCurrentTask(null);  // Reset current task
  };

  // Group tasks by category
  // const groupedTasks = tasks.reduce((acc, task) => {
  //   if (!acc[task.category]) {
  //     acc[task.category] = [];
  //   }
  //   acc[task.category].push(task);
  //   return acc;
  // }, {});

  // Filter tasks based on the filterBy state
  const filteredTasks = tasks.filter((task) => {
    const isCategoryMatch = filterBy.category ? task.category === filterBy.category : true;
    const isPriorityMatch = filterBy.priority ? task.priority === filterBy.priority : true;
    const isStatusMatch = filterBy.status ? task.completed === (filterBy.status === "completed") : true;
    return isCategoryMatch && isPriorityMatch && isStatusMatch;
  });

  // Sort tasks based on the sortBy state
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority - b.priority;
    } else if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0; // No sorting if sortBy is empty
  });

  // Pagination logic: Show tasks based on the current page and tasksPerPage
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Pagination controls
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">Task Manager</h1>

      <form onSubmit={addTask} className="mb-6 p-6 border rounded-lg bg-gray-100 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          />
          <select
            name="category"
            value={newTask.category}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            name="priority"
            placeholder="Priority (1-5)"
            value={newTask.priority}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4 md:mt-0"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>

      {/* Sort and Filter Options */}
      <div className="flex gap-4 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>

        <select
          value={filterBy.category}
          onChange={(e) => setFilterBy({ ...filterBy, category: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Filter by Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filterBy.priority}
          onChange={(e) => setFilterBy({ ...filterBy, priority: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Filter by Priority</option>
          {[1, 2, 3, 4, 5].map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>

        <select
          value={filterBy.status}
          onChange={(e) => setFilterBy({ ...filterBy, status: e.target.value })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Filter by Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 border rounded-lg shadow-md ${task.completed ? "bg-green-100" : "bg-white"}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{task.title}</p>
              <button
                onClick={() => handleTaskClick(task)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                View
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Category: {task.category}</p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
            <div className="mt-4">
              <button
                onClick={() => toggleCompletion(task.id)}
                className={`px-4 py-2 rounded-lg ${task.completed ? "bg-gray-500" : "bg-indigo-600"} text-white`}
              >
                {task.completed ? "Mark Incomplete" : "Mark Completed"}
              </button>
              <button
                onClick={() => handleEditClick(task)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm text-gray-700">{`Page ${currentPage} of ${totalPages}`}</p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Task Details Modal */}
      {showModal && currentTask && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold">{currentTask.title}</h2>
            <p><strong>Category:</strong> {currentTask.category}</p>
            <p><strong>Priority:</strong> {currentTask.priority}</p>
            <p><strong>Due Date:</strong> {currentTask.dueDate}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
