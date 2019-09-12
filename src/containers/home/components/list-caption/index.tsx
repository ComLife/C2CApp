import React, { Fragment, memo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  text: string;
}

const ListCaption = memo(({ text }: Props) => {
  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
      <View style={styles.line} />
    </Fragment>
  );
});

export default ListCaption;
