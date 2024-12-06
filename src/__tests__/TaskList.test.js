import { render } from '@testing-library/react';
import TaskList from '../components/User/TaskList';

describe('TaskList Component', () => {
  test('renders without crashing', () => {
    const tasks = [
      { id: 1, title: 'Task 1', category: 'Work', priority: 3, dueDate: '2024-12-12', completed: false },
    ];
    render(<TaskList tasks={tasks} />);
  });
});
