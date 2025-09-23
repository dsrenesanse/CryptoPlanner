import { AuthRepositoryLocal } from '../../../../src/features/auth/data/AuthRepositoryLocal';
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication');

describe('AuthRepositoryLocal', () => {
  let authRepository;

  beforeEach(() => {
    authRepository = new AuthRepositoryLocal();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when authentication succeeds', async () => {
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const result = await authRepository.authenticate();

    expect(result).toBe(true);
    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
      promptMessage: 'Authenticate to access your TODO list',
    });
  });

  it('should return false when authentication fails', async () => {
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });

    const result = await authRepository.authenticate();

    expect(result).toBe(false);
    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
      promptMessage: 'Authenticate to access your TODO list',
    });
  });

  it('should return false when authentication throws an error', async () => {
    LocalAuthentication.authenticateAsync.mockRejectedValue(new Error('Auth error'));

    const result = await authRepository.authenticate();

    expect(result).toBe(false);
    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
      promptMessage: 'Authenticate to access your TODO list',
    });
  });
});
