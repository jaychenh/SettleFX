import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState("");

  async function convertCurrency() {
    const response = await fetch("http://localhost:3000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        from: fromCurrency,
        to: toCurrency,
      }),
    });

    const data = await response.json();

    setResult(data.result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TextInput
        placeholder="From Currency (USD)"
        value={fromCurrency}
        onChangeText={setFromCurrency}
        style={styles.input}
      />

      <TextInput
        placeholder="To Currency (EUR)"
        value={toCurrency}
        onChangeText={setToCurrency}
        style={styles.input}
      />

      <Button title="Convert" onPress={convertCurrency} />

      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  result: {
    fontSize: 24,
    marginTop: 20,
  },
});