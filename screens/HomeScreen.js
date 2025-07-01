import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from "react-native";
import { COLORS } from "../theme";

// Example: get user name from props/auth state
const USER_NAME = "User"; // Replace with dynamic username if available

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  // Add more features here!
  const features = [
    {
      label: "Kundali",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Daily Horoscope",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Zodiac Compatibility",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Panchang",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Tarot Reading",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Numerology",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
    {
      label: "Personalized Report",
      image: require("../assets/kundali.png"),
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.greeting}>
          Hi, {USER_NAME}! <Text style={{ fontSize: 22 }}>🌟</Text>
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>

        {/* Notification/Offers Banner
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🔔 Special Offer: Get 20% off on your first personalized report!</Text>
        </View> */}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Image source={require("../assets/kundali.png")} style={styles.actionImg} />
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Image source={require("../assets/kundali.png")} style={styles.actionImg} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Image source={require("../assets/kundali.png")} style={styles.actionImg} />
            <Text style={styles.actionText}>Ask Qn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Image source={require("../assets/kundali.png")} style={styles.actionImg} />
            <Text style={styles.actionText}>My Reports</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Features</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 28 }}>
          {features.map((feature, idx) => (
            <TouchableOpacity
              key={feature.label}
              style={styles.featureBtn}
              onPress={feature.onPress}
              activeOpacity={0.8}
            >
              <Image source={feature.image} style={styles.featureImg} resizeMode="contain" />
              <Text style={styles.featureText}>{feature.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Daily Horoscope</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horoscopeCard}>
          <Text style={styles.horoscopeSign}>♈ Aries</Text>
          <Text style={styles.horoscopeText}>
            Today brings new opportunities. Stay positive and open to change.
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray, padding: 20 },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 4, color: COLORS.orange },
  date: { fontSize: 14, color: COLORS.grayDark, marginBottom: 16 },
  banner: {
    backgroundColor: COLORS.orangeLight,
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    alignItems: "center",
  },
  bannerText: { color: COLORS.orangeDark, fontWeight: "bold", fontSize: 15 },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionBtn: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    width: 78,
    elevation: 2,
    shadowColor: "#ddd",
  },
  actionImg: { width: 28, height: 28, marginBottom: 5 },
  actionText: { marginTop: 0, color: COLORS.orangeDark, fontWeight: "600", fontSize: 13, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.orangeDark, marginVertical: 10 },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  featureBtn: {
    alignItems: "center",
    backgroundColor: COLORS.orangeLight,
    borderRadius: 18,
    padding: 12,
    width: 110,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#ccc",
  },
  featureImg: {
    width: 56,
    height: 56,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 15,
    color: COLORS.orangeDark,
    fontWeight: "600",
    textAlign: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  seeAll: {
    color: COLORS.orange,
    fontWeight: "bold",
    fontSize: 15,
    padding: 4,
  },
  horoscopeCard: {
    backgroundColor: COLORS.orangeLight,
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
  },
  horoscopeSign: { fontSize: 20, fontWeight: "bold", color: COLORS.orangeDark },
  horoscopeText: { marginTop: 6, color: COLORS.black },
});