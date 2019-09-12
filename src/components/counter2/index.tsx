import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface Props {
  color: string;
  value: number;
  onPress?: (p1: number, p2: Date) => void;
}

export default function Counter2({ color, value, onPress }: Props) {
  const onClick = () => {
    if (onPress) {
      onPress(value, new Date());
    }
  };

  const mergedStyle = [styles.container, { color }];
  return (
    <Text onPress={onClick} style={mergedStyle}>
      {value}
    </Text>
  );
}
