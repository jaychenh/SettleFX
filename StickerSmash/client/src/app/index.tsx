import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_EXCHANGE_API_KEY;

export default function HomeScreen() {
  const [rate, setRate] = useState("Loading...");

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        setRate(data.conversion_rates.EUR.toString());
      })
      .catch(() => {
        setRate("Error");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>USD to EUR</Text>
      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  rate: {
    fontSize: 24,
    marginTop: 10,
  },
});