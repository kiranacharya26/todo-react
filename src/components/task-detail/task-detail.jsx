import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './task-detail.scss';

export const TaskDetail = ({ taskId, onClose }) => {
    const { todos, setTodos } = React.useContext(TodosContext);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedTask, setEditedTask] = React.useState('');
    const task = todos.find(t => t.id === taskId);

    React.useEffect(() => {
        if (task) {
            setEditedTask(task.label);
        }
    }, [task]);

    if (!task) return null;

    const handleSave = () => {
        if (editedTask.trim().length === 0) return;

        setTodos(todos.map(t => {
            if (t.id === taskId) {
                return { ...t, label: editedTask.trim() };
            }
            return t;
        }));
        setIsEditing(false);
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSave();
        } else if (e.keyCode === 27) {
            setIsEditing(false);
            setEditedTask(task.label);
        }
    };

    const toggleStatus = () => {
        setTodos(todos.map(t => {
            if (t.id === taskId) {
                return { ...t, checked: !t.checked };
            }
            return t;
        }));
    };

    return (
        <div className="task-detail-overlay" onClick={onClose}>
            <div className="task-detail" onClick={e => e.stopPropagation()}>
                <button className="task-detail-close" onClick={onClose}>×</button>
                <div className="task-detail-header">
                    <h2>Task Details</h2>
                    <div className="task-detail-status">
                        Status:
                        <button
                            className={`status-badge ${task.checked ? 'completed' : 'pending'}`}
                            onClick={toggleStatus}
                        >
                            {task.checked ? 'Completed' : 'Pending'}
                        </button>
                    </div>
                </div>
                <div className="task-detail-content">
                    {isEditing ? (
                        <div className="task-edit">
                            <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                                onKeyUp={handleKeyUp}
                                autoFocus
                                placeholder="Enter task description"
                            />
                            <div className="task-edit-actions">
                                <button onClick={handleSave} className="save">Save</button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedTask(task.label);
                                    }}
                                    className="cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="task-label">{task.label}</p>
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M10.5 1.5L12.5 3.5M1.5 12.5H3.5L11.5 4.5L9.5 2.5L1.5 10.5V12.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Edit
                            </button>
                        </>
                    )}
                </div>
                <div className="task-detail-footer">
                    <div className="task-meta">
                        <span>Task ID: {task.id}</span>
                        <span>Created: {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}; 