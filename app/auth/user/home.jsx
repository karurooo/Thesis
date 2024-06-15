import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  DrawerLayout,
} from "react-native-gesture-handler";
import { supabase } from "../../../lib/supabase.ts";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [drawer, setDrawer] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate("Login");
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("home")}
      >
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerText}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerText}>Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerText}>Vehicles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerText}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem}>
        <Text style={styles.drawerText}>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayout
        drawerWidth={250}
        drawerPosition="left"
        drawerType="front"
        drawerBackgroundColor="#333"
        renderNavigationView={renderDrawerContent}
        ref={(drawer) => setDrawer(drawer)}
      >
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => drawer.openDrawer()}>
              <Image
                source={require("../../../assets/images/main-menu.png")}
                style={styles.menuIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome RoadTech</Text>
            <Text style={styles.subtitle}>Roadside Heroes at your Service</Text>
          </View>
          <View style={styles.specialOffer}>
            <Image
              source={require("../../../assets/images/1.png")}
              style={styles.offerImage}
            />
            <Image
              source={require("../../../assets/images/2.png")}
              style={styles.offerImage}
            />
          </View>
          <View style={styles.services}>
            {[
              {
                name: "Towing",
                icon: require("../../../assets/images/3.png"),
                link: "/auth/user/towing",
              },
              {
                name: "Tire change",
                icon: require("../../../assets/images/5.png"),
                link: "/app/auth/user/tire-change.jsx",
              },
              {
                name: "Refuel",
                icon: require("../../../assets/images/4.png"),
                link: "/app/auth/user/refuel.jsx",
              },
              {
                name: "Jump",
                icon: require("../../../assets/images/6.png"),
                link: "/app/auth/user/jump.jsx",
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.link}
                style={styles.serviceButton}
              >
                <View style={styles.iconContainer}>
                  <Image source={service.icon} style={styles.serviceIcon} />
                </View>
                <Text style={styles.serviceText}>{service.name}</Text>
              </Link>
            ))}
          </View>
          <View style={styles.bottomSection}>
            <Image
              source={require("../../../assets/images/chatbot.png")}
              style={styles.chatbotIcon}
            />
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>Need help? Ask me!</Text>
            </View>
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
      </DrawerLayout>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 80,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  header: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  specialOffer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  offerImage: {
    width: "50%",
    height: 60,
    borderRadius: 5,
  },
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  serviceButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    height: 100,
    marginVertical: 9,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  serviceText: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  chatbotIcon: {
    width: 50,
    height: 50,
  },
  speechBubble: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  speechText: {
    color: "white",
    fontSize: 14,
  },
  illustration: {
    width: 100,
    height: 100,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  drawerItem: {
    paddingVertical: 15,
  },
  drawerText: {
    color: "white",
    fontSize: 18,
  },
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    backgroundColor: "black",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  menuItemText: {
    color: "white",
    fontSize: 12,
  },
});
