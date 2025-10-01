export class TodoUseCase {
  /**
   * @param {import('./TodoRepository').TodoRepository} todoRepository
   * @param {() => Promise<boolean>} [callback] A callback that must return true to proceed with any operation.
   */
  constructor(todoRepository, authorize) {
    this.todoRepository = todoRepository;
    this.authorize = authorize;
  }

  /**
   * @returns {Promise<import('./Todo').Todo[]>}
   */
  async getTodos({ shouldProceedCheck = true }) {
    const shouldProceed = shouldProceedCheck ? await this.authorize() : true;
    if (shouldProceed) {
      return await this.todoRepository.getTodos();
    }
    return [];
  }

  /**
   * @returns {Promise<number>}
   */
  async getTodosCount() {
    const todos = await this.getTodos({ shouldProceedCheck: false });
    return todos.length;
  }

  /**
   * Adds a new todo after confirming with the callback.
   * @param {import('./Todo').Todo} todo
   */
  async addTodo(todo) {
    const shouldProceed = await this.authorize();
    if (shouldProceed) {
      await this.todoRepository.addTodo(todo);
    }
    return shouldProceed;
  }

  /**
   * Toggles the completion status of a todo after confirming with the callback.
   * @param {string} id
   */
  async switchTodo(id) {
    const shouldProceed = await this.authorize();
    if (shouldProceed) {
      await this.todoRepository.switchTodo(id);
    }
    return shouldProceed;
  }

  /**
   * Deletes a todo after confirming with the callback.
   * @param {string} id
   */
  async deleteTodo(id) {
    const shouldProceed = await this.authorize();
    if (shouldProceed) {
      await this.todoRepository.deleteTodo(id);
    }
    return shouldProceed;
  }

  /**
   * Reorders the todos after confirming with the callback.
   * @param {import('./Todo').Todo[]} data
   */
  async reorderTodos(data) {
    const todos = await this.getTodos({ shouldProceedCheck: false });
    const sameOrder = todos.every((todo, index) => todo.id === data[index].id);
    if (sameOrder) {
      return true;
    }
    const shouldProceed = await this.authorize();
    if (shouldProceed) {
      await this.todoRepository.reorderTodos(data);
    }
    return shouldProceed;
  }

  /**
   * Updates the text of a todo after confirming with the callback.
   * @param {string} id
   * @param {string} newText
   */
  async updateTodo(id, newText) {
    const shouldProceed = await this.authorize();
    if (shouldProceed) {
      await this.todoRepository.updateTodo(id, newText);
    }
    return shouldProceed;
  }
}
