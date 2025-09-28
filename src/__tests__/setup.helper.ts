import '@testing-library/jest-dom';

// Set default test environment
process.env.NODE_ENV = 'test';

// Polyfill for jsdom
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });
