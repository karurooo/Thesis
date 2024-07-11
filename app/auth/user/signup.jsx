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
import { supabase } from "../../../lib/supabase";
import { useRouter } from "expo-router";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();

	const signUpUser = async (email, password) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				console.error("Error during sign up:", error.message);
				throw error;
			}

			return { user: data.user };
		} catch (error) {
			console.error("Catch block error:", error);
			return { error };
		}
	};

	const saveUserProfile = async (userId, firstName, lastName, phoneNumber) => {
		try {
			const { error } = await supabase.from("profiles").insert([
				{
					id: userId,
					created_at: new Date(),
					first_name: firstName,
					last_name: lastName,
					phone_number: phoneNumber,
				},
			]);

			if (error) {
				console.error("Error saving user profile:", error.message);
				throw error;
			}
		} catch (error) {
			console.error("Catch block error while saving user profile:", error);
			return { error };
		}
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			Alert.alert("Passwords do not match");
			return;
		}

		if (!validateEmail(email)) {
			Alert.alert("Invalid email format");
			return;
		}

		const { error, user } = await signUpUser(email, password);

		if (error) {
			if (error.message.includes("already exists")) {
				Alert.alert("User already exists. Please login instead.");
			} else {
				Alert.alert("Error", error.message);
			}
		} else {
			Alert.alert("Success", "Account created successfully");

			// Save additional user profile
			const { error: userProfileError } = await saveUserProfile(
				user.id,
				firstName,
				lastName,
				phoneNumber,
			);

			if (userProfileError) {
				Alert.alert(
					"Error",
					"Error saving user profile: " + userProfileError.message,
				);
			} else {
				// Redirect to login page
				router.push("../user/login.jsx");
			}
		}
	};
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<Text style={styles.welcomeText}>Create Account</Text>
				<Text style={styles.text}>Enter your account details below</Text>
				<TextInput
					style={styles.input}
					placeholder="First Name"
					placeholderTextColor="#666"
					onChangeText={(text) => setFirstName(text)}
					value={firstName}
				/>
				<TextInput
					style={styles.input}
					placeholder="Last Name"
					placeholderTextColor="#666"
					onChangeText={(text) => setLastName(text)}
					value={lastName}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					placeholderTextColor="#666"
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<TextInput
					style={styles.input}
					placeholder="Phone Number"
					placeholderTextColor="#666"
					onChangeText={(text) => setPhoneNumber(text)}
					value={phoneNumber}
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
				<TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
					<Text style={styles.signInButtonText}>Sign up</Text>
				</TouchableOpacity>
				<Link href="/auth/user/login" style={styles.backToLoginLink}>
					<Text style={styles.backToLoginText}>Back to Login</Text>
				</Link>
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
		marginBottom: 20,
		marginTop: 20,
	},
	text: {
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
	signInButton: {
		width: "100%",
		height: 50,
		alignSelf: "flex-start",
		backgroundColor: "#FF8C00",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	signInButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	backToLoginLink: {
		marginTop: 15,
	},
	backToLoginText: {
		color: "#FF8C00",
		fontSize: 16,
		fontWeight: "bold",
	},
});
