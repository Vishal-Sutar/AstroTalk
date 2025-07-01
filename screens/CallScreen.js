// // // import React, { useState, useRef } from "react";
// // // import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import { COLORS } from "../theme";

// // // export default function CallScreen({ navigation }) {
// // //   const [callActive, setCallActive] = useState(true);
// // //   const [duration, setDuration] = useState(0);
// // //   const fadeAnim = useRef(new Animated.Value(0)).current;

// // //   React.useEffect(() => {
// // //     Animated.timing(fadeAnim, {
// // //       toValue: 1,
// // //       duration: 700,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   }, []);

// // //   React.useEffect(() => {
// // //     let timer;
// // //     if (callActive) {
// // //       timer = setInterval(() => setDuration(d => d + 1), 1000);
// // //     }
// // //     return () => clearInterval(timer);
// // //   }, [callActive]);

// // //   const handleEndCall = () => {
// // //     setCallActive(false);
// // //     setTimeout(() => {
// // //       navigation.goBack();
// // //     }, 1200);
// // //   };

// // //   const formatDuration = (s) => {
// // //     const mins = String(Math.floor(s / 60)).padStart(2, "0");
// // //     const secs = String(s % 60).padStart(2, "0");
// // //     return `${mins}:${secs}`;
// // //   };

// // //   return (
// // //     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
// // //       <View style={styles.avatarCircle}>
// // //         <Text style={styles.emoji}>👩‍🦰</Text>
// // //       </View>
// // //       <Text style={styles.name}>Asha (Astrologer)</Text>
// // //       <Text style={styles.status}>{callActive ? "Call in Progress..." : "Call Ended"}</Text>
// // //       <Text style={styles.timer}>{formatDuration(duration)}</Text>
// // //       <TouchableOpacity
// // //         style={styles.endCallBtn}
// // //         onPress={handleEndCall}
// // //         disabled={!callActive}
// // //       >
// // //         <Ionicons name="call" size={28} color="#fff" />
// // //         <Text style={styles.endCallText}>End Call</Text>
// // //       </TouchableOpacity>
// // //     </Animated.View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: COLORS.orange,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     padding: 20,
// // //   },
// // //   avatarCircle: {
// // //     width: 110,
// // //     height: 110,
// // //     borderRadius: 55,
// // //     backgroundColor: COLORS.white,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 18,
// // //     elevation: 9,
// // //     shadowColor: COLORS.orangeDark,
// // //     shadowOpacity: 0.18,
// // //     shadowOffset: { width: 0, height: 7 },
// // //     shadowRadius: 10,
// // //   },
// // //   emoji: { fontSize: 48 },
// // //   name: { fontSize: 22, color: COLORS.white, fontWeight: "bold", marginVertical: 8 },
// // //   status: { color: COLORS.orangeLight, fontSize: 16, marginTop: 8 },
// // //   timer: { fontSize: 30, color: COLORS.white, fontWeight: "bold", marginVertical: 18 },
// // //   endCallBtn: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#e53935",
// // //     borderRadius: 20,
// // //     paddingVertical: 14,
// // //     paddingHorizontal: 40,
// // //     marginTop: 36,
// // //     elevation: 3,
// // //   },
// // //   endCallText: {
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //     fontSize: 18,
// // //     marginLeft: 10,
// // //     letterSpacing: 1,
// // //   },
// // // });

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, Button, StyleSheet, SafeAreaView, Linking } from 'react-native';

// // const CallScreen = () => {
// //   const [callConnected, setCallConnected] = useState(false);
// //   const [barrierActive, setBarrierActive] = useState(false);
// //   const [barrierTime, setBarrierTime] = useState(30);
// //   const [sessionStarted, setSessionStarted] = useState(false);
// //   const [timerId, setTimerId] = useState(null);

// //   // 🔢 Assign your astrologer's number here
// //   const astrologerNumber = '+919146450350';

// //   // Simulate call connection
// //   const connectCall = () => {
// //     setCallConnected(true);
// //   };

// //   // Start barrier countdown
// //   useEffect(() => {
// //     if (callConnected) {
// //       setBarrierActive(true);
// //       let countdown = 10;
// //       const interval = setInterval(() => {
// //         countdown -= 1;
// //         setBarrierTime(countdown);
// //         if (countdown === 0) {
// //           clearInterval(interval);
// //           setBarrierActive(false);
// //           setSessionStarted(true);
// //           makePhoneCall(); // 📞 call after barrier
// //         }
// //       }, 1000);

// //       setTimerId(interval);
// //     }
// //   }, [callConnected]);

// //   // 📞 Launch phone dialer
// //   const makePhoneCall = () => {
// //     const url = `tel:${astrologerNumber}`;
// //     Linking.canOpenURL(url)
// //       .then((supported) => {
// //         if (supported) {
// //           return Linking.openURL(url);
// //         } else {
// //           alert('Phone call not supported on this device');
// //         }
// //       })
// //       .catch((err) => console.error('Error opening dialer', err));
// //   };

