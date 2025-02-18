import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock as any; 