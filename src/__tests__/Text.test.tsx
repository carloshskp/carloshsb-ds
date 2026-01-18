/**
 * Testes para componentes de Text (Heading, Paragraph, Label, Text)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading, Paragraph, Label, Text } from '../components/ui/primitives/text';

describe('Heading', () => {
  describe('Níveis', () => {
    // Heading usa prop "as" para definir o nível, e h2 é o default
    it('renderiza h2 por padrão', () => {
      render(<Heading>Título</Heading>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renderiza h1 quando as="h1"', () => {
      render(<Heading as="h1">H1</Heading>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renderiza h3 quando as="h3"', () => {
      render(<Heading as="h3">H3</Heading>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renderiza h4 quando as="h4"', () => {
      render(<Heading as="h4">H4</Heading>);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('renderiza h5 quando as="h5"', () => {
      render(<Heading as="h5">H5</Heading>);
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    });

    it('renderiza h6 quando as="h6"', () => {
      render(<Heading as="h6">H6</Heading>);
      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });
  });

  describe('Snapshots', () => {
    it('snapshot: h2 padrão', () => {
      const { container } = render(<Heading>Heading H2</Heading>);
      expect(container).toMatchSnapshot();
    });

    it('snapshot: h1 com size', () => {
      const { container } = render(
        <Heading as="h1" size="lg">
          Heading H1 Large
        </Heading>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Classes customizadas', () => {
    it('aceita className', () => {
      render(<Heading className="custom">Test</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('custom');
    });
  });
});

describe('Paragraph', () => {
  it('renderiza elemento p', () => {
    render(<Paragraph>Parágrafo de texto</Paragraph>);
    const p = screen.getByText('Parágrafo de texto');
    expect(p.tagName).toBe('P');
  });

  it('snapshot: parágrafo padrão', () => {
    const { container } = render(
      <Paragraph>
        Este é um parágrafo de exemplo com texto normal.
      </Paragraph>
    );
    expect(container).toMatchSnapshot();
  });

  it('aceita className', () => {
    render(<Paragraph className="my-class">Test</Paragraph>);
    expect(screen.getByText('Test')).toHaveClass('my-class');
  });
});

describe('Label', () => {
  it('renderiza elemento label', () => {
    render(<Label>Campo</Label>);
    const label = screen.getByText('Campo');
    expect(label.tagName).toBe('LABEL');
  });

  it('aceita htmlFor', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
  });

  it('snapshot: label padrão', () => {
    const { container } = render(<Label>Campo obrigatório</Label>);
    expect(container).toMatchSnapshot();
  });
});

describe('Text', () => {
  it('renderiza span por padrão', () => {
    render(<Text>Texto inline</Text>);
    const text = screen.getByText('Texto inline');
    expect(text.tagName).toBe('SPAN');
  });

  it('aceita as="div"', () => {
    render(<Text as="div">Texto em div</Text>);
    const text = screen.getByText('Texto em div');
    expect(text.tagName).toBe('DIV');
  });

  it('aceita as="span"', () => {
    render(<Text as="span">Texto forte</Text>);
    const text = screen.getByText('Texto forte');
    expect(text.tagName).toBe('SPAN');
  });

  it('snapshot: text padrão', () => {
    const { container } = render(<Text>Texto simples</Text>);
    expect(container).toMatchSnapshot();
  });

  it('snapshot: text com variante', () => {
    const { container } = render(
      <Text variant="muted" size="sm">
        Texto secundário
      </Text>
    );
    expect(container).toMatchSnapshot();
  });
});
