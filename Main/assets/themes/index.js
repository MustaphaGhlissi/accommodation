import { configureFonts, DefaultTheme } from "react-native-paper";


export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#355070',
      accent: '#9EBD6E',
      success: '#9EBD6E',
      error: '#E56B6F',
      warning: '#EAAC8B'
    },
    fonts: configureFonts({
        ios: {
            regular: {
              fontFamily: 'Roboto-Regular',
              fontWeight: 'normal',
            },
            medium: {
              fontFamily: 'Roboto-Medium',
              fontWeight: 'normal',
            },
            light: {
              fontFamily: 'Roboto-Light',
              fontWeight: 'normal',
            },
            thin: {
              fontFamily: 'Roboto-Thin',
              fontWeight: 'normal',
            },
        },
        android: {
            regular: {
                fontFamily: 'Roboto-Regular',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'Roboto-Medium',
                fontWeight: 'normal',
            },
            light: {
                fontFamily: 'Roboto-Light',
                fontWeight: 'normal',
            },
            thin: {
                fontFamily: 'Roboto-Thin',
                fontWeight: 'normal',
            },
        }
    })
};
