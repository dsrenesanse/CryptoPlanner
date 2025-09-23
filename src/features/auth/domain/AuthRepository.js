/**
 * @interface AuthRepository
 */
export class AuthRepository {
  /**
   * Triggers the local authentication process.
   * @returns {Promise<boolean>} A promise that resolves to true if authentication is successful, false otherwise.
   */
  authenticate() {
    throw new Error('Not implemented');
  }
}
