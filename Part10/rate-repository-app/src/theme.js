import { Platform } from 'react-native';

const theme = {
  palette: {
    dark: '#000000',
    light: '#ffffff',
    dull: '#aaaaaa',
    primary: '#0366d6',
    primary_light: '#42a5f5',
    secondary: '#ba68c8',
    mainBackground: '#e1e4e8',
    error: '#d32f2f',
    error_light: '#f8dddd',
  },
  fontSizes: {
    body: 14,
    subheading: 18,
    heading: 22,
    button: 22,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