// //   const cancelCall = () => {
// //     if (timerId) clearInterval(timerId);
// //     setCallConnected(false);
// //     setBarrierActive(false);
// //     setBarrierTime(30);
// //     setSessionStarted(false);
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {!callConnected && !sessionStarted && (
// //         <Button title="Connect Call" onPress={connectCall} />
// //       )}

// //       {callConnected && barrierActive && (
// //         <View>
// //           <Text style={styles.barrierText}>Call Connected</Text>
// //           <Text style={styles.countdown}>
// //             Starting in: {barrierTime} seconds
// //           </Text>
// //           <Text style={styles.infoText}>You won't be charged yet.</Text>
// //           <Button title="Cancel Call" onPress={cancelCall} color="red" />
// //         </View>
// //       )}

// //       {sessionStarted && (
// //         <View>
// //           <Text style={styles.sessionText}>🔮 Calling Astrologer...</Text>
// //           <Button title="End Session" onPress={cancelCall} color="red" />
// //         </View>
// //       )}
// //     </SafeAreaView>
// //   );
// // };

// // export default CallScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingHorizontal: 24,
// //     backgroundColor: '#fff',
// //   },
// //   barrierText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     textAlign: 'center',
// //   },
// //   countdown: {
// //     fontSize: 32,
// //     color: '#007AFF',
// //     textAlign: 'center',
// //     marginBottom: 10,
// //   },
// //   infoText: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     marginBottom: 20,
// //     color: 'gray',
// //   },
// //   sessionText: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     color: 'green',
// //     marginBottom: 20,
// //   },
// // });

// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from "react-native";
// import { COLORS } from "../theme";
// import { Ionicons } from "@expo/vector-icons";

// export default function ChatScreen({ route, navigation }) {
//   const { astrologer } = route.params;
//   const [messages, setMessages] = useState([
//     {
//       id: "1",
//       text: `Hello, I'm ${astrologer.name}. How can I help you today?`,
//       from: "astrologer",
//       time: "09:30",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const flatListRef = useRef();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: () => (
//         <View style={styles.header}>
//           <Image source={astrologer.avatar} style={styles.avatar} />
//           <View>
//             <Text style={styles.name}>{astrologer.name}</Text>
//             <Text style={styles.status}>Online</Text>
//           </View>
//         </View>
//       ),
//     });
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const newMessage = {
//       id: Date.now().toString(),
//       text: input,
//       from: "user",
//       time: new Date().toLocaleTimeString().slice(0, 5),
//     };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           text: "Thank you for your message. I'll get back to you shortly.",
//           from: "astrologer",
//           time: new Date().toLocaleTimeString().slice(0, 5),
//         },
//       ]);
//     }, 1000);
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, backgroundColor: COLORS.white }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={70}
//     >
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.msgRow,
//               item.from === "user" ? styles.userRow : styles.astrologerRow,
//             ]}
//           >
//             {item.from === "astrologer" && (
//               <Image source={astrologer.avatar} style={styles.msgAvatar} />
//             )}
//             <View
//               style={[
//                 styles.msgBubble,
//                 item.from === "user" ? styles.userBubble : styles.astrologerBubble,
//               ]}
//             >
//               <Text style={{ color: item.from === "user" ? COLORS.white : COLORS.black }}>
//                 {item.text}
//               </Text>
//               <Text style={styles.msgTime}>{item.time}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
//         onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//       />

//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           value={input}
//           onChangeText={setInput}
//           placeholder="Type your message..."
//           placeholderTextColor={COLORS.gray}
//         />
//         <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
//           <Ionicons name="send" size={22} color={COLORS.white} />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   header: { flexDirection: "row", alignItems: "center" },
//   avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
//   name: { fontWeight: "bold", fontSize: 17, color: COLORS.black },
//   status: { fontSize: 12, color: COLORS.success },
//   msgRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 14 },
//   astrologerRow: { justifyContent: "flex-start" },
//   userRow: { justifyContent: "flex-end", alignSelf: "flex-end" },
//   msgAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
//   msgBubble: { maxWidth: "75%", padding: 12, borderRadius: 14, marginBottom: 2 },
//   astrologerBubble: {
//     backgroundColor: "#F2F3F5",
//     borderTopLeftRadius: 4,
//     marginLeft: 3,
//   },
//   userBubble: {
//     backgroundColor: COLORS.orange,
//     borderTopRightRadius: 4,
//     marginRight: 3,
//   },
//   msgTime: { fontSize: 10, color: COLORS.gray, textAlign: "right", marginTop: 2 },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     backgroundColor: COLORS.white,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 22,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 15,
//     marginRight: 8,
//     color: COLORS.black,
//   },
//   sendBtn: {
//     backgroundColor: COLORS.orange,
//     borderRadius: 50,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";

export default function CallScreen({ route, navigation }) {
  const contact = route?.params?.contact;
  const [seconds, setSeconds] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>No contact selected. Please choose a contact to call.</Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
          <Text style={{ color:COLORS.orange }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.avatarWrap}>
        <Image source={contact.avatar} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Text style={styles.status}>Call in Progress...</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <TouchableOpacity style={styles.endBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="call-outline" size={28} color="#fff" />
        <Text style={styles.endBtnText}>End Call</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center",
  },
  avatarWrap: {
    backgroundColor: COLORS.orangeLight,
    borderRadius: 70,
    padding: 6,
    marginBottom: 16,
  },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: COLORS.orange },
  name: { fontSize: 22, fontWeight: "bold", color: COLORS.black, marginTop: 8 },
  phone: { fontSize: 16, color: COLORS.grayDark, marginTop: 2 },
  status: { fontSize: 17, color: COLORS.orange, marginTop: 16, fontWeight: "bold" },
  timer: { fontSize: 32, color: COLORS.success, fontWeight: "bold", marginTop: 10 },
  endBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.danger,
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 12,
    marginTop: 36,
  },
  endBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});