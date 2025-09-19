import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message }) {
  const isMe = message.sender === "Me";

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.myContainer : styles.theirContainer,
      ]}
    >
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
        <Text style={isMe ? styles.myText : styles.theirText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 5, marginHorizontal: 10, maxWidth: "75%" },
  myContainer: { alignSelf: "flex-end", alignItems: "flex-end" },
  theirContainer: { alignSelf: "flex-start", alignItems: "flex-start" },

  bubble: { padding: 10, borderRadius: 15 },
  myBubble: { backgroundColor: "#dcf8c6" }, 
  
  theirBubble: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" },

  myText: { color: "#000", fontSize: 16 },
  theirText: { color: "#000", fontSize: 16 },
});