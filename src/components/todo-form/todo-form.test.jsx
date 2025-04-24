import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from './todo-form';
import { TodosContext } from '../../todo-context';

describe('TodoForm', () => {
    const mockTodos = [];
    const mockSetTodos = jest.fn();

    const renderWithContext = (component) => {
        return render(
            <TodosContext.Provider value={{ todos: mockTodos, setTodos: mockSetTodos }}>
                {component}
            </TodosContext.Provider>
        );
    };

    beforeEach(() => {
        mockSetTodos.mockClear();
    });

    it('renders the form with input and button', () => {
        renderWithContext(<TodoForm />);

        expect(screen.getByPlaceholderText('Enter new task')).toBeInTheDocument();
        expect(screen.getByText('Add task')).toBeInTheDocument();
    });

    it('adds a new task when clicking the button', () => {
        renderWithContext(<TodoForm />);

        const input = screen.getByPlaceholderText('Enter new task');
        const button = screen.getByText('Add task');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(button);

        expect(mockSetTodos).toHaveBeenCalledWith([
            expect.objectContaining({
                label: 'New Task',
                checked: false,
            })
        ]);
        expect(input.value).toBe('');
    });

    it('adds a new task when pressing Enter', () => {
        renderWithContext(<TodoForm />);

        const input = screen.getByPlaceholderText('Enter new task');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.keyUp(input, { keyCode: 13 });

        expect(mockSetTodos).toHaveBeenCalledWith([
            expect.objectContaining({
                label: 'New Task',
                checked: false,
            })
        ]);
        expect(input.value).toBe('');
    });

    it('does not add empty tasks', () => {
        renderWithContext(<TodoForm />);

        const button = screen.getByText('Add task');
        fireEvent.click(button);

        expect(mockSetTodos).not.toHaveBeenCalled();
    });

    it('trims whitespace from task labels', () => {
        renderWithContext(<TodoForm />);

        const input = screen.getByPlaceholderText('Enter new task');
        const button = screen.getByText('Add task');

        fireEvent.change(input, { target: { value: '  New Task  ' } });
        fireEvent.click(button);

        expect(mockSetTodos).toHaveBeenCalledWith([
            expect.objectContaining({
                label: 'New Task',
            })
        ]);
    });
});