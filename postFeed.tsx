import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Post {
  id: number;
  content: string;
  user_id: number;
  user_name: string;
  likes: number;
}

export default function PostFeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.1.9:8080/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        Alert.alert('Error', 'Failed to fetch posts');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikePost = async (postId: number) => {
    try {
      const response = await fetch(`http://192.168.1.9:8080/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Still hardcoded but now with correct syntax
        }),
      });

      if (response.ok) {
        fetchPosts();
      } else {
        const error = await response.json();
        Alert.alert('Error', error.error || 'Failed to like post');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postAuthor}>{item.user_name}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={() => handleLikePost(item.id)}>
          <Text style={styles.likeButton}>👍 {item.likes} Likes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Create New Post"
        onPress={() => router.push('/createPost')}
      />
      
      {isLoading ? (
        <Text>Loading posts...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text>No posts yet. Be the first to post!</Text>}
          refreshing={isLoading}
          onRefresh={fetchPosts}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  likeButton: {
    color: '#4267B2',
    fontSize: 14,
  },
});