import { View, FlatList, Dimensions, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import PostSingle from "./PostSingle";
import { getFeed, getPostsByUserId } from "../../services/posts";

const HomeFeedScreen = ({ route }) => {
  const { setCurrentUserProfileItemInView, creator, profile } = route.params;

  const [posts, setPosts] = useState([]);
  const mediaRefs = useRef([]);

  useEffect(() => {
    if (profile) {
        getPostsByUserId(creator).then(setPosts)
    } else {
        getFeed().then(setPosts)
    }
}, [])

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            setCurrentUserProfileItemInView(element.item.creator);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          backgroundColor: "black",
        }}
      >
        <PostSingle
          item={item}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item}
        decelerationRate={"normal"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default HomeFeedScreen;
