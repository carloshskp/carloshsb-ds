/**
 * Testes para o componente Stepper
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from '../components/ui/primitives/stepper';

describe('Stepper', () => {
  const defaultSteps = [
    { label: 'Passo 1' },
    { label: 'Passo 2' },
    { label: 'Passo 3' },
  ];

  it('renderiza corretamente', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} totalSteps={3} />);
    // Stepper mostra números, não labels de texto
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renderiza número correto de steps', () => {
    render(<Stepper steps={defaultSteps} currentStep={0} totalSteps={3} />);
    // Deve ter 3 números de steps
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('snapshot: primeiro passo', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} currentStep={0} totalSteps={3} />
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: segundo passo', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} currentStep={1} totalSteps={3} />
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: último passo (completo)', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} currentStep={2} totalSteps={3} />
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Orientação', () => {
    it('snapshot: orientação horizontal', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} currentStep={1} totalSteps={3} orientation="horizontal" />
      );
      expect(container).toMatchSnapshot();
    });

    it('snapshot: orientação vertical', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} currentStep={1} totalSteps={3} orientation="vertical" />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
