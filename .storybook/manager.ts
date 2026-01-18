import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { themes } from '@storybook/theming';

const customTheme = create({
  ...themes.dark,
  brandTitle: '@carloshb/ds Storybook',
  brandUrl: './',
  brandTarget: '_self',
});

addons.setConfig({
  theme: customTheme,
  toolbar: {
    eject: { hidden: true },      // Desabilita botão de exportar código
    copy: { hidden: true },       // Desabilita botão de copiar código
  },
});
