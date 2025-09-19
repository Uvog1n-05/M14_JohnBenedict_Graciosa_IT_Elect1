import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim().length === 0) return;
    onSend(text);
    setText("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#0084ff",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  sendText: { color: "#fff", fontWeight: "bold" },
});