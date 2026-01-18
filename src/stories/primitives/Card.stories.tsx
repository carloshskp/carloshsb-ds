import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, InteractiveCard } from '@/components/ui/primitives/card';
import { Heading, Paragraph, Text } from '@/components/ui/primitives/text';
import { Button } from '@/components/ui/primitives/button';
import { User, Briefcase, GraduationCap, Code, ArrowRight } from 'lucide-react';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de card com glassmorphism, variantes e sub-componentes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'review'],
      description: 'Variante visual do card',
    },
    withGradient: {
      control: 'boolean',
      description: 'Adiciona gradiente no topo do card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Card padrão com glassmorphism
 */
export const Default: Story = {
  args: {
    variant: 'default',
    withGradient: true,
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader icon={<User className="w-6 h-6" />}>
        <Heading as="h3" size="xl">Sobre</Heading>
      </CardHeader>
      <CardContent>
        <Paragraph>
          Este é um card padrão com glassmorphism e gradiente no topo.
        </Paragraph>
      </CardContent>
    </Card>
  ),
};

/**
 * Card de revisão usado em formulários
 */
export const Review: Story = {
  args: {
    variant: 'review',
  },
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader icon={<Briefcase className="w-5 h-5" />}>
        <Heading as="h4" size="lg">Informações de Contato</Heading>
      </CardHeader>
      <CardContent className="space-y-2">
        <Paragraph><Text className="font-medium">Nome:</Text> João Silva</Paragraph>
        <Paragraph><Text className="font-medium">E-mail:</Text> joao@email.com</Paragraph>
        <Paragraph><Text className="font-medium">Telefone:</Text> (11) 9 9999-9999</Paragraph>
      </CardContent>
    </Card>
  ),
};

/**
 * Card com footer
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader icon={<Code className="w-6 h-6" />}>
        <Heading as="h3" size="xl">Projeto</Heading>
      </CardHeader>
      <CardContent>
        <Paragraph>
          Descrição do projeto com mais detalhes sobre o que foi desenvolvido.
        </Paragraph>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">Ver Detalhes</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card sem gradiente
 */
export const NoGradient: Story = {
  args: {
    variant: 'default',
    withGradient: false,
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader icon={<User className="w-6 h-6" />}>
        <Heading as="h3" size="xl">Card Simples</Heading>
      </CardHeader>
      <CardContent>
        <Paragraph>
          Card sem o gradiente decorativo no topo.
        </Paragraph>
      </CardContent>
    </Card>
  ),
};

/**
 * Card interativo com flip animation
 */
export const Interactive: Story = {
  render: function InteractiveStory() {
    const [flipped, setFlipped] = useState(false);

    return (
      <div className="w-80">
        <InteractiveCard
          flipped={flipped}
          onFlip={() => {
            setFlipped(true);
            setTimeout(() => setFlipped(false), 2000);
          }}
          frontContent={
            <>
              <CardHeader icon={<Briefcase className="w-6 h-6" />}>
                <Heading as="h3" size="xl">Experiência</Heading>
              </CardHeader>
              <CardContent>
                <Paragraph size="sm" variant="muted">Clique para ver detalhes</Paragraph>
              </CardContent>
            </>
          }
          backContent={
            <>
              <ArrowRight className="w-16 h-16 text-emerald-500-alpha-80 animate-pulse mb-4" />
              <Text>Abrindo...</Text>
            </>
          }
          aria-label="Ver experiência profissional. Pressione Enter ou Espaço para abrir."
        />
      </div>
    );
  },
};

/**
 * Grid de cards interativos
 */
export const InteractiveGrid: Story = {
  render: function GridStory() {
    const cards = [
      { icon: Briefcase, title: 'Experiência', description: 'Ver histórico profissional' },
      { icon: GraduationCap, title: 'Formação', description: 'Ver formação acadêmica' },
      { icon: Code, title: 'Habilidades', description: 'Ver tecnologias' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {cards.map(({ icon: Icon, title, description }) => (
          <InteractiveCard
            key={title}
            onFlip={() => console.log(`Clicked ${title}`)}
            aria-label={`${description}. Pressione Enter ou Espaço para abrir.`}
          >
            <CardHeader icon={<Icon className="w-6 h-6" />}>
              <Heading as="h3" size="xl">{title}</Heading>
            </CardHeader>
            <CardContent>
              <Paragraph size="sm" variant="muted">Clique para ver detalhes</Paragraph>
            </CardContent>
          </InteractiveCard>
        ))}
      </div>
    );
  },
};

