/**
 * Vitest Setup File
 * 
 * Configurações globais para testes do Design System.
 */
import '@testing-library/jest-dom/vitest';

// Configuração global para cleanup após cada teste
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
