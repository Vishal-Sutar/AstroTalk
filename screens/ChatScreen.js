// import React, { useState, useRef } from "react";
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Animated } from "react-native";
// import { COLORS } from "../theme";

// export default function ChatScreen({ route }) {
//   const [messages, setMessages] = useState([
//     { id: "1", from: "astrologer", text: "Hello! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const flatListRef = useRef();
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     setMessages([
//       ...messages,
//       { id: String(messages.length + 1), from: "user", text: input },
//     ]);
//     setInput("");
//     setTimeout(() => {
//       setMessages(msgs => [
//         ...msgs,
//         { id: String(msgs.length + 1), from: "astrologer", text: "Thank you for your message! (demo reply)" }
//       ]);
//     }, 1200);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, backgroundColor: COLORS.gray }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={({ item }) => (
//             <View style={[
//               styles.bubble,
//               item.from === "user" ? styles.user : styles.astrologer
//             ]}>
//               <Text style={styles.bubbleText}>{item.text}</Text>
//             </View>
//           )}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{ padding: 16, paddingBottom: 70 }}
//           onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//         />
//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Type your message..."
//             placeholderTextColor={COLORS.orangeLight}
//             value={input}
//             onChangeText={setInput}
//           />
//           <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
//             <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   bubble: {
//     maxWidth: "75%",
//     marginVertical: 6,
//     padding: 12,
//     borderRadius: 16,
//   },
//   user: {
//     alignSelf: "flex-end",
//     backgroundColor: COLORS.orangeLight,
//   },
//   astrologer: {
//     alignSelf: "flex-start",
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.orangeLight,
//   },
//   bubbleText: { fontSize: 16, color: COLORS.black },
//   inputRow: {
//     flexDirection: "row",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     padding: 10,
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: COLORS.gray,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     fontSize: 16,
//     color: COLORS.black,
//     borderWidth: 1,
//     borderColor: COLORS.orangeLight,
//   },
//   sendBtn: {
//     backgroundColor: COLORS.orange,
//     borderRadius: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 22,
//     marginLeft: 10,
//     elevation: 1,
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { COLORS } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen({ route, navigation }) {
  const astrologer = route?.params?.astrologer;

  // Defensive check: if no astrologer param, show fallback UI
  if (!astrologer) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No astrologer selected. Please choose an astrologer from the chat list.</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: "blue" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: `Hello, I'm ${astrologer.name}. How can I help you today?`,
      from: "astrologer",
      time: "09:30",
    },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <Image source={astrologer.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{astrologer.name}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, astrologer]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      from: "user",
      time: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. I'll get back to you shortly.",
          from: "astrologer",
          time: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
    }, 1000);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={70}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgRow,
              item.from === "user" ? styles.userRow : styles.astrologerRow,
            ]}
          >
            {item.from === "astrologer" && (
              <Image source={astrologer.avatar} style={styles.msgAvatar} />
            )}
            <View
              style={[
                styles.msgBubble,
                item.from === "user" ? styles.userBubble : styles.astrologerBubble,
              ]}
            >
              <Text style={{ color: item.from === "user" ? COLORS.white : COLORS.black }}>
                {item.text}
              </Text>
              <Text style={styles.msgTime}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

  
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={22} color={COLORS.white} />
          
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    

   
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  name: { fontWeight: "bold", fontSize: 17, color: COLORS.black },
  status: { fontSize: 12, color: COLORS.success },
  msgRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 14 },
  astrologerRow: { justifyContent: "flex-start" },
  userRow: { justifyContent: "flex-end", alignSelf: "flex-end" },
  msgAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  msgBubble: { maxWidth: "75%", padding: 12, borderRadius: 14, marginBottom: 2 },
  astrologerBubble: {
    backgroundColor: "#F2F3F5",
    borderTopLeftRadius: 4,
    marginLeft: 3,
  },
  userBubble: {
    backgroundColor: COLORS.orange,
    borderTopRightRadius: 4,
    marginRight: 3,
  },
  msgTime: { fontSize: 10, color: COLORS.gray, textAlign: "right", marginTop: 2 },
  inputRow: {
    marginBottom:30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 8,
    color: COLORS.black,
  },
  sendBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});