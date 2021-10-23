import React, { useState, useEffect } from 'react';
import {
  ScrollView
} from 'react-native';
import { styles } from './styles';
import {Message, MessageProps} from '../Message'
import { api } from '../../services/api';

export function MessageList(){

  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fecthMessages(){
      const messageResponse = await api.get<MessageProps[]>('/messages/last3')
      setCurrentMessages(messageResponse.data)
    }

    fecthMessages()
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => <Message key={message.id} data={message}/>)}
    </ScrollView>
  );
}