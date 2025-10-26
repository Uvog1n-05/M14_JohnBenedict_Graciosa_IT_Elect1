import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MessageBubble = () => {
  const myAvatar = require('./assets/john.jpg');
  const theirAvatar = require('./assets/yeah.jpg');

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey! How are you?',
      type: 'text',
      sender: 'other',
      name: 'Yeah',
      avatar: theirAvatar,
    },
  ]);

  const [input, setInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Your message
    const newMsg = {
      id: Date.now().toString(),
      text: input,
      type: 'text',
      sender: 'me',
      name: 'John',
      avatar: myAvatar,
      reply: replyingTo,
    };

    setMessages([newMsg, ...messages]);
    setInput('');
    setReplyingTo(null);

    // 🔹 Auto reply only when message is "hi there"
    if (input.trim().toLowerCase() === 'hi there') {
      setTimeout(() => {
        const autoReply = {
          id: (Date.now() + 1).toString(),
          text: 'Hey John 👋, what’s up?',
          type: 'text',
          sender: 'other',
          name: 'Yeah',
          avatar: theirAvatar,
        };
        setMessages((prev) => [autoReply, ...prev]);
      }, 1000); // 1 second delay to simulate response
    }
  };

  const sendImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newMsg = {
        id: Date.now().toString(),
        image: result.assets[0].uri,
        type: 'image',
        sender: 'me',
        name: 'John',
        avatar: myAvatar,
        reply: replyingTo,
      };
      setMessages([newMsg, ...messages]);
      setReplyingTo(null);
    }
  };

  const renderMessage = ({ item, index }) => {
    const showName =
      item.sender === 'other' &&
      (index === messages.length - 1 || messages[index + 1].sender !== 'other');

    return (
      <View
        style={[
          styles.messageRow,
          item.sender === 'me' ? styles.myRow : styles.theirRow,
        ]}
      >
        {item.sender === 'other' && (
          <Image source={item.avatar} style={styles.avatar} />
        )}

        <View>
          {showName && <Text style={styles.nameText}>{item.name}</Text>}

          <View
            style={[
              styles.messageContainer,
              item.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}
          >
            {item.reply && (
              <View style={styles.replyBox}>
                <Text style={styles.replyText}>
                  Replying to: {item.reply.text || 'Photo'}
                </Text>
              </View>
            )}

            {item.type === 'text' ? (
              <Text
                style={[
                  styles.messageText,
                  item.sender === 'me' && { color: '#fff' },
                ]}
              >
                {item.text}
              </Text>
            ) : (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}

            <TouchableOpacity onPress={() => setReplyingTo(item)}>
              <Text style={styles.replyBtn}>↩️ Reply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {item.sender === 'me' && (
          <Image source={item.avatar} style={styles.avatar} />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f2f2f2' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={theirAvatar} style={styles.headerAvatar} />
        <Text style={styles.headerName}>Yeah</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Replying Bar */}
      {replyingTo && (
        <View style={styles.replyingBar}>
          <Text style={{ color: '#333', flex: 1 }}>
            Replying to: {replyingTo.text || 'Photo'}
          </Text>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <Text style={{ color: 'red' }}>✖</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputBar}>
        <TouchableOpacity onPress={sendImage}>
          <Text style={styles.addBtn}>📷</Text>
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendBtn}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    elevation: 2,
  },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerName: { fontSize: 18, fontWeight: '600', color: '#000' },

  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 6 },
  myRow: { justifyContent: 'flex-end' },
  theirRow: { justifyContent: 'flex-start' },

  nameText: { fontSize: 13, color: '#555', marginLeft: 50, marginBottom: 3 },
  messageContainer: { maxWidth: '70%', borderRadius: 16, padding: 10 },
  myMessage: { backgroundColor: '#0084ff', marginLeft: 10 },
  theirMessage: { backgroundColor: '#e5e5ea', marginRight: 10 },
  messageText: { color: '#000', fontSize: 16 },
  messageImage: { width: 180, height: 180, borderRadius: 8 },
  replyBtn: { fontSize: 12, color: '#ccc', marginTop: 4 },
  replyBox: { borderLeftWidth: 3, borderLeftColor: '#ccc', paddingLeft: 5 },
  replyText: { fontSize: 12, color: '#333' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginHorizontal: 4 },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addBtn: { fontSize: 24, marginRight: 8 },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 20,
  },
  sendBtn: { fontSize: 20, marginLeft: 8, color: '#0084ff' },
  replyingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#e6e6e6',
  },
});
