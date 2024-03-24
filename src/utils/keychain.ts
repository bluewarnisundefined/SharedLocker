import * as Keychain from 'react-native-keychain';

type TokenType = 'accessToken' | 'refreshToken';

export function setSecureToken(value: string, key: TokenType) {
  console.log(`[setSecureToken] key: ${key}`);
  return Keychain.setGenericPassword(key, value, {service: key});
}

export function setSecureTokens(accessToken: string, refreshToken: string) {
  console.log(
    `[setSecureTokens] accessToken: ${accessToken}, refreshToken: ${refreshToken}`,
  );
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
  console.log(`[getSecureToken] key: ${key}`);
  const result = await Keychain.getGenericPassword({service: key});

  console.log('[getSecureToken] token: ', result);
  if (result) {
    return result.password;
  }
  return false;
}

export function removeSecureToken(key: TokenType) {
  console.log(`[removeSecureToken] key: ${key}`);
  return Keychain.resetGenericPassword({service: key});
}

export function removeAllSecureToken() {
  console.log('[removeAllSecureToken]');
  return Promise.all([
    Keychain.resetGenericPassword({service: 'accessToken'}),
    Keychain.resetGenericPassword({service: 'refreshToken'}),
  ]);
}
