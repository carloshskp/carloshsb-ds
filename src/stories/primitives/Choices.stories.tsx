import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Checkbox, Radio } from '@/components/ui/primitives';

type CheckboxGroupProps = {
  options: { label: string; description?: string; value: string }[];
};

const CheckboxGroup = ({ options }: CheckboxGroupProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          description={option.description}
          checked={selected.includes(option.value)}
          onChange={() => toggle(option.value)}
        />
      ))}
    </div>
  );
};

type RadioGroupProps = {
  options: { label: string; description?: string; value: string }[];
};

const RadioGroup = ({ options }: RadioGroupProps) => {
  const [value, setValue] = useState(options[0]?.value);

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          description={option.description}
          checked={value === option.value}
          onChange={() => setValue(option.value)}
        />
      ))}
    </div>
  );
};

const meta = {
  title: 'Primitives/Checkbox & Radio',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkboxes e Radios estilizados com `accent-lime` e bordas translúcidas. Usam controle nativo + atributos ARIA herdados do `Field`.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxList: Story = {
  render: () => (
    <CheckboxGroup
      options={[
        { value: 'web', label: 'Aplicação Web', description: 'Front-end, SSR, Microsserviços' },
        { value: 'mobile', label: 'Aplicação Mobile' },
        { value: 'performance', label: 'Performance Audit', description: 'Core Web Vitals' },
      ]}
    />
  ),
};

export const RadioList: Story = {
  render: () => (
    <RadioGroup
      options={[
        { value: 'urgente', label: 'Urgente', description: 'Entrega em até 30 dias' },
        { value: 'curto', label: 'Curto prazo', description: '1 a 3 meses' },
        { value: 'medio', label: 'Médio prazo', description: '3 a 6 meses' },
      ]}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Mentoria" description="Opção temporariamente indisponível" disabled />
      <Radio label="Arquitetura" description="Use outra opção" disabled />
    </div>
  ),
};

