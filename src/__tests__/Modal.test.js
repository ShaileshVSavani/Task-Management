import { render } from '@testing-library/react';
import Modal from '../components/User/Modal';

describe('Modal Component', () => {
  test('renders without crashing', () => {
    render(<Modal currentTask={{ title: 'Sample Task', category: 'Work', priority: 2, dueDate: '2024-12-10' }} onClose={() => {}} />);
  });
});
