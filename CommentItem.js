import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CommentItem({ comment }) {
  const isYou = comment.user === "You";

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.avatar}>{isYou ? "🧑" : "👤"}</Text>
      <View style={styles.commentBox}>
        <Text style={styles.user}>{comment.user}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 8,
  },
  avatar: { fontSize: 20, marginRight: 8 },
  commentBox: {
    backgroundColor: "#f0f2f5",
    padding: 8,
    borderRadius: 10,
    flexShrink: 1,
    
    
  },
  user: { fontWeight: "bold", marginBottom: 3 },
  commentText: { fontSize: 14, color: "#333" },
});