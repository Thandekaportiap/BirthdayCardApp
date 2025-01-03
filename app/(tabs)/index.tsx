import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const router = useRouter();

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in title
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Scale up decorative elements
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      // Slide up button
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Birthday Card Maker
      </Animated.Text>

      <Animated.View style={[styles.decorativeContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.decorativeBalloon1} />
        <View style={styles.decorativeBalloon2} />
        <View style={styles.decorativeBalloon3} />
      </Animated.View>

      <Animated.View style={[
        styles.buttonContainer,
        { transform: [{ translateY: slideAnim }] }
      ]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/cardCreater')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginTop: 50,
  },
  decorativeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  decorativeBalloon1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFB6C1',
    margin: 10,
  },
  decorativeBalloon2: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF69B4',
    margin: 10,
  },
  decorativeBalloon3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DB7093',
    margin: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 