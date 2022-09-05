import React from "react";

import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Container, SafeAreaView, ScrollView, Text } from "./components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, spacing } from "./theme";
import { PillLog } from "./types";

import moment from "moment";
import { getPillLogs, storePillLogs } from "./asyncStorage";

export default function App() {
  const [pillLogs, setPillLogs] = React.useState<PillLog[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
        {isLoading && <ActivityIndicator color={colors.primary} />}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchPillLogs} />
          }
          contentContainerStyle={styles.container}
        >
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
          <TouchableOpacity onPress={handleAddPillLog} style={styles.button}>
            <MaterialCommunityIcons
              name="pill"
              size={40}
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
    justifyContent: "flex-end",
    alignItems: "center",
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
    marginVertical: spacing.small / 2,
  },
});
