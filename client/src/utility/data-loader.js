import {json}         from 'aurelia-fetch-client';
import {errorHandler} from './utility';
import {decrypt}      from './security';

export class DataLoader {
  constructor() {
    this.cache = [];
  }

  addToCache(data, options) {
    const name = options.customCacheName === undefined ? options.endpoint : options.customCacheName;

    this.cache.push({
      name: name,
      data: data
    });
  }

  getCacheAtIndex(index) {
    return this.cache[index].data;
  }

  deleteCacheAtIndex(index) {
    this.cache.splice(index, 1);
  }

  findIndexInCache(options) {
    const list = this.cache;
    let index = -1;
    const endpoint = options.customCacheName === undefined ? options.endpoint : options.customCacheName;

    for (let i = 0; i < list.length; i++) {
      if (list[i].name === endpoint) {
        index = i;
        break;
      }
    }

    return index;
  }

  async fetch(options) {
    try {
      console.log('-------------------------');
      console.log('fetching...');
      console.log(options);

      const payload = options.payload ? options.payload : {};

      let response = await options.httpClient.fetch(options.prefix + options.endpoint, {
        method: 'post',
        body: json(payload)
      });
      let data = await response.json();

      // console.log('non-decrypted data');
      // console.log(data);

      data = decrypt(data);

      console.log('data');
      console.log(data);

      if (data.success) {
        console.log('success');

        if (options.useCache) {
          this.addToCache(data.result, options);
        }

        return data.result;
      } else {
        console.log('data.msg');
        console.log(data.msg);

        throw data.msg;
      }
    } catch (err) {
      return errorHandler({err: err, context: 'fetch'});
    }
  }

  async httpFetch(options) {

    try {
      let cacheIndex = -1;

      if (options.useCache) {
        cacheIndex = this.findIndexInCache(options);
      }

      if (cacheIndex > -1) {
        return this.getCacheAtIndex(cacheIndex);
      } else {
        return await this.fetch(options);
      }
    } catch (err) {
      return errorHandler({err: err, context: 'httpFetch'});
    }
  }
}
