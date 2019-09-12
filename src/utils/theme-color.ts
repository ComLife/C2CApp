import React from 'react';
import Colors from '../const/colors';

export const ThemeSet = {
  white: {
    textColor: Colors.colorB1,
    backColor: Colors.whiteColor,
  },
  black: {
    textColor: Colors.whiteColor,
    backColor: Colors.colorB1,
  },
};

export const ThemeContext = React.createContext('white');
