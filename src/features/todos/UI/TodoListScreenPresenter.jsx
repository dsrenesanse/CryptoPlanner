import React, { useState, useEffect } from 'react';
import { TodoContext } from './TodoContext';

/**
 * Presenter component for the Todo List screen. Manages the state and logic for the todo list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to render within the context provider.
 * @param {import('../../domain/TodoUseCase')} props.todoUseCase - The use case for todo operations.
 * @returns {React.JSX.Element} The JSX element for the presenter.
 */
export const TodoListScreenPresenter = ({ children, todoUseCase }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  useEffect(() => {
    fetchTodos({ shouldProceedCheck: true });
  }, []);

  const fetchTodos = async ({ shouldProceedCheck = true }) => {
    const todos = await todoUseCase.getTodos({ shouldProceedCheck });
    setTodos(todos);
  };

  const handleAddTodo = async () => {

    if (editingTodoId) {
      const success = await todoUseCase.updateTodo(editingTodoId, text);
      if (success) {
        setText('');
        setEditingTodoId(null);
        setEditingTodoText('');
        fetchTodos({ shouldProceedCheck: false });
      }
    } else if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
      };
      const success = await todoUseCase.addTodo(newTodo);
      if (success) {
        setText('');
        fetchTodos({ shouldProceedCheck: false });
      }
    }
  };

  const handleUpdateTodo = async id => {
    const success = await todoUseCase.switchTodo(id);
    if (success) {
      fetchTodos({ shouldProceedCheck: false });
    }
  };

  const handleDeleteTodo = async id => {
    const success = await todoUseCase.deleteTodo(id);
    if (success) {
      fetchTodos({ shouldProceedCheck: false });
    }
  };

  const handleEditTodo = (id, currentText) => {
    setEditingTodoId(id);
    setEditingTodoText(currentText);
    setText(currentText);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
    setText('');
  };

  const handleReorder = async data => {
    const success = await todoUseCase.reorderTodos(data);
    if (success) {
      fetchTodos({ shouldProceedCheck: false });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        text,
        setText,
        handleAddTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleEditTodo,
        handleCancelEdit,
        handleReorder,
        editingTodoId,
        editingTodoText,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
