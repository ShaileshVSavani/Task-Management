

# Task Manager Application

Task Manager Application is a fully responsive and feature-rich web application for managing tasks efficiently with sorting, filtering, and pagination. Users can add, edit, delete, and view tasks in an organized and intuitive interface. The app supports role-based access and allows users to manage their tasks effectively.

---

## Features

- **Task Management**: Add, edit, delete, and view tasks.
- **Sorting**: Sort tasks by priority, due date, and category.
- **Filtering**: Filter tasks by status (completed/in-progress).
- **Pagination**: Displays tasks in batches of 10 per page.
- **Modal View**: View detailed task information in a modal.
- **Responsive Design**: Fully responsive for all devices.
- **User Authentication**: Role-based user authentication.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Testing**: React Testing Library, Jest
- **Deployment**: Deployed on [Vercel]

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShaileshVSavani/Task-Management.git
   cd task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```
   The application will run at `http://localhost:3000`.

4. **Run Tests**:
   ```bash
   npm test
   ```

---

## Deployment

The project is live and can be accessed here:  
[**Live Demo**](https://task-management-ecru-two.vercel.app/)

---


## Features in Detail

### 1. Sorting
- Sort tasks by **priority**, **due date**, or **category** using the dropdown menu.

### 2. Filtering
- Filter tasks by **status** (completed/in-progress) to focus on specific task types.

### 3. Pagination
- Tasks are displayed in batches of 10, with a responsive and intuitive pagination interface.

### 4. Modal View
- View detailed task information in an elegant and responsive modal.

---

## Testing

Tests are written using **React Testing Library** and **Jest**.  
Run the tests with the following command:
```bash
npm test
```

Tested components:
1. **UserForm**: Ensures task addition/editing functionality works as expected.
2. **TaskList**: Ensures tasks render correctly with pagination and sorting.
3. **Modal**: Ensures the modal displays task details accurately.

