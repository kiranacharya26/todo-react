import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './todo-list';
import { TodosContext } from '../../todo-context';

describe('TodoList', () => {
    const mockTodos = [
        { id: 1, label: 'Task 1', checked: false },
        { id: 2, label: 'Task 2', checked: true },
        { id: 3, label: 'Task 3', checked: false },
    ];

    const renderWithContext = (component, { todos = mockTodos, setTodos = jest.fn() } = {}) => {
        return render(
            <TodosContext.Provider value={{ todos, setTodos }}>
                {component}
            </TodosContext.Provider>
        );
    };

    it('renders the todo list with tasks', () => {
        renderWithContext(<TodoList />);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    it('shows empty state message when no tasks exist', () => {
        renderWithContext(<TodoList />, { todos: [] });
        expect(screen.getByText("Looks like you're up for a challenge!")).toBeInTheDocument();
    });

    it('filters tasks correctly', () => {
        renderWithContext(<TodoList />);

        // Click completed filter
        fireEvent.click(screen.getByText('Completed'));
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();

        // Click incomplete filter
        fireEvent.click(screen.getByText('Incomplete'));
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });

    it('searches tasks correctly', () => {
        renderWithContext(<TodoList />);

        const searchInput = screen.getByPlaceholderText('Search tasks...');
        fireEvent.change(searchInput, { target: { value: 'Task 1' } });

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('toggles task completion', () => {
        const setTodos = jest.fn();
        renderWithContext(<TodoList />, { setTodos });

        const checkbox = screen.getByRole('checkbox', { name: 'Task 1' });
        fireEvent.click(checkbox);

        expect(setTodos).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ id: 1, checked: true })
        ]));
    });

    it('deletes tasks', () => {
        const setTodos = jest.fn();
        renderWithContext(<TodoList />, { setTodos });

        const deleteButtons = screen.getAllByText('x');
        fireEvent.click(deleteButtons[0]);

        expect(setTodos).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.not.objectContaining({ id: 1 })
            ])
        );
    });

    it('shows pagination when more than 10 items exist', () => {
        const manyTodos = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            label: `Task ${i + 1}`,
            checked: false,
        }));

        renderWithContext(<TodoList />, { todos: manyTodos });

        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });
}); 