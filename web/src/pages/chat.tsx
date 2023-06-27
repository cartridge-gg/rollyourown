import { ChatEvent, ChatInput } from "@/components";
import Content from "@/components/Content";
import Layout from "@/components/Layout";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface ChatEventType {
  connectedUser?: boolean,
  text: string,
  type?: 'action' | 'alert' | 'game' | 'message',
}

const defaultChatMessages: ChatEventType[] = [
  {
    text: 'Game Created',
    type: 'game',
  },
  {
    text: 'Hi, ready to play? ... extra text to show text wrapping',
    type: 'message',
  },
  {
    text: 'Hi, ready to play?',
    type: 'message',
  },
  {
    text: 'Hi, ready to play?',
    type: 'message',
  },
  {
    connectedUser: true,
    text: 'glhf',
    type: 'message',
  },
  {
    text: 'New',
    type: 'alert',
  },
  {
    text: 'Shinobi was Mugged',
    type: 'action',
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatEventType[]>(defaultChatMessages);
  const [messageValue, setMessageValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value);
  }
  const handleSendMessage = () => {
    setMessages((oldMessages) => [...oldMessages, { 
      connectedUser: true,
      text: messageValue,
      type: 'message'
    }]);
    setMessageValue('');
  }

  return (
    <Layout
      title="The Wire"
      backgroundImage="url('/images/pager.gif');"
      justifyContent="space-between"
      backHeader
    >
      <Content
        maxH="calc(100vh - 250px)"
        overflowX="auto"
        flexDirection='column-reverse'
      >
        <VStack spacing="16px">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <ChatEvent
                connectedUser={message.connectedUser}
                type={message.type}
                key={index}
              >
                {message.text}
              </ChatEvent>
            ))
          ) : (
            <Text color="neon.500">Its a little lonely in here...</Text>
          )}
        </VStack>
      </Content>
      <Box w="100%" p="24px">
        <ChatInput
          value={messageValue}
          onChange={handleChange}
          onSend={handleSendMessage}
        />
      </Box>
    </Layout>
  )
}