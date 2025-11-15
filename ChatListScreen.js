import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import { getChatUsers, getUnreadCount } from "./database";
import Theme from "./theme";

const ChatListScreen = ({ currentUser, onSelectUser, onBack }) => {
  const [users, setUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUsers();
    loadUnreadCount();
  }, []);

  const loadUsers = async () => {
    const userList = await getChatUsers(currentUser.id);
    setUsers(userList);
  };

  const loadUnreadCount = async () => {
    const count = await getUnreadCount(currentUser.id);
    setUnreadCount(count);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    await loadUnreadCount();
    setRefreshing(false);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => onSelectUser(item)}
    >
      {item.profile_picture ? (
        <Image source={{ uri: item.profile_picture }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.username.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users available to chat</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Theme.Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.border,
    ...Theme.Shadows,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: Theme.Colors.primary,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: Theme.Typography.h2,
    fontWeight: Theme.Typography.weightBold,
    flex: 1,
  },
  badge: {
    backgroundColor: Theme.Colors.danger,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  listContent: {
    padding: 12,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.Colors.card,
    padding: 16,
    marginBottom: 10,
    borderRadius: Theme.Metrics.radius,
    ...Theme.Shadows,
  },
  avatar: {
    width: Theme.Metrics.avatarMedium,
    height: Theme.Metrics.avatarMedium,
    borderRadius: Theme.Metrics.avatarMedium / 2,
    backgroundColor: Theme.Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    resizeMode: 'cover',
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: Theme.Typography.weightBold,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Theme.Colors.muted,
  },
  arrow: {
    fontSize: 24,
    color: Theme.Colors.border,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.Colors.muted,
  },
});

export default ChatListScreen;
