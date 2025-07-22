import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📰 FacebookLite Feed</Text>
      <Button 
        title="View Posts" 
        onPress={() => router.push('/postFeed')} 
      />
      <Button 
        title="Create Post" 
        onPress={() => router.push('/createPost')} 
      />
      <Button title="Logout" onPress={() => router.replace('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20,
  },
}); 