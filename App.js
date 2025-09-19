import React from 'react';
import { View, ScrollView } from 'react-native';
import ChangeColorApp from './ChangeColorApp';
import CounterApp from './CounterApp';

export default function App() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <ChangeColorApp />
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <CounterApp />
      </View>
    </ScrollView>
  );
}