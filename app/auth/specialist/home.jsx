import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../../../lib/supabase"; // Ensure this path is correct
import { Ionicons } from "@expo/vector-icons"; // Add this import for icons

export default function SpecialistHome() {
  const [user, setUser] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(true); // Assuming default is "On"

  useEffect(() => {
    // Fetch the user data from Supabase
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      } else {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const toggleSwitch = () => setIsSwitchOn((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user ? user.user_metadata.full_name : "name"}
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isSwitchOn}
          thumbColor={isSwitchOn ? "#FFFFFF" : "#FFFFFF"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>Total orders</Text>
          <Text style={styles.statsNumber}>0</Text>
          <Text style={styles.statsSubtext}>Today</Text>
          <Text style={styles.statsSubtext}>5 ↑ 6%</Text>
          <Text style={styles.statsSubtext}>This week</Text>
          <Text style={styles.statsSubtext}>23</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>Rating</Text>
          <Text style={styles.statsNumber}>4.5</Text>
          <Text style={styles.statsStars}>⭐⭐⭐⭐⭐</Text>
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"San Vicente Butuan City"}
          description={"Location description"}
        />
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>San Vicente Butuan City</Text>
      </View>
      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.menuItemText}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="white" />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
    backgroundColor: "#000000",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  statsCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    width: "45%",
    alignItems: "center",
  },
  statsText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  statsNumber: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  statsSubtext: {
    color: "#666",
    fontSize: 14,
  },
  statsStars: {
    color: "#4CAF50",
    fontSize: 20,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1E1E1E",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuItemText: {
    color: "white",
    fontSize: 12,
  },
});
