import React from "react";
import { StatusBar, StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient colors={["#000000", "#2a265d"]} style={styles.container}>
      <Text style={styles.title}>Roadside Assistance</Text>
      <Image
        source={require("../assets/images/road_image.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Your Journey, Our Safety Travel Assurance</Text>
      <Link href="choice" style={styles.button}>
        Get Started
      </Link>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff", // Adjust the color to your preference
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffff", // Adjust the color to your preference
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF7C06",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    color: "#FFF",
    fontSize: 20,
    marginTop: 5,
  },
  image: {
    width: 500,
    height: 230,
    marginBottom: 100,
  },
});
