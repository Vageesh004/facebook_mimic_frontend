import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function Login() {
  const [name, setName] = useState(''); // Changed from username to name
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.9:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,  // Changed to match backend
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Login Success', `Welcome ${data.name}`);
        router.replace('/');
      } else {
        const error = await response.json();
        Alert.alert('Login Failed', error.detail || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Name" // Changed from Username to Name
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={{ marginTop: 10 }}>New user?</Text>
      <Button title="Register" onPress={() => router.push('/signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20
  },
  title: {
    fontSize: 24, marginBottom: 20, textAlign: 'center'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 10, borderRadius: 5
  }
});