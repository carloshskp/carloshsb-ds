import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/styles/index.css';
import '../src/styles/a11y.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1a1a1a',  // Cor escura consistente com o tema
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    docs: {
      theme: themes.dark,
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    backgrounds: 'dark',
  },
};

export default preview;
