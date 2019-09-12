import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    fontSize: 60,
  },
});

interface Props {
  color?: string;
  value: number;
}

export default function Counter(props: Props) {
  const [count, setCount] = useState(props.value);

  const onClickPress = () => {
    setCount(count + 1);
  };

  const mergedStyle = [styles.container, props && { color: props.color }];
  return (
    <Text onPress={onClickPress} style={mergedStyle}>
      {count}
    </Text>
  );
}
