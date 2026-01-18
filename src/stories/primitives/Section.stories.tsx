import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, SectionHeader, SectionContent } from '@/components/ui/primitives/section';
import { Heading, Paragraph } from '@/components/ui/primitives/text';
import { Button } from '@/components/ui/primitives/button';
import { User, Sparkles, Zap, Globe, Shield, TrendingUp, ArrowRight } from 'lucide-react';

const meta = {
  title: 'Primitives/Section',
  component: Section,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de seção com glassmorphism e sub-componentes para header e conteúdo.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Variante visual da seção',
    },
    withGradient: {
      control: 'boolean',
      description: 'Adiciona linha gradiente no topo',
    },
    as: {
      control: 'select',
      options: ['section', 'div', 'article'],
      description: 'Elemento HTML a ser renderizado',
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Seção padrão com header e conteúdo
 */
export const Default: Story = {
  args: {
    variant: 'default',
    withGradient: true,
  },
  render: (args) => (
    <Section {...args} className="w-96">
      <SectionHeader icon={<User className="w-6 h-6" />}>
        <Heading as="h2" size="2xl">Sobre</Heading>
      </SectionHeader>
      <SectionContent>
        <Paragraph size="lg">
          Desempenho minha atuação sob a gerência de Produto e Serviços Digitais B2B, 
          integrando a Squad responsável pelo Portal Oi Soluções.
        </Paragraph>
      </SectionContent>
    </Section>
  ),
};

/**
 * Seção sem gradiente
 */
export const NoGradient: Story = {
  args: {
    variant: 'default',
    withGradient: false,
  },
  render: (args) => (
    <Section {...args} className="w-96">
      <SectionHeader icon={<User className="w-6 h-6" />}>
        <Heading as="h2" size="2xl">Seção Simples</Heading>
      </SectionHeader>
      <SectionContent>
        <Paragraph>
          Seção sem a linha gradiente decorativa no topo.
        </Paragraph>
      </SectionContent>
    </Section>
  ),
};

/**
 * Seção de consultoria com grid de serviços
 */
export const ConsultoriaSection: Story = {
  render: () => (
    <Section className="w-full max-w-2xl">
      <SectionHeader icon={<Sparkles className="w-6 h-6" />} size="lg">
        <Heading as="h2" size="2xl">Consultoria Web</Heading>
      </SectionHeader>
      <SectionContent>
        <Paragraph size="lg" className="mb-6">
          Ofereço serviços especializados de consultoria em desenvolvimento web, 
          focados em performance, arquitetura escalável e melhores práticas de mercado.
        </Paragraph>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { icon: Zap, title: 'Performance Web', desc: 'Otimização de carregamento, Core Web Vitals e melhoria de experiência do usuário.' },
            { icon: Globe, title: 'Arquitetura Moderna', desc: 'Design de sistemas escaláveis com tecnologias atuais e padrões de mercado.' },
            { icon: Shield, title: 'Segurança & Qualidade', desc: 'Implementação de práticas de segurança e garantia de qualidade de código.' },
            { icon: TrendingUp, title: 'Liderança Técnica', desc: 'Mentoria de equipes e direcionamento estratégico de projetos.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-lg">
              <Icon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <Heading as="h3" size="base" className="mb-1">{title}</Heading>
                <Paragraph size="sm" variant="muted">{desc}</Paragraph>
              </div>
            </div>
          ))}
        </div>
        <Button rightIcon={<ArrowRight className="w-5 h-5" />}>
          Solicitar Consultoria
        </Button>
      </SectionContent>
    </Section>
  ),
};

/**
 * Múltiplas seções empilhadas
 */
export const MultipleSections: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <Section>
        <SectionHeader icon={<User className="w-6 h-6" />}>
          <Heading as="h2" size="2xl">Seção 1</Heading>
        </SectionHeader>
        <SectionContent>
          <Paragraph>Primeira seção de conteúdo.</Paragraph>
        </SectionContent>
      </Section>
      
      <Section>
        <SectionHeader icon={<Sparkles className="w-6 h-6" />}>
          <Heading as="h2" size="2xl">Seção 2</Heading>
        </SectionHeader>
        <SectionContent>
          <Paragraph>Segunda seção de conteúdo.</Paragraph>
        </SectionContent>
      </Section>
    </div>
  ),
};

/**
 * Seção como article
 */
export const AsArticle: Story = {
  args: {
    as: 'article',
  },
  render: (args) => (
    <Section {...args} className="w-96">
      <SectionHeader>
        <Heading as="h2" size="2xl">Artigo</Heading>
      </SectionHeader>
      <SectionContent>
        <Paragraph>
          Esta seção é renderizada como um elemento &lt;article&gt; para melhor semântica.
        </Paragraph>
      </SectionContent>
    </Section>
  ),
};

