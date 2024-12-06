
import React, { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "../../utils/taskUtils";
import Modal from "../Layout/Modal";
import EditTaskForm from "../Layout/EditTaskForm";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    if (user?.role === "admin") {
      const allTasks = fetchTasks(user.role); // Fetch all tasks for admin
      setTasks(allTasks);
    }
  }, []);

  const handleOpenViewModal = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask, updatedTask.userEmail); // Update localStorage
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteTask = (taskId, userEmail) => {
    deleteTask(taskId, userEmail); // Remove from localStorage
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border">Title</th>
              <th className="p-4 border">Category</th>
              <th className="p-4 border">Priority</th>
              <th className="p-4 border">Due Date</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="p-4 border text-center">{task.title}</td>
                <td className="p-4 border text-center">{task.category}</td>
                <td className="p-4 border text-center">{task.priority}</td>
                <td className="p-4 border text-center">{task.dueDate}</td>
                <td className="p-4 border text-center">{task.completed ? "Completed" : "Pending"}</td>
                <td className="p-4 border space-x-2 text-center">
                  <button
                    onClick={() => handleOpenViewModal(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id, task.userEmail)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Task Modal */}
      {isViewModalOpen && selectedTask && (
        <Modal onClose={() => setIsViewModalOpen(false)} title="Task Details">
          <div>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Category:</strong> {selectedTask.category}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Status:</strong> {selectedTask.completed ? "Completed" : "Pending"}</p>
          </div>
        </Modal>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && selectedTask && (
        <Modal onClose={() => setIsEditModalOpen(false)} title="Edit Task">
          <EditTaskForm
            task={selectedTask}
            onSave={(updatedTask) => handleUpdateTask(updatedTask)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
