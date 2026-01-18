/**
 * Testes para o componente Badge
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../components/ui/primitives/badge';

describe('Badge', () => {
  describe('Renderização', () => {
    it('renderiza corretamente', () => {
      render(<Badge>Tag</Badge>);
      expect(screen.getByText('Tag')).toBeInTheDocument();
    });

    it('renderiza como span', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge.tagName).toBe('SPAN');
    });
  });

  describe('Variantes', () => {
    it('snapshot: variante default', () => {
      const { container } = render(<Badge>Default</Badge>);
      expect(container).toMatchSnapshot();
    });

    it('snapshot: variante secondary', () => {
      const { container } = render(
        <Badge variant="accent">Secondary</Badge>
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: variante destructive', () => {
      const { container } = render(
        <Badge variant="muted">Destructive</Badge>
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: variante outline', () => {
      const { container } = render(
        <Badge variant="outline">Outline</Badge>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Classes customizadas', () => {
    it('aceita className', () => {
      render(<Badge className="my-badge">Custom</Badge>);
      expect(screen.getByText('Custom')).toHaveClass('my-badge');
    });
  });
});
