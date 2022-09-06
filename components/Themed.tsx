import React from "react";
import {
  Text as DefaultText,
  TextProps,
  SafeAreaView as DefaultSafeAreaView,
  ScrollView as DefaultScrollView,
  View,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import { colors, spacing } from "../theme";

import * as Animatable from "react-native-animatable";

export const Text = (props: TextProps) => {
  return (
    <DefaultText {...props} style={[{ color: colors.text }, props.style]} />
  );
};

export const SafeAreaView = (props: ViewProps) => {
  return (
    <DefaultSafeAreaView
      {...props}
      style={[{ backgroundColor: colors.background, flex: 1 }, props.style]}
    />
  );
};

export const ScrollView = React.forwardRef(
  (props: ScrollViewProps, ref: any) => {
    return (
      <DefaultScrollView
        {...props}
        ref={ref}
        style={[{ backgroundColor: colors.background }, props.style]}
      />
    );
  }
);

export const Container = (props: ViewProps) => {
  return (
    <Animatable.View
      {...props}
      style={[
        {
          backgroundColor: colors.secondary,
          padding: spacing.medium,
          borderRadius: 10,
        },
        props.style,
      ]}
      animation="fadeInUp"
    >
      {props.children}
    </Animatable.View>
  );
};
