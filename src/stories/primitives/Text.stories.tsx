import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading, Paragraph, Label, Text } from '@/components/ui/primitives/text';

const headingMeta = {
  title: 'Primitives/Text/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children: 'Título de Exemplo',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente para títulos e cabeçalhos (h1-h6). Usa tamanhos padrão baseados no nível, mas pode ser sobrescrito com a prop `size`.',
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default headingMeta;
type HeadingStory = StoryObj<typeof headingMeta>;

export const Default: HeadingStory = {
  args: {
    as: 'h2',
  },
};

export const AllLevels: HeadingStory = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h1">Heading 1 (4xl)</Heading>
      <Heading as="h2">Heading 2 (3xl)</Heading>
      <Heading as="h3">Heading 3 (2xl)</Heading>
      <Heading as="h4">Heading 4 (xl)</Heading>
      <Heading as="h5">Heading 5 (lg)</Heading>
      <Heading as="h6">Heading 6 (base)</Heading>
    </div>
  ),
};

export const Variants: HeadingStory = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h2" variant="default">Default (foreground)</Heading>
      <Heading as="h2" variant="accent">Accent (lime)</Heading>
      <Heading as="h2" variant="muted">Muted (muted-foreground)</Heading>
    </div>
  ),
};

export const CustomSizes: HeadingStory = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h2" size="xs">Extra Small (xs)</Heading>
      <Heading as="h2" size="sm">Small (sm)</Heading>
      <Heading as="h2" size="base">Base (base)</Heading>
      <Heading as="h2" size="lg">Large (lg)</Heading>
      <Heading as="h2" size="xl">Extra Large (xl)</Heading>
      <Heading as="h2" size="2xl">2XL</Heading>
      <Heading as="h2" size="3xl">3XL</Heading>
      <Heading as="h2" size="4xl">4XL</Heading>
    </div>
  ),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const paragraphMeta = {
  title: 'Primitives/Text/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  args: {
    children: 'Este é um parágrafo de exemplo com texto suficiente para demonstrar o comportamento do componente em diferentes contextos.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente para parágrafos de texto. Suporta diferentes tamanhos e variantes de cor.',
      },
    },
  },
} satisfies Meta<typeof Paragraph>;

type ParagraphMeta = typeof paragraphMeta;

export const ParagraphDefault: StoryObj<ParagraphMeta> = {};

export const ParagraphSizes: StoryObj<ParagraphMeta> = {
  render: () => (
    <div className="space-y-4">
      <Paragraph size="xs">
        Texto extra pequeno (xs). Ideal para notas e informações secundárias.
      </Paragraph>
      <Paragraph size="sm">
        Texto pequeno (sm). Útil para descrições e textos de apoio.
      </Paragraph>
      <Paragraph size="base">
        Texto padrão (base). Tamanho padrão para parágrafos de conteúdo.
      </Paragraph>
      <Paragraph size="lg">
        Texto grande (lg). Para destacar informações importantes ou criar hierarquia visual.
      </Paragraph>
    </div>
  ),
};

export const ParagraphVariants: StoryObj<ParagraphMeta> = {
  render: () => (
    <div className="space-y-4">
      <Paragraph variant="default">
        Parágrafo com variante padrão (foreground).
      </Paragraph>
      <Paragraph variant="muted">
        Parágrafo com variante muted para texto secundário.
      </Paragraph>
      <Paragraph variant="accent">
        Parágrafo com variante accent para destacar informações importantes.
      </Paragraph>
    </div>
  ),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const labelMeta = {
  title: 'Primitives/Text/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label de Exemplo',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente para labels de formulários. Suporta campos obrigatórios com asterisco automático.',
      },
    },
  },
} satisfies Meta<typeof Label>;

type LabelMeta = typeof labelMeta;

export const LabelDefault: StoryObj<LabelMeta> = {};

export const LabelRequired: StoryObj<LabelMeta> = {
  args: {
    required: true,
    children: 'Campo Obrigatório',
  },
};

export const LabelSizes: StoryObj<LabelMeta> = {
  render: () => (
    <div className="space-y-4">
      <Label size="xs" htmlFor="field-xs">Label Extra Pequeno (xs)</Label>
      <Label size="sm" htmlFor="field-sm">Label Pequeno (sm)</Label>
      <Label size="base" htmlFor="field-base">Label Padrão (base)</Label>
    </div>
  ),
};

export const LabelVariants: StoryObj<LabelMeta> = {
  render: () => (
    <div className="space-y-4">
      <Label variant="default" htmlFor="field-default">Label Padrão</Label>
      <Label variant="muted" htmlFor="field-muted">Label Muted</Label>
      <Label variant="required" required htmlFor="field-required">
        Label Obrigatório
      </Label>
    </div>
  ),
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textMeta = {
  title: 'Primitives/Text/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Texto de exemplo',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente genérico para texto inline ou em blocos. Permite escolher o elemento HTML através da prop `as`.',
      },
    },
  },
} satisfies Meta<typeof Text>;

type TextMeta = typeof textMeta;

export const TextDefault: StoryObj<TextMeta> = {};

export const TextElements: StoryObj<TextMeta> = {
  render: () => (
    <div className="space-y-4">
      <Text as="span">Texto como span (inline)</Text>
      <Text as="div">Texto como div (bloco)</Text>
      <Text as="p">Texto como parágrafo</Text>
    </div>
  ),
};

export const TextVariants: StoryObj<TextMeta> = {
  render: () => (
    <div className="space-y-4">
      <Text variant="default">Texto padrão</Text>
      <Text variant="muted">Texto muted</Text>
      <Text variant="accent">Texto accent</Text>
      <Text variant="destructive">Texto destructive (erro)</Text>
    </div>
  ),
};

export const TextSizes: StoryObj<TextMeta> = {
  render: () => (
    <div className="space-y-4">
      <Text size="xs">Texto extra pequeno (xs)</Text>
      <Text size="sm">Texto pequeno (sm)</Text>
      <Text size="base">Texto padrão (base)</Text>
      <Text size="lg">Texto grande (lg)</Text>
    </div>
  ),
};

export const TextCombinations: StoryObj<TextMeta> = {
  render: () => (
    <div className="space-y-4 p-4 bg-surface rounded-md">
      <Heading as="h2" variant="accent">Título com Heading</Heading>
      <Paragraph variant="muted">
        Parágrafo de introdução usando o componente Paragraph.
      </Paragraph>
      <div className="space-y-2">
        <Label htmlFor="example" required>
          Campo de Exemplo
        </Label>
        <Text as="div" size="sm" variant="muted">
          Texto de ajuda usando o componente Text.
        </Text>
      </div>
    </div>
  ),
};
