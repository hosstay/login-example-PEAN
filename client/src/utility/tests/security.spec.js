import {
  encrypt,
  decrypt,
  sanitize,
  sanitizeLogin
} from '../security';

test('encrypts and decrypts the given data', () => {
  expect(decrypt(encrypt('test string'))).toBe('test string');
});

describe('sanitize should handle various strings given using or not using optional parameters', () => {
  test('word should be be encoded given no size requirements', () => {
    expect(sanitize('test?')).toBe('test%3F');
  });

  test('word should be be encoded given acceptable size requirements', () => {
    expect(sanitize('test?', 'fieldName', 2, 8)).toBe('test%3F');
  });

  test('no input should error', () => {
    expect(() => sanitize()).toThrow(Error);
  });

  test('not acceptable size requirements should error', () => {
    expect(() => sanitize('test', 'fieldName', 6, 8)).toThrow(Error);
  });
});

describe('sanitizeLogin should handle various strings given using or not using optional paramters', () => {
  const originalLog = console.log;
  beforeEach(() => console.log = jest.fn());
  afterAll(() => console.log = originalLog);

  test('word should come back encoded given applicable field and size requirements that the input passes', () => {
    expect(sanitizeLogin('personname', 'username', 6, 32)).toBe('personname');
    expect(sanitizeLogin('password1A?', 'password', 8, 18)).toBe('password1A%3F');
  });

  test('no input should error', () => {
    expect(() => sanitizeLogin()).toThrow(Error);
  });

  test('should throw error if correct field is not given or field is not username/passsword', () => {
    expect(() => sanitizeLogin('personname')).toThrow(Error);
  });

  test('should throw error if input doesn\'t pass regex for field', () => {
    expect(() => sanitizeLogin('%#$%#$%', 'username')).toThrow(Error);
  });

  test('not acceptable size requirements should error', () => {
    expect(() => sanitizeLogin('personname', 'username', 6, 8)).toThrow(Error);
  });
});