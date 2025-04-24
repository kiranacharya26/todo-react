import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import { Search } from './components/search';
import { Filter } from './components/filter';
import './index.scss';

const todosTemplate = [
  {
    id: 0,
    label: 'Fix the app to display the list of all tasks',
    checked: false,
  },
  {
    id: 1,
    label: 'Fix the layout so that checkboxes are displayed in a vertical column',
    checked: false,
  },
  {
    id: 2,
    label: 'Fix the functionality to add a new task',
    checked: false,
  },
  {
    id: 3,
    label: 'Fix the functionality to mark a task as completed',
    checked: false,
  },
  {
    id: 4,
    label: 'Fix the functionality to delete a task',
    checked: false,
  },
  {
    id: 5,
    label: 'Fix the task counter to count completed tasks correctly',
    checked: false,
  },
  {
    id: 6,
    label: 'Add a filter to toggle between completed and incomplete tasks',
    checked: false,
  },
  {
    id: 7,
    label: 'Add a search feature to find tasks by text',
    checked: false,
  },
  {
    id: 8,
    label: 'Bonus: Implement pagination or lazy loading if tasks exceed 10',
    checked: false,
  },
  {
    id: 9,
    label: 'Bonus: Write test cases for important functionality',
    checked: false,
  },
  {
    id: 10,
    label: 'Bonus: Add additional UI views (e.g., task detail, stats)',
    checked: false,
  },
  {
    id: 11,
    label: 'Bonus: Add additional UI views (e.g., task detail, stats)',
    checked: false,
  },
  {
    id: 12,
    label: 'Bonus: Add additional UI views (e.g., task detail, stats)',
    checked: false,
  },
  {
    id: 13,
    label: 'Bonus: Add additional UI views (e.g., task detail, stats)',
    checked: false,
  },
];

export const App = () => {
  const [todos, setTodos] = React.useState(todosTemplate);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = React.useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === 'completed') return todo.checked;
        if (filter === 'incomplete') return !todo.checked;
        return true;
      })
      .filter((todo) =>
        todo.label.toLowerCase().includes(searchTerm)
      );
  }, [todos, searchTerm, filter]);

  return (
    <div className="root">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <TodosContext.Provider value={{ todos: filteredTodos, setTodos }}>
        <div className="app-controls">
          <div className="app-controls-left">
            <TodoForm />
          </div>
          <div className="app-controls-right">
            <Search onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} currentFilter={filter} />
          </div>
        </div>
        <div className="app-status">
          <TodoResults />
        </div>
        <TodoList hideFilter />
      </TodosContext.Provider>
    </div>
  );
};
