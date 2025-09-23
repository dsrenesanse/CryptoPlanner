import { TodoUseCase } from '../../../../src/features/todos/domain/TodoUseCase';
import { Todo } from '../../../../src/features/todos/domain/Todo';

describe('TodoUseCase', () => {
  let mockTodoRepository;
  let mockCallback;
  let todoUseCase;

  beforeEach(() => {
    mockTodoRepository = {
      getTodos: jest.fn(),
      addTodo: jest.fn(),
      switchTodo: jest.fn(),
      deleteTodo: jest.fn(),
      reorderTodos: jest.fn(),
      updateTodo: jest.fn(),
    };
    mockCallback = jest.fn();
    todoUseCase = new TodoUseCase(mockTodoRepository, mockCallback);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return todos when shouldProceedCheck is true and callback succeeds', async () => {
      const todos = [new Todo('1', 'Test', false)];
      mockCallback.mockResolvedValue(true);
      mockTodoRepository.getTodos.mockResolvedValue(todos);

      const result = await todoUseCase.getTodos({ shouldProceedCheck: true });

      expect(result).toEqual(todos);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.getTodos).toHaveBeenCalled();
    });

    it('should return empty array when shouldProceedCheck is true and callback fails', async () => {
      mockCallback.mockResolvedValue(false);

      const result = await todoUseCase.getTodos({ shouldProceedCheck: true });

      expect(result).toEqual([]);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.getTodos).not.toHaveBeenCalled();
    });

    it('should return todos when shouldProceedCheck is false', async () => {
      const todos = [new Todo('1', 'Test', false)];
      mockTodoRepository.getTodos.mockResolvedValue(todos);

      const result = await todoUseCase.getTodos({ shouldProceedCheck: false });

      expect(result).toEqual(todos);
      expect(mockCallback).not.toHaveBeenCalled();
      expect(mockTodoRepository.getTodos).toHaveBeenCalled();
    });
  });

  describe('getTodosCount', () => {
    it('should return count of todos', async () => {
      const todos = [new Todo('1', 'Test', false), new Todo('2', 'Test2', true)];
      mockTodoRepository.getTodos.mockResolvedValue(todos);

      const count = await todoUseCase.getTodosCount();

      expect(count).toBe(2);
      expect(mockTodoRepository.getTodos).toHaveBeenCalled();
    });
  });

  describe('addTodo', () => {
    it('should add todo without calling callback', async () => {
      const todo = new Todo('1', 'New todo', false);

      const result = await todoUseCase.addTodo(todo);

      expect(result).toBe(true);
      expect(mockTodoRepository.addTodo).toHaveBeenCalledWith(todo);
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('switchTodo', () => {
    it('should switch todo when callback succeeds', async () => {
      mockCallback.mockResolvedValue(true);

      const result = await todoUseCase.switchTodo('1');

      expect(result).toBe(true);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.switchTodo).toHaveBeenCalledWith('1');
    });

    it('should not switch todo when callback fails', async () => {
      mockCallback.mockResolvedValue(false);

      const result = await todoUseCase.switchTodo('1');

      expect(result).toBe(false);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.switchTodo).not.toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo without calling callback', async () => {
      const result = await todoUseCase.deleteTodo('1');

      expect(result).toBe(true);
      expect(mockTodoRepository.deleteTodo).toHaveBeenCalledWith('1');
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('reorderTodos', () => {
    it('should reorder todos when callback succeeds', async () => {
      const data = [{ id: '1', text: 'Todo', completed: false }];
      mockCallback.mockResolvedValue(true);

      const result = await todoUseCase.reorderTodos(data);

      expect(result).toBe(true);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.reorderTodos).toHaveBeenCalledWith(data);
    });

    it('should not reorder todos when callback fails', async () => {
      const data = [{ id: '1', text: 'Todo', completed: false }];
      mockCallback.mockResolvedValue(false);

      const result = await todoUseCase.reorderTodos(data);

      expect(result).toBe(false);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.reorderTodos).not.toHaveBeenCalled();
    });
  });

  describe('updateTodo', () => {
    it('should update todo when callback succeeds', async () => {
      mockCallback.mockResolvedValue(true);

      const result = await todoUseCase.updateTodo('1', 'New text');

      expect(result).toBe(true);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.updateTodo).toHaveBeenCalledWith('1', 'New text');
    });

    it('should not update todo when callback fails', async () => {
      mockCallback.mockResolvedValue(false);

      const result = await todoUseCase.updateTodo('1', 'New text');

      expect(result).toBe(false);
      expect(mockCallback).toHaveBeenCalled();
      expect(mockTodoRepository.updateTodo).not.toHaveBeenCalled();
    });
  });
});
