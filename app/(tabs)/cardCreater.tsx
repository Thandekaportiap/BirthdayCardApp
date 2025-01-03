import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';


const STICKERS = [
  { id: 1, emoji: '🎂', label: 'Cake' },
  { id: 2, emoji: '🎈', label: 'Balloon' },
  { id: 3, emoji: '🎁', label: 'Gift' },
  { id: 4, emoji: '✨', label: 'Sparkles' },
  { id: 5, emoji: '🎉', label: 'Party' },
  { id: 6, emoji: '🌟', label: 'Star' },
];

const CARD_LAYOUTS = {
  classic: { align: 'center', spacing: 16 },
  modern: { align: 'left', spacing: 24 },
  playful: { align: 'center', spacing: 26 },
};

const CardCreator = () => {
  const [cardText, setCardText] = useState('Happy Birthday!');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('classic');
  const [fontSize, setFontSize] = useState(20);

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateCard = () => {
    bounceAnim.setValue(0);
    rotateAnim.setValue(0);
    
    Animated.parallel([
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const themes = {
    default: {
      background: 'linear-gradient(135deg, #FFE4E1, #FFB6C1)',
      text: '#000000',
      accent: '#FF69B4',
    },
    ocean: {
      background: 'linear-gradient(135deg, #E0FFFF, #87CEEB)',
      text: '#000080',
      accent: '#4169E1',
    },
    forest: {
      background: 'linear-gradient(135deg, #98FB98, #3CB371)',
      text: '#006400',
      accent: '#228B22',
    },
    sunset: {
      background: 'linear-gradient(135deg, #FFA07A,rgb(255, 71, 184))',
      text: '#800000',
      accent: '#FF4500',
    },
    galaxy: {
      background: 'linear-gradient(135deg, #483D8B, #4B0082)',
      text: '#E6E6FA',
      accent: '#9370DB',
    },
  };

  const currentTheme = themes[selectedTheme];
  const currentLayout = CARD_LAYOUTS[selectedLayout];

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          setImageUrl(selectedImage);
        }
      }
    );
  };

  const toggleSticker = (stickerId) => {
    setSelectedStickers(prev => 
      prev.includes(stickerId)
        ? prev.filter(id => id !== stickerId)
        : [...prev, stickerId]
    );
    animateCard();
  };

  const pickImage = () => {
    Alert.alert(
      'Add Image',
      'Choose an option',
      [
        {
          text: 'Choose from Gallery',
          onPress: () => {
            ImagePicker.launchImageLibrary({
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
              quality: 0.8,
            }, (response) => {
              if (!response.didCancel && !response.error) {
                setImageUrl(response.assets[0].uri);
                animateCard();
              }
            });
          }
        },
        {
          text: 'Take Photo',
          onPress: () => {
            ImagePicker.launchCamera({
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
              quality: 0.8,
            }, (response) => {
              if (!response.didCancel && !response.error) {
                setImageUrl(response.assets[0].uri);
                animateCard();
              }
            });
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.background,
            transform: [
              {
                scale: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '2deg'],
                }),
              },
            ],
          },
        ]}
      >
        {/* Sticker Container */}
        <View style={styles.stickerContainer}>
          {selectedStickers.map(stickerId => {
            const sticker = STICKERS.find(s => s.id === stickerId);
            return (
              <Text key={stickerId} style={styles.sticker}>
                {sticker.emoji}
              </Text>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.imagePickerButton} 
          onPress={pickImage}
        >
          {imageUrl ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Tap to add image</Text>
              <Text style={styles.placeholderIcon}>📸</Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={[
            styles.mainText,
            { 
              color: currentTheme.text,
              fontSize: fontSize,
              textAlign: currentLayout.align,
              marginBottom: currentLayout.spacing,
            },
          ]}
          value={cardText}
          onChangeText={setCardText}
          placeholder="Enter your greeting"
          placeholderTextColor={currentTheme.text}
        />

        <TextInput
          style={[
            styles.recipientInput,
            { 
              color: currentTheme.text,
              textAlign: currentLayout.align,
            },
          ]}
          value={recipientName}
          onChangeText={setRecipientName}
          placeholder="Dear..."
          placeholderTextColor={currentTheme.text}
        />

        <TextInput
          style={[
            styles.messageInput,
            { 
              color: currentTheme.text,
              borderColor: currentTheme.accent,
            },
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder="Write your message here..."
          placeholderTextColor={currentTheme.text}
          multiline
          numberOfLines={4}
        />
      </Animated.View>

      {/* Customization Tools */}
      <View style={styles.toolsContainer}>
        <Text style={styles.toolsTitle}>Customize Your Card</Text>
        
        {/* Sticker Picker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stickerPicker}>
          {STICKERS.map(sticker => (
            <TouchableOpacity
              key={sticker.id}
              style={[
                styles.stickerButton,
                selectedStickers.includes(sticker.id) && styles.selectedSticker,
              ]}
              onPress={() => toggleSticker(sticker.id)}
            >
              <Text style={styles.stickerEmoji}>{sticker.emoji}</Text>
              <Text style={styles.stickerLabel}>{sticker.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Font Size Slider */}
        <View style={styles.fontSizeContainer}>
          <Text style={styles.toolsSubtitle}>Font Size</Text>
          <View style={styles.fontSizeButtons}>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={() => setFontSize(prev => Math.max(12, prev - 2))}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{fontSize}px</Text>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={() => setFontSize(prev => Math.min(32, prev + 2))}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Layout Picker */}
        <View style={styles.layoutPicker}>
          <Text style={styles.toolsSubtitle}>Layout Style</Text>
          <View style={styles.layoutButtons}>
            {Object.keys(CARD_LAYOUTS).map(layout => (
              <TouchableOpacity
                key={layout}
                style={[
                  styles.layoutButton,
                  selectedLayout === layout && styles.selectedLayout,
                ]}
                onPress={() => setSelectedLayout(layout)}
              >
                <Text>{layout}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme Picker */}
        <Text style={styles.toolsSubtitle}>Color Themes</Text>
        <View style={styles.themeContainer}>
          {Object.keys(themes).map((theme) => (
            <TouchableOpacity
              key={theme}
              style={[
                styles.themeButton,
                {
                  backgroundColor: themes[theme].background,
                  borderColor: themes[theme].accent,
                  borderWidth: selectedTheme === theme ? 3 : 1,
                },
              ]}
              onPress={() => {
                setSelectedTheme(theme);
                animateCard();
              }}
            >
              <Text style={{ color: themes[theme].text }}>{theme}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Image Button */}
        <TouchableOpacity style={styles.addImageButton} onPress={selectImage}>
          <Text style={styles.addImageText}>Select Image</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FF69B4',
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  stickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sticker: {
    fontSize: 32,
    margin: 8,
  },
  placeholderImage: {
    backgroundColor: '#EEE',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recipientInput: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  toolsContainer: {
    marginTop: 20,
  },
  toolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stickerPicker: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stickerButton: {
    marginRight: 10,
    alignItems: 'center',
  },
  selectedSticker: {
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  stickerEmoji: {
    fontSize: 24,
  },
  stickerLabel: {
    marginTop: 5,
  },
  fontSizeContainer: {
    marginBottom: 20,
  },
  fontSizeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    padding: 5,
    marginRight: 10,
  },
  layoutPicker: {
    marginBottom: 20,
  },
  layoutButtons: {
    flexDirection: 'row',
  },
  layoutButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  selectedLayout: {
    backgroundColor: '#FFD700',
  },
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  themeButton: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  addImageButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addImageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CardCreator;
