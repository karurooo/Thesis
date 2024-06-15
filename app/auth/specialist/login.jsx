import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { supabase } from "../../../lib/supabase"; // Ensure this path is correct

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const signInUser = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error during sign in:", error.message);
        throw error;
      }

      return { user };
    } catch (error) {
      return { error };
    }
  };

  const handleSignIn = async () => {
    const { error, user } = await signInUser(email, password);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.push("/auth/specialist/home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.text}>Login to your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or phone number"
          placeholderTextColor="#666"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIconText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleSignInButton}>
          <Image
            style={styles.googleIcon}
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
          />
          <Text style={styles.googleSignInButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Don’t have an account?{" "}
            <Link href="/auth/specialist/signup" style={styles.signUpLink}>
              Sign up
            </Link>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  welcomeText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 70,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffff", // Adjust the color to your preference
    alignSelf: "flex-start",
    marginBottom: 40, // Added marginBottom to create space
  },
  input: {
    width: "95%",
    height: 50,
    backgroundColor: "#1E1E1E",
    borderRadius: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 5,
    color: "white",
  },
  passwordContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    alignSelf: "flex-start",
    borderRadius: 5,
    marginBottom: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  signInButton: {
    width: "95%",
    height: 50,
    alignSelf: "flex-start",
    backgroundColor: "#FF8C00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#FFFFFF",
    marginBottom: 170,
  },
  googleSignInButton: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    marginBottom: 15,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleSignInButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#FFFFFF",
  },
  signUpLink: {
    color: "#FF8C00",
  },
});
