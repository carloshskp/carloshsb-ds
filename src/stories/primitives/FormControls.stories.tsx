import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, Input, Textarea } from '@/components/ui/primitives';

type FormControlStoryProps = {
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
};

const FormControlCanvas = ({
  label,
  hint,
  error,
  placeholder,
  multiline,
}: FormControlStoryProps) => (
  <div className="max-w-xl space-y-6">
    <Field.Root label={label} hint={hint} error={error}>
      <Field.Control>
        {multiline ? (
          <Textarea placeholder={placeholder} invalid={Boolean(error)} />
        ) : (
          <Input placeholder={placeholder} invalid={Boolean(error)} />
        )}
      </Field.Control>
    </Field.Root>
  </div>
);

const meta = {
  title: 'Primitives/Input & Textarea',
  component: FormControlCanvas,
  tags: ['autodocs'],
  args: {
    label: 'Nome completo',
    hint: 'Use seu nome e sobrenome.',
    placeholder: 'Carlos Bernardes',
    multiline: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Inputs e Textareas reusáveis. Combine sempre com `Field.Root` para propagar labels, hints e mensagens de erro via ARIA.',
      },
    },
  },
} satisfies Meta<typeof FormControlCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputField: Story = {};

export const InputWithError: Story = {
  args: {
    error: 'Informe um nome com pelo menos 2 caracteres.',
  },
};

export const TextareaField: Story = {
  args: {
    label: 'Mensagem',
    placeholder: 'Conte mais detalhes sobre o projeto...',
    hint: 'Mínimo de 10 caracteres.',
    multiline: true,
  },
};

