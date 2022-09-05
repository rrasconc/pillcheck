import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Container, SafeAreaView, ScrollView, Text } from "./components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, spacing } from "./theme";
import { PillLog } from "./types";

import moment from "moment";

export default function App() {
  const [pillLogs, setPillLogs] = React.useState<PillLog[]>([]);

  const handleAddPillLog = () => {
    setPillLogs([
      ...pillLogs,
      {
        id: Math.random().toString(),
        time: new Date(),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {pillLogs.map((log) => (
            <Container style={styles.logContainer}>
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
