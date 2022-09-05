import {
  Text as DefaultText,
  TextProps,
  SafeAreaView as DefaultSafeAreaView,
  ScrollView as DefaultScrollView,
  View as DefaultView,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import { colors, spacing } from "../theme";

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

export const ScrollView = (props: ScrollViewProps) => {
  return (
    <DefaultScrollView
      {...props}
      style={[{ backgroundColor: colors.background }, props.style]}
    />
  );
};

export const Container = (props: ViewProps) => {
  return (
    <DefaultView
      {...props}
      style={[
        {
          backgroundColor: colors.secondary,
          padding: spacing.medium,
          borderRadius: 10,
        },
        props.style,
      ]}
    >
      {props.children}
    </DefaultView>
  );
};
