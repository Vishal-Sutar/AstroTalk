import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { COLORS } from "../theme";

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 120,
    }).start();

    setTimeout(() => navigation.replace("Onboarding"), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {/* Updated: Show the provided logo image */}
        <Image
          source={require("../assets/Logo.png")} // Place your image as splash_logo.png in assets/
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.title}>ग्रामोपाध्याय</Text>
      <Text style={styles.subtitle}>Make your future bright</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.orange, justifyContent: "center", alignItems: "center" },
  logoImage: {
    width: 500,
    height: 500,
    marginBottom: 16,
  },
  title: { fontSize: 36, color: COLORS.white, fontWeight: "bold" },
  subtitle: { color: COLORS.white, fontSize: 16, marginTop: 8, letterSpacing: 1 },
});