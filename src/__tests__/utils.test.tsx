/**
 * Testes para utilitários do Design System
 */
import { describe, it, expect } from 'vitest';
import { cn, filterDOMProps } from '../utils';

describe('cn (className utility)', () => {
  it('combina múltiplas classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('lida com valores condicionais', () => {
    expect(cn('base', 'active')).toBe('base active');
  });

  it('remove classes duplicadas (tailwind-merge)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('lida com arrays de classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('lida com objetos de classes', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('retorna string vazia para valores falsy', () => {
    expect(cn(null, undefined, false, '')).toBe('');
  });

  it('preserva ordem de classes conflitantes do Tailwind', () => {
    // tailwind-merge deve manter a última classe de conflito
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});

describe('filterDOMProps', () => {
  it('remove props inválidas para DOM', () => {
    const props = {
      variant: 'primary',
      size: 'md',
      className: 'test',
      onClick: () => {},
    };
    const filtered = filterDOMProps(props);
    expect(filtered).not.toHaveProperty('variant');
    expect(filtered).not.toHaveProperty('size');
    expect(filtered).toHaveProperty('className', 'test');
    expect(filtered).toHaveProperty('onClick');
  });

  it('preserva atributos aria-*', () => {
    const props = {
      'aria-label': 'Test',
      'aria-hidden': true,
      variant: 'primary',
    };
    const filtered = filterDOMProps(props);
    expect(filtered).toHaveProperty('aria-label', 'Test');
    expect(filtered).toHaveProperty('aria-hidden', true);
    expect(filtered).not.toHaveProperty('variant');
  });

  it('preserva atributos data-*', () => {
    const props = {
      'data-testid': 'test',
      'data-value': 123,
      isLoading: true,
    };
    const filtered = filterDOMProps(props);
    expect(filtered).toHaveProperty('data-testid', 'test');
    expect(filtered).toHaveProperty('data-value', 123);
    expect(filtered).not.toHaveProperty('isLoading');
  });

  it('remove props que começam com $ ou _', () => {
    const props = {
      $internal: 'value',
      _private: 'value',
      className: 'test',
    };
    const filtered = filterDOMProps(props);
    expect(filtered).not.toHaveProperty('$internal');
    expect(filtered).not.toHaveProperty('_private');
    expect(filtered).toHaveProperty('className');
  });

  it('remove props conhecidas como inválidas', () => {
    const props = {
      leftIcon: <span>icon</span>,
      rightIcon: <span>icon</span>,
      isLoading: true,
      invalid: true,
      id: 'test-id',
    };
    const filtered = filterDOMProps(props);
    expect(filtered).not.toHaveProperty('leftIcon');
    expect(filtered).not.toHaveProperty('rightIcon');
    expect(filtered).not.toHaveProperty('isLoading');
    expect(filtered).not.toHaveProperty('invalid');
    expect(filtered).toHaveProperty('id', 'test-id');
  });
});
