export class AuthenticateUseCase {
  /**
   * @param {import('./AuthRepository').default} authRepository
   */
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Executes the authentication use case.
   * @returns {Promise<boolean>} A promise that resolves to true if authentication is successful, false otherwise.
   */
  execute() {
    return this.authRepository.authenticate();
  }
}
