import React from "react";

import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Container, SafeAreaView, ScrollView, Text } from "./components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, spacing } from "./theme";
import { PillLog } from "./types";
import { getPillLogs, storePillLogs } from "./asyncStorage";

import moment from "moment";

export default function App() {
  const [pillLogs, setPillLogs] = React.useState<PillLog[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const scrollViewRef = React.useRef<any>();

  const showAlert = () =>
    Alert.alert(
      "Clear all your logs?",
      "You won't be able to recover your logs if you clear them.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setPillLogs([]);
            storePillLogs([]);
          },
        },
      ]
    );

  const handleAddPillLog = () => {
    const newPillLogs = [
      ...pillLogs,
      {
        id: Math.random().toString(),
        time: new Date(),
      },
    ];
    setPillLogs([...newPillLogs]);
    storePillLogs(newPillLogs);
  };

  const fetchPillLogs = async () => {
    setIsLoading(true);
    const logsList = await getPillLogs();
    setPillLogs([...logsList]);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    fetchPillLogs();

    return () => {};
  }, []);

  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <Text style={styles.version}>Pillcheck v1.0.0</Text>

        {isLoading && <ActivityIndicator color={colors.primary} />}

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchPillLogs} />
          }
          contentContainerStyle={styles.container}
        >
          {pillLogs.length === 0 && (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("./assets/empty.png")}
                style={styles.emptyImg}
              />
              <Text style={styles.emptyText}>You have no logs yet</Text>
            </View>
          )}

          {pillLogs.map((log) => (
            <Container key={log.id} style={styles.logContainer}>
              <View style={styles.row}>
                <Text style={{ fontWeight: "bold" }}>Took a pill </Text>
                <Text> about {moment(log.time).fromNow()}</Text>
              </View>
            </Container>
          ))}
        </ScrollView>

        <View style={styles.bar}>
          <TouchableOpacity
            onPress={handleAddPillLog}
            onLongPress={showAlert}
            delayLongPress={1500}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="pill"
              size={42}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    marginVertical: spacing.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    width: "100%",
    height: 85,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 1000,
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  logContainer: {
    marginHorizontal: spacing.small,
    marginBottom: spacing.small,
  },
  emptyText: {
    opacity: 0.2,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: spacing.small,
  },
  emptyImg: {
    width: 100,
    height: 100,
    marginTop: spacing.large * 6,
    opacity: 0.2,
  },
  version: {
    textAlign: "center",
    opacity: 0.3,
    fontWeight: "bold",
    marginVertical: spacing.small,
  },
});
