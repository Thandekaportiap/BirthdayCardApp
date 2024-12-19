import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CardEditor from '../../components/CardEdit';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Birthday Card Creator 🎉</Text>
      <CardEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b0082',
  },
});
