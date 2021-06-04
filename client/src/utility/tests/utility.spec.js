import {
  errorHandler,
  debugLog,
  timeoutPromise
} from '../utility';

test('timeoutPromise returns true after designated amount of time', async () => {
  expect(await timeoutPromise(1)).toBe(true);
});

test('debugLog successfully returned', () => {
  const originalLog = console.log;
  console.log = jest.fn();

  debugLog('test');

  expect(console.log).toHaveBeenCalledWith('test');

  console.log = originalLog;
});

describe('errorHandler successfully handles different types of errors and creates stack trace', () => {
  const originalLog = console.log;
  beforeEach(() => console.log = jest.fn());
  afterAll(() => console.log = originalLog);

  test('thrown string', () => {
    try {
      throw 'error';
    } catch (err) {
      expect(errorHandler({err: err, context: 'testing0', isLast: true})).toMatch(/=> testing0/);
    }
  });

  test('single-level function call error', () => {
    try {
      throw new Error('error');
    } catch (err) {
      expect(errorHandler({err: err, context: 'testing1', isLast: true})).toMatch(/=> testing1/);
    }
  });

  test('multi-level deep function call error', () => {
    try {
      try {
        throw new Error('error');
      } catch (err) {
        errorHandler({err: err, context: 'testing2+'});
      }
    } catch (err) {
      const errorOutput = errorHandler({err: err, context: 'testing2', isLast: true});
      expect(errorOutput).toMatch(/=> testing2\+/);
      expect(errorOutput).toMatch(/=> testing2/);
    }
  });

  test('error thrown by engine', () => {
    try {
      undefined.error;
    } catch (err) {
      expect(errorHandler({err: err, context: 'testing3', isLast: true})).toMatch(/=> testing3/);
    }
  });

  test('promise rejection error', async () => {
    const mockPromiseFn = () => {
      return new Promise((resolve, reject) => {
        try {
          throw new Error('error');
        } catch (err) {
          reject(errorHandler({err: err, context: 'testing4+', reject: true}));
        }
      });
    };

    try {
      await mockPromiseFn();
    } catch (err) {
      const errorOutput = errorHandler({err: err, context: 'testing4', isLast: true});
      expect(errorOutput).toMatch(/=> testing4\+/);
      expect(errorOutput).toMatch(/=> testing4/);
    }
  });


  test('imitate error on edge by removing .stack', () => {
    try {
      throw new Error('error');
    } catch (err) {
      delete err.stack;
      expect(errorHandler({err: err, context: 'testing5', isLast: true})).toMatch(/=> testing5/);
    }
  });

  test('imitate error through db error or otherwise unidentified', () => {
    try {
      throw new Error('error');
    } catch (err) {
      err = [
        [
          'error',
          'stack'
        ]
      ];
      expect(errorHandler({err: err, context: 'testing6', isLast: true})).toMatch(/=> testing6/);
    }
  });
});