import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Theme from "./theme";

const HomeScreen = ({ user, onLogout, onOpenChat, onOpenProfile }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          {user.profile_picture ? (
            <Image source={{ uri: user.profile_picture }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{user.username?.[0]?.toUpperCase()}</Text>
            </View>
          )}

          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.usernameText}>{user.username}</Text>
            
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{user.id}</Text>
          </View>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.chatButton} onPress={onOpenChat}>
            <Text style={styles.chatButtonText}>💬 Open Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton} onPress={onOpenProfile}>
            <Text style={styles.profileButtonText}>👤 Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  content: {
    flex: 1,
    padding: 22,
    justifyContent: "flex-start",
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 6,
  },
  headerText: {
    marginLeft: 14,
  },
  welcomeText: {
    fontSize: Theme.Typography.h1,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: Theme.Typography.h3,
    color: Theme.Colors.primaryDark,
    fontWeight: Theme.Typography.weightSemibold,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Theme.Colors.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 32,
    color: Theme.Colors.primaryDark,
    fontWeight: Theme.Typography.weightBold,
  },
  subtitle: {
    fontSize: Theme.Typography.small,
    color: Theme.Colors.muted,
    marginTop: 6,
  },
  profileButton: {
    backgroundColor: Theme.Colors.accent,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: Theme.Colors.card,
    borderRadius: Theme.Metrics.radius,
    padding: 18,
    marginBottom: 24,
    ...Theme.Shadows,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.border,
  },
  label: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.muted,
    fontWeight: Theme.Typography.weightSemibold,
  },
  value: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.text,
    fontWeight: Theme.Typography.weightSemibold,
  },
  chatButton: {
    backgroundColor: Theme.Colors.primary,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 0,
    flex: 1,
    marginRight: 8,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightBold,
  },
  logoutButton: {
    backgroundColor: Theme.Colors.danger,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
  },
  label: {
    fontSize: Theme.Typography.small,
    color: Theme.Colors.muted,
    fontWeight: Theme.Typography.weightSemibold,
  },
  value: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.text,
    fontWeight: Theme.Typography.weightSemibold,
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  chatButton: {
    backgroundColor: Theme.Colors.primary,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
    ...Theme.Shadows,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightBold,
  },
  profileButton: {
    backgroundColor: Theme.Colors.accent,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
    ...Theme.Shadows,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightBold,
  },
  logoutButton: {
    backgroundColor: Theme.Colors.danger,
    padding: 12,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 6,
    ...Theme.Shadows,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightSemibold,
  },
});

export default HomeScreen;
