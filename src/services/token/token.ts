import {
  TokenCache,
  TokenStore,
  TokenCacheOptions
} from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  public myCache: TokenStore = {
    token: '',
    expirationTime: -1
  };
  public set(newCache: TokenStore): TokenStore {
    this.myCache = newCache;
    localStorage.setItem('token', JSON.stringify(newCache.token));
    console.log('set token:', newCache.token);
    return newCache;
  }
  public get(tokenCacheOptions?: TokenCacheOptions): TokenStore {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      return JSON.parse(storedToken);
    }
    console.log('get token:', this.myCache.token);
    return this.myCache;
  }
}
