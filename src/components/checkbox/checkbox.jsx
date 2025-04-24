import * as React from 'react';
import './checkbox.scss';

export const Checkbox = ({ id, label, checked, onClick, onKeyUp, onDelete, onTaskClick }) => {
  return (
    <div className="checkbox">
      <div className="checkbox-content">
        <input
          type="checkbox"
          checked={checked}
          onChange={onClick}
          onKeyUp={onKeyUp}
        />
        <span
          className={checked ? 'checkbox-checked' : ''}
          onClick={() => onTaskClick && onTaskClick(id)}
          style={{ cursor: 'pointer' }}
        >
          {label}
        </span>
      </div>
      <button type="button" className="checkbox-delete" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};
