import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet , Image} from 'react-native';
import { COLORS , icons } from '../../constants';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

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
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image source={icons.share} style={styles.icons}/>
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
    paddingBottom:80,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.secondary,
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
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  icons:{
    height:20,
    width:20,
    tintColor:COLORS.white,
  }
});
