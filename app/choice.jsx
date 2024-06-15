import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function Choice() {
  return (
    <LinearGradient colors={["#000000", "#2a265d"]} style={styles.container}>
      <View style={styles.dropdown}>
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.dropdownText}>Log in as</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Link href="/auth/user/login" style={styles.button}>
          <FontAwesome name="user" size={25} color="white" />
          <Text style={styles.buttonText}> Client</Text>
        </Link>
        <Link href="auth/specialist/login" style={styles.button}>
          <FontAwesome name="user-md" size={25} color="white" />
          <Text style={styles.buttonText}> Specialist</Text>
        </Link>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    marginBottom: 40,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 18,
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Added to separate icon and text
    backgroundColor: "#444",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%",
    marginBottom: 25,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
