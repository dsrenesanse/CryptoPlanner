import * as LocalAuthentication from 'expo-local-authentication';
import { AuthRepository } from '../domain/AuthRepository';

export class AuthRepositoryLocal extends AuthRepository {
  /**
   * Triggers the local authentication process using the device's biometrics.
   * @returns {Promise<boolean>} A promise that resolves to true if authentication is successful, false otherwise.
   */
  async authenticate() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        console.log('No biometric hardware available');
        return false;
      }
      await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your TODO list',
      });
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }
}
