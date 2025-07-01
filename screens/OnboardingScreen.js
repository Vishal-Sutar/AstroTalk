import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated, Image} from "react-native";
import { COLORS } from "../theme";

const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Consult Astrologers",
    desc: "Chat or call top astrologers instantly.",
    image: require("../assets/consult.png"),
  },
  {
    title: "Daily Horoscope",
    desc: "Get daily predictions for your zodiac.",
    image: require("../assets/dailyHoro.png"),

  },
  {
    title: "Personal Reports",
    desc: "Order personalized reports and remedies.",
    image: require("../assets/reports.png"),

  },
];

export default function OnboardingScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [current, setCurrent] = useState(0);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={e => setCurrent(Math.round(e.nativeEvent.contentOffset.x / width))}
      >
        {slides.map((slide, idx) => (
          <View style={styles.slide} key={idx}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.desc}>{slide.desc}</Text>
            {idx === slides.length - 1 && (
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={styles.startBtnText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: current === i ? COLORS.orange : COLORS.orangeLight },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { width, justifyContent: "center", alignItems: "center", padding: 30 },
  image: {width: 300,height: 300,resizeMode: "contain",marginVertical: 40,},
  title: { fontSize: 26, fontWeight: "bold", color: COLORS.orange, marginVertical: 14 },
  desc: { fontSize: 17, color: COLORS.black, textAlign: "center", marginBottom: 30 },
  startBtn: { backgroundColor: COLORS.orange, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 36, marginTop: 24 },
  startBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dots: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  dot: { width: 16, height: 6, borderRadius: 3, margin: 4 },
});