import * as Keychain from 'react-native-keychain';

type TokenType = 'accessToken' | 'refreshToken';

export function setSecureToken(value: string, key: TokenType) {
  return Keychain.setGenericPassword(key, value, {service: key});
}

export function setSecureTokens(accessToken: string, refreshToken: string) {
  return Promise.all([
    Keychain.setGenericPassword('accessToken', accessToken, {
      service: 'accessToken',
    }),
    Keychain.setGenericPassword('refreshToken', refreshToken, {
      service: 'refreshToken',
    }),
  ]);
}

export async function getSecureToken(key: TokenType) {
  const result = await Keychain.getGenericPassword({service: key});

  if (result) {
    return result.password;
  }
  return false;
}

export function removeSecureToken(key: TokenType) {
  return Keychain.resetGenericPassword({service: key});
}

export function removeAllSecureToken() {
  return Promise.all([
    Keychain.resetGenericPassword({service: 'accessToken'}),
    Keychain.resetGenericPassword({service: 'refreshToken'}),
  ]);
}
