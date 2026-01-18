/**
 * Testes para o componente Card
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/primitives/card';

describe('Card', () => {
  describe('Renderização básica', () => {
    it('renderiza corretamente', () => {
      render(<Card data-testid="card">Conteúdo</Card>);
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('renderiza children', () => {
      render(<Card>Conteúdo do card</Card>);
      expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
    });

    it('snapshot: card básico', () => {
      const { container } = render(<Card>Card simples</Card>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Variantes', () => {
    it('snapshot: variante default', () => {
      const { container } = render(
        <Card variant="default">Default Card</Card>
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: variante outline', () => {
      const { container } = render(
        <Card variant="interactive">Outline Card</Card>
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: variante ghost', () => {
      const { container } = render(
        <Card variant="review">Ghost Card</Card>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Composição', () => {
    it('renderiza com header, content e footer', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('snapshot: card completo', () => {
      const { container } = render(
        <Card>
          <CardHeader>Título do Card</CardHeader>
          <CardContent>
            Este é o conteúdo principal do card.
          </CardContent>
          <CardFooter>Ações do card</CardFooter>
        </Card>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Classes customizadas', () => {
    it('aceita className no Card', () => {
      render(<Card data-testid="custom-card" className="custom-card">Test</Card>);
      expect(screen.getByTestId('custom-card')).toHaveClass('custom-card');
    });

    it('aceita className no CardHeader', () => {
      render(
        <Card>
          <CardHeader className="custom-header">Header</CardHeader>
        </Card>
      );
      expect(screen.getByText('Header')).toHaveClass('custom-header');
    });
  });
});

describe('CardHeader', () => {
  it('renderiza corretamente', () => {
    render(
      <Card>
        <CardHeader>Header Text</CardHeader>
      </Card>
    );
    expect(screen.getByText('Header Text')).toBeInTheDocument();
  });

  it('snapshot: header isolado', () => {
    const { container } = render(
      <Card>
        <CardHeader>Card Header</CardHeader>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('CardContent', () => {
  it('renderiza corretamente', () => {
    render(
      <Card>
        <CardContent>Content Text</CardContent>
      </Card>
    );
    expect(screen.getByText('Content Text')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('renderiza corretamente', () => {
    render(
      <Card>
        <CardFooter>Footer Text</CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer Text')).toBeInTheDocument();
  });
});
