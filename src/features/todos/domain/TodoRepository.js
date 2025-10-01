/**
 * @interface TodoRepository
 */
export class TodoRepository {
  /**
   * @returns {Promise<import('./Todo').Todo[]>}
   */
  async getTodos() {
    throw new Error('Not implemented');
  }

  /**
   * @param {import('./Todo').Todo} todo
   * @returns {Promise<void>}
   */
  async addTodo(todo) {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async switchTodo(id) {
    throw new Error('Not implemented');
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteTodo(id) {
    throw new Error('Not implemented');
  }

  /**
   * @param {import('./Todo').Todo[]} data
   * @returns {Promise<void>}
   */
  async reorderTodos(data) {
    throw new Error('Not implemented');
  }

  /**
   * Updates the text of a todo after confirming with the callback.
   * @param {string} id
   * @param {string} newText
   */
  async updateTodo(id, newText) {
    throw new Error('Not implemented');
  }
}
