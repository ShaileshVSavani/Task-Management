
// Get tasks for a specific user or all tasks for admin
export const fetchTasks = (role) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (role === "admin") {
    // Fetch all tasks for admin from userTasks
    const userTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
    let allTasks = [];
    for (const email in userTasks) {
      allTasks = [...allTasks, ...userTasks[email]]; // Merge tasks for all users
    }
    return allTasks;
  }

  // Fetch only user-specific tasks for regular users
  return JSON.parse(localStorage.getItem(`userTasks`))?.[currentUser?.email] || [];
};

// Save a task for the specific user or global tasks for admin
export const addTask = (task, userEmail) => {
  const userTasks = JSON.parse(localStorage.getItem("userTasks")) || {};

  if (!userTasks[userEmail]) {
    userTasks[userEmail] = [];
  }
  
  userTasks[userEmail].push(task);
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};

// Update task for the user or admin
export const updateTask = (updatedTask, userEmail) => {
  const userTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
  const updatedTasks = userTasks[userEmail]?.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  userTasks[userEmail] = updatedTasks;
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};


export const deleteTask = (taskId, userEmail) => {
  const userTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
  if (userTasks[userEmail]) {
    userTasks[userEmail] = userTasks[userEmail].filter((task) => task.id !== taskId);
    localStorage.setItem("userTasks", JSON.stringify(userTasks)); // Save changes to localStorage
  }
};

