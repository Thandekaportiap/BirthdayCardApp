import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CardEditor = () => {
  const [message, setMessage] = useState('Happy Birthday!');
  const [textColor, setTextColor] = useState('#000');
  const [image, setImage] = useState(null);

  // Handle image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {image && <Image source={{ uri: image }} style={styles.cardImage} />}
        <TextInput
          style={[styles.cardText, { color: textColor }]}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          multiline
        />
      </View>

      <View style={styles.controls}>
        <Button title="Pick an Image" onPress={pickImage} />
        <View style={styles.colorButtons}>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: '#000' }]}
            onPress={() => setTextColor('#000')}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: '#f00' }]}
            onPress={() => setTextColor('#f00')}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: '#00f' }]}
            onPress={() => setTextColor('#00f')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  controls: {
    alignItems: 'center',
  },
  colorButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
});

export default CardEditor;
