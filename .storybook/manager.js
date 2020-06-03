import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const mveTheme = create({
  brandTitle: 'SoUse components',
  brandUrl: 'https://www.mavilleengagee.fr',
  brandImage: 'https://www.mavilleengagee.fr/assets/images/picto-collectivites.svg',
});

addons.setConfig({
  theme: mveTheme,
});