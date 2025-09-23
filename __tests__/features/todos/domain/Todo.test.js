import { Todo } from '../../../../src/features/todos/domain/Todo';

describe('Todo', () => {
  it('should create a todo with default completed false', () => {
    const todo = new Todo('1', 'Test todo');

    expect(todo.id).toBe('1');
    expect(todo.text).toBe('Test todo');
    expect(todo.completed).toBe(false);
  });

  it('should create a todo with completed true', () => {
    const todo = new Todo('2', 'Completed todo', true);

    expect(todo.id).toBe('2');
    expect(todo.text).toBe('Completed todo');
    expect(todo.completed).toBe(true);
  });

  it('should create a todo with custom completed value', () => {
    const todo = new Todo('3', 'Another todo', false);

    expect(todo.id).toBe('3');
    expect(todo.text).toBe('Another todo');
    expect(todo.completed).toBe(false);
  });
});
