import React from "react";
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,SafeAreaView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";

// Example contacts data
const contacts = [
  {
    id: "1",
    name: "Astrologer1",
    phone: "+91 1234567890",
    avatar: require("../assets/sadhu1.avif"),
  },
  {
    id: "2",
    name: "Astrologer2",
    phone: "+91 1234567890",
    avatar: require("../assets/sadhu2.avif"),
  },
  {
    id: "3",
    name: "Astrologer3",
    phone: "+91 1234567890",
    avatar: require("../assets/sadhu3.avif"),
  },
  {
    id: "4",
    name: "Astrologer4",
    phone: "+91 1234567890",
    avatar: require("../assets/sadhu1.avif"),
  },
];

export default function ContactListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => navigation.navigate("CallScreen", { contact: item })}
            >
              <Ionicons name="call-outline" size={22} color={COLORS.success} />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 18, borderBottomWidth: 1, borderColor: "#eee" },
  headerText: { fontSize: 22, fontWeight: "bold", color: COLORS.orange },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#eee",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: { width: 54, height: 54, borderRadius: 27, borderWidth: 1.5, borderColor: COLORS.orangeLight },
  name: { fontSize: 17, fontWeight: "bold", color: COLORS.black },
  phone: { fontSize: 13, color: COLORS.grayDark, marginTop: 2 },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD180",
    borderColor: COLORS.success,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginLeft: 8,
  },
  callBtnText: { color: COLORS.success, fontWeight: "bold", marginLeft: 4 },
});