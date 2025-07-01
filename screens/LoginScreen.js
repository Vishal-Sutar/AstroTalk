import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../theme";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        Alert.alert("Login Failed", "No user found. Please register.");
        return;
      }
      const user = JSON.parse(userData);
      if (user.email === email && user.password === password) {
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (e) {
      console.log("AsyncStorage error:", e);
      Alert.alert("Error", "Failed to log in: " + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login.png')} style={styles.logo} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("Register")}
      >
        <Text style={styles.text}>
          Don't have an account? <Text style={styles.link}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.orange,
    marginBottom: 38,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 10,
    fontSize: 16,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.orangeLight,
  },
  button: {
    backgroundColor: COLORS.orange,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 50,
    marginTop: 18,
    elevation: 2,
    shadowColor: COLORS.orangeDark,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 7,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1,
  },
  text: {
    color: COLORS.black,
    fontSize: 15,
    textAlign: "center",
    marginTop: 24,
  },
  link: {
    color: COLORS.orangeDark,
    fontWeight: "bold",
  },
  logo: {
  width: 120,
  height: 120,
  resizeMode: "contain",
  marginBottom: 20,
},
});

