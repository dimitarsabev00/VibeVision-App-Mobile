import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { useUser } from "../../../../hooks/useUser";
import generalStyles from "../../../../styles/generalStyles";

const CommentItem = ({ item }) => {
  const user = useUser(item.creator).data;

  return (
    <View style={styles.container}>
      <Image
        style={generalStyles.avatarSmall}
        source={{ uri: user?.photoURL }}
      />

      <View style={styles.containerText}>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text>{item.comment}</Text>
      </View>
    </View>
  );
};

export default CommentItem;
