import React, { useState } from "react";

const EditTaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      category,
      priority,
      dueDate,
    };
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Save
      </button>
    </form>
  );
};

export default EditTaskForm;
