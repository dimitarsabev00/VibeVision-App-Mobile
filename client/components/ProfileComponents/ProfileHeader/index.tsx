import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { buttonStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../configs/firebase";
import { Feather } from "@expo/vector-icons";
import { useFollowingMutation } from "../../../hooks/useFollowingMutation";
import { useFollowing } from "../../../hooks/useFollowing";

const ProfileHeader = ({ user }) => {
  const navigation = useNavigation();

  const isFollowing = useFollowing(auth.currentUser?.uid, user.uid).data;
  const isFollowingMutation = useFollowingMutation();

  const renderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedButton}
            onPress={() =>
              navigation.navigate("chatDetails", { contactId: user.uid })
            }
          >
            <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedIconButton}
            onPress={() =>
              isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })
            }
          >
            <Feather name="user-check" size={20} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={buttonStyles.filledButton}
          onPress={() =>
            isFollowingMutation.mutate({ otherUserId: user.uid, isFollowing })
          }
        >
          <Text style={buttonStyles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon={"account"} />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>

      {auth.currentUser?.uid === user.uid ? (
        <TouchableOpacity
          style={buttonStyles.grayOutlinedButton}
          onPress={() => navigation.navigate("editProfile")}
        >
          <Text style={buttonStyles.grayOutlinedButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        renderFollowButton()
      )}
    </View>
  );
};

export default ProfileHeader;
