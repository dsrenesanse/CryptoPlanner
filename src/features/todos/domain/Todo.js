export class Todo {
  /**
   * @param {string} id
   * @param {string} text
   * @param {boolean} completed
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}
