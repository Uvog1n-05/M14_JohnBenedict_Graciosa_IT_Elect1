
import React, { useState } from 'react';
import { View, Button, StyleSheet ,Text} from 'react-native';

export default function ChangeColorApp() {
  const [bgColor, setBgColor] = useState('gray'); 

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
     
      <Button title="White" onPress={() => setBgColor("White")} />
      <Button title="Light Blue" onPress={() => setBgColor('lightblue')} />
      <Button title="Light Green" onPress={() => setBgColor('#90ee90')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10,paddingBottom:120,paddingTop:100,borderRadius:10 ,margin:50},
  title: { fontSize: 40, fontWeight: 'bold', marginBottom: 20 ,paddingTop:40,borderRadius:10},
});