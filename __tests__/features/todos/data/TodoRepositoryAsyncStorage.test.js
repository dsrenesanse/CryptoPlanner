import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoRepositoryAsyncStorage } from '../../../../src/features/todos/data/TodoRepositoryAsyncStorage';
import { Todo } from '../../../../src/features/todos/domain/Todo';

jest.mock('@react-native-async-storage/async-storage');

describe('TodoRepositoryAsyncStorage', () => {
  let repository;

  beforeEach(() => {
    repository = new TodoRepositoryAsyncStorage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return empty array when no todos stored', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const todos = await repository.getTodos();

      expect(todos).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@todos');
    });

    it('should return parsed todos from storage', async () => {
      const storedTodos = [
        { id: '1', text: 'Test todo', completed: false },
        { id: '2', text: 'Another todo', completed: true },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(storedTodos));

      const todos = await repository.getTodos();

      expect(todos).toEqual([
        new Todo('1', 'Test todo', false),
        new Todo('2', 'Another todo', true),
      ]);
    });
  });

  describe('addTodo', () => {
    it('should add todo to existing todos', async () => {
      const existingTodos = [{ id: '1', text: 'Existing', completed: false }];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingTodos));

      const newTodo = new Todo('2', 'New todo', false);
      await repository.addTodo(newTodo);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([...existingTodos, { id: '2', text: 'New todo', completed: false }])
      );
    });

    it('should add todo when no existing todos', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);

      const newTodo = new Todo('1', 'First todo', false);
      await repository.addTodo(newTodo);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([{ id: '1', text: 'First todo', completed: false }])
      );
    });
  });

  describe('switchTodo', () => {
    it('should toggle completed status of todo', async () => {
      const todos = [
        { id: '1', text: 'Todo 1', completed: false },
        { id: '2', text: 'Todo 2', completed: true },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(todos));

      await repository.switchTodo('1');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([
          { id: '1', text: 'Todo 1', completed: true },
          { id: '2', text: 'Todo 2', completed: true },
        ])
      );
    });
  });

  describe('deleteTodo', () => {
    it('should remove todo by id', async () => {
      const todos = [
        { id: '1', text: 'Todo 1', completed: false },
        { id: '2', text: 'Todo 2', completed: true },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(todos));

      await repository.deleteTodo('1');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([{ id: '2', text: 'Todo 2', completed: true }])
      );
    });
  });

  describe('reorderTodos', () => {
    it('should save reordered todos', async () => {
      const reorderedTodos = [
        { id: '2', text: 'Todo 2', completed: true },
        { id: '1', text: 'Todo 1', completed: false },
      ];

      await repository.reorderTodos(reorderedTodos);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify(reorderedTodos)
      );
    });
  });

  describe('updateTodo', () => {
    it('should update todo text', async () => {
      const todos = [
        { id: '1', text: 'Old text', completed: false },
        { id: '2', text: 'Todo 2', completed: true },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(todos));

      await repository.updateTodo('1', 'New text');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([
          { id: '1', text: 'New text', completed: false },
          { id: '2', text: 'Todo 2', completed: true },
        ])
      );
    });
  });
});
