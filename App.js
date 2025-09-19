import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import CommentItem from "./CommentItem";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("chat"); 

  const handleSendChat = (text) => {
    if (!text.trim()) return;

    const myMessage = {
      id: Date.now().toString(),
      text,
      sender: "Me",
    };
    setMessages((prev) => [myMessage, ...prev]);

    
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: "Mom: " + text,
        sender: "Auxillo john",
      };
      setMessages((prev) => [reply, ...prev]);
    }, 1000);
  };

  const handleSendComment = (text) => {
    if (!text.trim()) return;
    const newComment = { id: Date.now().toString(), text, user: "You" };
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "chat" && styles.activeTab]}
          onPress={() => setActiveTab("chat")}
        >
          <Text style={styles.tabText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "post" && styles.activeTab]}
          onPress={() => setActiveTab("post")}
        >
          <Text style={styles.tabText}>Post</Text>
        </TouchableOpacity>
      </View>

      {}
      {activeTab === "chat" ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Mom</Text>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            inverted
            contentContainerStyle={{ paddingBottom: 10 }}
          />
          <ChatInput onSend={handleSendChat} />
        </>
      ) : (
        <>
          {}
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>👤</Text>
              <View>
                <Text style={styles.postAuthor}>John</Text>
                <Text style={styles.postTime}>2 hrs ago</Text>
              </View>
            </View>
            <Text style={styles.postText}>
              Wow 😍🔥
            </Text>
            <View style={styles.postImagePlaceholder}>
              <Text style={styles.placeholderText}> Wow nga picture 🔥 </Text>
            </View>
          </View>

          {/* Comments */}
          <Text style={styles.commentHeader}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CommentItem comment={item} />}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
          <ChatInput onSend={handleSendComment} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  // Tabs
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
  },
  activeTab: { backgroundColor: "lightblue" },
  tabText: { fontSize: 16, fontWeight: "bold" },

  // Chat Header
  header: {
    padding: 15,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Post
  postContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { fontSize: 28, marginRight: 10 },
  postAuthor: { fontWeight: "bold", fontSize: 15 },
  postTime: { color: "lightblue", fontSize: 12 },
  postText: { fontSize: 16, marginBottom: 10 },
  postImagePlaceholder: {
    backgroundColor: "#e5e5e5",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { color: "lightblue" },

  // Comments
  commentHeader: {
    marginLeft: 12,
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});