import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!name || !mobile || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.9:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile, password }),
      });

      if (response.status === 409) {
        setErrorMessage('User already exists');
      } else if (response.ok) {
        alert('Registration successful! Please login.');
        router.replace('/login'); // navigate to login
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        value={mobile}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {errorMessage !== '' && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      )}

      <Button title="Register" onPress={handleRegister} />

      <Text style={{ marginTop: 10 }}>Already have an account?</Text>
      <Button
        title="Back to Login"
        onPress={() => router.replace('/login')}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
  },
});