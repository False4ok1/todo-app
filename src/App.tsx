import { useState } from 'react';
import type { Todo, FilterType } from './types/todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

export function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.done).length;

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <AddTodoForm onAdd={handleAddTodo} />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {(['all', 'active', 'done'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontWeight: filter === f ? 'bold' : 'normal',
              padding: '6px 12px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />

      <p style={{ marginTop: '16px', color: '#555' }}>
        Невиконано завдань: <strong>{activeCount}</strong>
      </p>
    </div>
  );
}

export default App;