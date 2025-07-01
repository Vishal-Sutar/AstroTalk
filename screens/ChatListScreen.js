import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS } from "../theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Demo astrologer data
const astrologers = [
  {
    id: "1",
    name: "Priyaansh",
    skills: "Vedic, Nadi",
    languages: "English, Hindi, Punjabi",
    experience: "5 Years",
    // rate: "15",
    verified: true,
    new: true,
    avatar: require("../assets/sadhu1.avif"), // Place representative images in your assets folder
    orders: null,
  },
  {
    id: "2",
    name: "Dishank",
    skills: "Vedic",
    languages: "English, Hindi",
    experience: "4 Years",
    verified: true,
    new: true,
    avatar: require("../assets/sadhu2.avif"),
    orders: null,
  },
  {
    id: "3",
    name: "ShaliniM",
    skills: "Vedic, Numerology, Palmistry",
    languages: "English, Hindi",
    experience: "8 Years",
    verified: true,
    new: false,
    avatar: require("../assets/sadhu3.avif"),
    orders: "38386",
  },
  {
    id: "4",
    name: "VandanaaG",
    skills: "Vedic, Tarot, Psychic",
    languages: "English, Hindi, Punjabi",
    experience: "10 Years",
    verified: true,
    new: false,
    avatar: require("../assets/sadhu3.avif"),
    orders: null,
  },
];

const categories = [
  { key: "all", label: "All", icon: "grid" },
  { key: "love", label: "Love", icon: "heart" },
  { key: "education", label: "Education", icon: "school" },
];

export default function ChatListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Ionicons name="person" size={28} color={COLORS.orange} />
        </View>
        <Text style={styles.hiText}>Hi</Text>
        <View style={{ flex: 1 }} />
        <Ionicons name="search" size={24} color={COLORS.orangeDark} style={{ marginRight: 12 }} />
        <MaterialIcons name="filter-list" size={24} color={COLORS.orangeDark} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Will I get a job in abroad?</Text>
          <View style={styles.bannerAvatar}>
            <Ionicons name="person" size={32} color={COLORS.orange} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.catRow}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.key} style={styles.catBtn}>
            <Ionicons
              name={cat.icon}
              size={18}
              color={cat.key === "all" ? COLORS.orange : COLORS.orangeLight}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.catText,
                cat.key === "all" && { color: COLORS.orange, fontWeight: "bold" },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={astrologers}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.name}>{item.name}</Text>
                {item.verified && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.success} style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text style={styles.skills}>{item.skills}</Text>
              <Text style={styles.desc}>{item.languages}</Text>
              <Text style={styles.desc}>Exp- {item.experience}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color={COLORS.orangeDark} />
                  ))}
                </View>
                {item.new && <Text style={styles.newBadge}>NEW!</Text>}
                {item.orders && (
                  <Text style={styles.orders}>{item.orders} orders</Text>
                )}
              </View>
              {/* <Text style={styles.rate}>₹ {item.rate}/min</Text> */}
            </View>
            <TouchableOpacity
              style={styles.freeBtn}
              onPress={() => navigation.navigate("ChatScreen", { astrologer: item })}
            >
              <Text style={styles.freeBtnText}>Chat</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  profileCircle: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.orangeLight,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  hiText: { fontSize: 18, fontWeight: "bold", color: COLORS.black },
  bannerScroll: { maxHeight: 75, paddingLeft: 14 },
  banner: {
    flexDirection: "row",
    backgroundColor: "#FFF7E6",
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 2,
    marginBottom: 12,
    marginRight: 8,
    minWidth: 280,
  },
  bannerText: { fontSize: 16, color: COLORS.black, flex: 1 },
  bannerAvatar: { backgroundColor: COLORS.orangeLight, borderRadius: 22, padding: 4, marginLeft: 10 },
  catRow: { flexDirection: "row", alignItems: "center", marginLeft: 10, marginBottom: 10 },
  catBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 7,
    borderWidth: 1.2,
    borderColor: "#efefef",
  },
  catText: {
    fontSize: 15,
    color: COLORS.orangeLight,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 7,
    borderRadius: 14,
    padding: 14,
    shadowColor: "#eee",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: COLORS.orangeLight },
  name: { fontSize: 17, fontWeight: "bold", color: COLORS.black },
  skills: { fontSize: 13, color: COLORS.black, marginTop: 2 },
  desc: { fontSize: 12, color: COLORS.grayDark, marginTop: 1 },
  newBadge: { marginLeft: 10, color: COLORS.danger, fontWeight: "bold", fontSize: 12 },
  orders: { marginLeft: 10, color: COLORS.gray, fontSize: 12 },
  // rate: { marginTop: 6, fontWeight: "bold", fontSize: 15, color: COLORS.orange },
  freeBtn: {
    backgroundColor:COLORS.orangeLight,
    borderColor: COLORS.success,
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  freeBtnText: { color: COLORS.success, fontWeight: "bold" },
});