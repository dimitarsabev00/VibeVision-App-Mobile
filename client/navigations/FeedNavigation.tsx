import React, { createContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeFeedScreen, ProfileScreen } from "../screens";

const { Screen, Navigator } = createMaterialTopTabNavigator();

export const CurrentUserProfileItemInViewContext = createContext(null);

const FeedNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState(null);
  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={currentUserProfileItemInView}
    >
      <Navigator initialRouteName="feedList" tabBar={() => <></>}>
        <Screen
          name="feedList"
          component={HomeFeedScreen}
          initialParams={{ setCurrentUserProfileItemInView, profile: false }}
        />
        <Screen
          name="feedProfile"
          component={ProfileScreen}
          initialParams={{ initialUserId: null }}
        />
      </Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};

export default FeedNavigation;
