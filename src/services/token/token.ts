import {
  TokenCache,
  TokenStore,
  TokenCacheOptions
} from '@commercetools/sdk-client-v2';

export default class TokenHandle implements TokenCache {
  public myCache: TokenStore = {
    token: '',
    expirationTime: -1
  };

  public set(newCache: TokenStore): TokenStore {
    this.myCache = newCache;
    try {
      localStorage.setItem('access_token', JSON.stringify(newCache));
    } catch (error) {
      console.error('Error while setting token:', error);
    }
    return newCache;
  }

  public get(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    try {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        return JSON.parse(storedToken);
      }
    } catch (error) {
      console.error('Error while getting token:', error);
    }
    return this.myCache;
  }

  public removeToken(): void {
    try {
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error('Error while removing token:', error);
    }
  }
}
