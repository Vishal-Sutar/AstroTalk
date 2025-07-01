import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import OtpScreen from "./screens/OtpScreen";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CallScreen from "./screens/CallScreen";
import { COLORS } from "./theme";
import ChatListScreen from "./screens/ChatListScreen";
import ContactListScreen from "./screens/ContactListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 function MainTabs(){
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({color,size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home-outline" size={size} color={color}/>;
          }
          if (route.name === "Chat") {
            return <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />;
          }
           if (route.name === "Call") {
            return <Ionicons name="call-outline" size={size} color={color} />;
          }},

        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Chat") iconName = "chatbubbles";
          else if (route.name === "Call") iconName = "call";
          return <Ionicons name={iconName} size={size} color={COLORS.orangeDark} />;
          //if any error occurs check COLORS.orangrDark
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatListScreen} />
      <Tab.Screen name="Call" component={ContactListScreen} />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="OTP" component={OtpScreen} /> */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
         <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#fff", elevation: 0, shadowOpacity: 0 },
            headerTintColor: COLORS.orange,
          }}
        />
        <Stack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: "Calling",
            headerStyle: { backgroundColor: "#fff", elevation: 0, shadowOpacity: 0 },
            headerTintColor: COLORS.orange,
          }}
        />
        {/* Optionally, you can add Chat and Call screens here for modal presentation, etc. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



