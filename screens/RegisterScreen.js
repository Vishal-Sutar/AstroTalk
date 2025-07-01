import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../theme";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      await AsyncStorage.setItem("user", JSON.stringify({ email, password, name }));
      Alert.alert("Registration Successful", "You can now log in.", [
        { text: "OK", onPress: () => navigation.replace("Login") },
      ]);
    } catch (e) {
      console.log("AsyncStorage error:", e);
      Alert.alert("Error", "Failed to save user: " + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/register.png')} style={styles.logo} />
      <Text style={styles.heading}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.text}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray, justifyContent: "center", alignItems: "center", padding: 24 },
  heading: { fontSize: 28, fontWeight: "bold", color: COLORS.orange, marginBottom: 38 },
  input: { width: "100%", backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 18, marginVertical: 10, fontSize: 16, color: COLORS.black, borderWidth: 1, borderColor: COLORS.orangeLight },
  button: { backgroundColor: COLORS.orange, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 50, marginTop: 18, elevation: 2 },
  buttonText: { color: COLORS.white, fontWeight: "bold", fontSize: 18, textAlign: "center", letterSpacing: 1 },
  text: { color: COLORS.black, fontSize: 15, textAlign: "center", marginTop: 24 },
  link: { color: COLORS.orangeDark, fontWeight: "bold" },
   logo: {
  width: 120,
  height: 120,
  resizeMode: "contain",
  marginBottom: 20,
},
});


