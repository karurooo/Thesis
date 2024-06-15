import React, { useState } from "react";
import { Link } from "expo-router";
import { StatusBar, Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { supabase } from "../../../lib/supabase.ts"; // Ensure this path is correct

export default function SignUp() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUpUser = async (
    companyName,
    fullName,
    email,
    phoneNumber,
    password
  ) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName,
            full_name: fullName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) {
        console.error("Error during sign up:", error.message);
        throw error;
      }

      return { user };
    } catch (error) {
      return { error };
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const { error, user } = await signUpUser(
      companyName,
      fullName,
      email,
      phoneNumber,
      password
    );

    if (error) {
      if (error.message.includes("already exists")) {
        Alert.alert("User already exists. Please login instead.");
      } else {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Success", "Account created successfully");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Enter your account details below</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#666"
          onChangeText={(text) => setCompanyName(text)}
          value={companyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#666"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#666"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.eyeIconText}>
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign-up</Text>
        </TouchableOpacity>
        <Link href="auth/specialist/login" style={styles.backToLoginLink}>
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </Link>
        <Text style={styles.termsText}>
          By creating an account I agree to the terms and conditions of our
          <Text style={styles.linkText}> Service</Text>,
          <Text style={styles.linkText}> Payments</Text>,
          <Text style={styles.linkText}> Terms of Service</Text>,
          <Text style={styles.linkText}> Privacy Policy</Text>.
        </Text>
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
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffff",
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "white",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginBottom: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  eyeIconText: {
    color: "white",
    fontSize: 18,
  },
  backToLoginText: {
    color: "#FF8C00",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    width: "100%",
    height: 50,
    alignSelf: "flex-start",
    backgroundColor: "#FF8C00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
  googleSignInButton: {
    width: "100%",
    height: 50,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  googleSignInButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#FF8C00",
    textDecorationLine: "underline",
  },
});
