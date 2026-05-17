import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [rate, setRate] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3000/rates")
      .then((response) => response.json())
      .then((data) => {
        setRate(data.conversion_rates.EUR.toString());
      })
      .catch((error) => {
        console.log(error);
        setRate("Error loading rate");
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>USD to EUR</Text>
      <Text style={styles.text}>{rate}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    fontSize: 22,
    marginTop: 10,
  },
});