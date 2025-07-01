import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus to next field
    if (text && index < 3) {
      const nextInput = `input${index + 1}`;
      inputRefs[nextInput].focus();
    }
  };

  const inputRefs = {};

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    const mockOtp = '1234'; // This should be verified from backend

    if (enteredOtp === mockOtp) {
      setIsVerified(true);
      Alert.alert('Success', 'OTP Verified!');
    } else {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs[`input${index}`] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      {isVerified && <Text style={styles.success}>🎉 OTP Verified Successfully!</Text>}
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 5,
    fontSize: 20,
    width: 50,
    textAlign: 'center',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  success: { marginTop: 20, fontSize: 18, color: 'green' },
});
