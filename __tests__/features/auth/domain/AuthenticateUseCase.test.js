import { AuthenticateUseCase } from '../../../../src/features/auth/domain/AuthenticateUseCase';

describe('AuthenticateUseCase', () => {
  let mockAuthRepository;
  let authenticateUseCase;

  beforeEach(() => {
    mockAuthRepository = {
      authenticate: jest.fn(),
    };
    authenticateUseCase = new AuthenticateUseCase(mockAuthRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call authenticate on the repository', async () => {
    mockAuthRepository.authenticate.mockResolvedValue(true);

    const result = await authenticateUseCase.execute();

    expect(mockAuthRepository.authenticate).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return false when repository authenticate returns false', async () => {
    mockAuthRepository.authenticate.mockResolvedValue(false);

    const result = await authenticateUseCase.execute();

    expect(result).toBe(false);
  });

  it('should propagate errors from repository', async () => {
    const error = new Error('Repository error');
    mockAuthRepository.authenticate.mockRejectedValue(error);

    await expect(authenticateUseCase.execute()).rejects.toThrow('Repository error');
  });
});
