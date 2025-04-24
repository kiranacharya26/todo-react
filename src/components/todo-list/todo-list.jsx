import * as React from 'react';
import { Checkbox } from '../checkbox';
import { Pagination } from '../pagination';
import { TaskDetail } from '../task-detail';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

const ITEMS_PER_PAGE = 10;

export const TodoList = ({ hideFilter = false }) => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      }),
    );
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const handleTaskClick = (id) => {
    setSelectedTaskId(id);
  };

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const paginatedTodos = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return todos.slice(startIndex, endIndex);
  }, [todos, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the list when page changes
    document.querySelector('.todo-list-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    // If current page is greater than total pages, reset to last available page
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <>
          <div className="todo-list-content">
            {paginatedTodos.map((todoItem) => (
              <Checkbox
                key={todoItem.id}
                id={todoItem.id}
                label={todoItem.label}
                checked={todoItem.checked}
                onClick={() => toggleCheck(todoItem.id)}
                onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
                onDelete={() => handleDelete(todoItem.id)}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="no-todos">
          {todos.length ? 'No matching tasks found' : 'Looks like you\'re up for a challenge!'}
        </div>
      )}
      {selectedTaskId !== null && (
        <TaskDetail
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
};
