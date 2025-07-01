import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { COLORS } from "../theme";

export default function AstrologerCard({ name, rating, emoji, delay = 0 }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      delay,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { scale: anim },
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
          ],
          opacity: anim,
        },
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.cardName}>{name}</Text>
      <View style={styles.rating}>
        <Text style={{ color: COLORS.orangeDark, fontWeight: "bold" }}>★ {rating}</Text>
      </View>
      <TouchableOpacity style={styles.talkNowBtn}>
        <Text style={styles.talkNowText}>Talk Now</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginRight: 16,
    width: 130,
    elevation: 3,
    shadowColor: COLORS.orange,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  emoji: { fontSize: 34, marginBottom: 6 },
  cardName: { fontWeight: "600", color: COLORS.orangeDark },
  rating: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  talkNowBtn: { backgroundColor: COLORS.orange, padding: 8, borderRadius: 12, marginTop: 8 },
  talkNowText: { color: COLORS.white, fontWeight: "bold" },
});