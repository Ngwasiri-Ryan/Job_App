import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { COLORS, icons, FONTS } from '../../constants';
import DotLoader from '../../components/loading/DotLoader';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // Track loader state

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true); // Show loader

    try {
      const options = {
        method: 'POST',
        url: 'https://chatgpt-vision1.p.rapidapi.com/gpt4',
        headers: {
          'x-rapidapi-key': '7fd213d47emshb49cf8bd294a249p1de61ajsn820c90d640ca',
          'x-rapidapi-host': 'chatgpt-vision1.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {
          messages: [{ role: 'user', content: input }],
          web_access: false,
        },
      };

      const response = await axios.request(options);

      // Extract the bot's response from the `result` field
      const botContent = response.data?.result || 'Sorry, I didn’t catch that.';

      const botMessage = {
        id: Date.now().toString() + '-bot',
        role: 'bot',
        content: botContent,
      };

      // Add bot response to chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('API Error:', error);

      const errorMessage = {
        id: Date.now().toString() + '-error',
        role: 'bot',
        content: 'Something went wrong. Please try again later.',
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const renderMessage = ({ item, index }) => (
    <View>
      <View
        style={[
          styles.messageWrapper,
          item.role === 'user' ? styles.userWrapper : styles.botWrapper,
        ]}
      >
        {item.role === 'bot' && (
          <Image source={icons.chatbot} style={styles.botImage} />
        )}
        {item.role === 'user' && (
          <Image source={icons.userIcon} style={styles.userImage} />
        )}
        <View
          style={[
            styles.messageContainer,
            item.role === 'user' ? styles.userMessage : styles.botMessage,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>
      {item.role === 'user' && loading && index === messages.length - 1 && (
        <View style={styles.loaderContainer}>
          <DotLoader />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>JobQuest Chatbot</Text>
        <Image source={icons.chatbot} style={styles.botImage} />
      </View>
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={icons.chatbot} style={styles.bot} />
          <Text style={styles.text}>Start chatting with JobQuest Chatbot</Text>
          <Text style={styles.emptyStateText}>Chat with our cahtbot to get more job info qualificatios and reqirements</Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image source={icons.share} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 20,
    marginBottom: 5,
    backgroundColor: COLORS.white, // Make sure the background is set
    padding: 20, // Add some padding for better touch targets
    borderRadius: 10, // Optional: To give rounded corners
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Position of the shadow
        shadowOpacity: 0.2, // Opacity of the shadow
        shadowRadius: 4, // Blur radius of the shadow
      },
      android: {
        elevation: 5, // Shadow elevation for Android
      },
    }),
  },
  heading: {
    color: COLORS.black,
    ...FONTS.h3,
  },
  chatContainer: {
    flex: 1,
  },
  text:{
   ...COLORS.darkgray,
   ...FONTS.body2,
   marginBottom:10,
  },
  chatContent: {
    padding: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  botWrapper: {
    justifyContent: 'flex-start',
  },
  bot:{
    height:100,
    width:100,
    marginBottom:20,
    },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#87CEEB',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 50,
    justifyContent:'center',
    alignContent:'center'
  },
  botImage: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  userImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  loaderContainer: {
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 20,
  },
  icons: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    width:'70%'
  },
});
