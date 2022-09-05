import AsyncStorage from "@react-native-async-storage/async-storage";
import { PillLog } from "./types";

const pillLogsKey = "pillLogs-key";

export const storePillLogs = async (pillLogs: PillLog[]) => {
  try {
    const jsonValue = JSON.stringify(pillLogs);
    await AsyncStorage.setItem(pillLogsKey, jsonValue);
  } catch (error) {}
};

export const getPillLogs = async (): Promise<PillLog[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(pillLogsKey);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {}
};
