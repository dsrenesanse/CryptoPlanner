import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../domain/Todo';
import { TodoRepository } from '../domain/TodoRepository';

const STORAGE_KEY = '@todos';

export class TodoRepositoryAsyncStorage extends TodoRepository {
  async getTodos() {
    const todosJson = await AsyncStorage.getItem(STORAGE_KEY);
    return todosJson
      ? JSON.parse(todosJson).map(t => new Todo(t.id, t.text, t.completed))
      : [];
  }

  async addTodo(todo) {
    const todos = await this.getTodos();
    const newTodos = [...todos, todo];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }

  async switchTodo(id) {
    const todos = await this.getTodos();
    const newTodos = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }

  async deleteTodo(id) {
    const todos = await this.getTodos();
    const newTodos = todos.filter(t => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }

  async reorderTodos(data) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async updateTodo(id, newText) {
    const todos = await this.getTodos();
    const newTodos = todos.map(t =>
      t.id === id ? { ...t, text: newText } : t,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }
}
