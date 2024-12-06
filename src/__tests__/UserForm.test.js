import { render, fireEvent, getAllByPlaceholderText } from '@testing-library/react';
import UserForm from '../components/User/UserForm';

describe('UserForm Component', () => {
  test('renders the form and handles input changes', () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <UserForm
        newTask={{ title: '', category: '', priority: '', dueDate: '' }}
        onInputChange={() => {}}
        onSubmit={handleSubmit}
        isEditing={false}
      />
    );

    const titleInput = getAllByPlaceholderText('Task Title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput.value).toBe('New Task');

    const addButton = getByText('Add Task');
    fireEvent.click(addButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
