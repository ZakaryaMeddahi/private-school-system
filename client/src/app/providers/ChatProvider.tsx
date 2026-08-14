import React, { createContext, useState, useRef } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chatRef = useRef();
  const roomInfoRef = useRef();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  // const [messages, setMessages] = useState([
  //     'hello',
  //     'hi',
  //     'how are you',
  //     'I am fine',
  //     'what about you',
  //     'I am good',
  //     'bye',
  //     'goodbye',
  //     'see you later',
  //     'ok',
  //     'thanks',
  //     'thank you',
  //     'welcome',
  //     'you are welcome',
  //     'good morning',
  //     'good afternoon',
  // ]);

  return (
    <ChatContext.Provider
      value={{
        roomInfoRef,
        chatRef,
        messages,
        setMessages,
        courses,
        setCourses,
        selectedCourse,
        setSelectedCourse,
        teacherInfo,
        setTeacherInfo,
        members,
        setMembers,
        pinnedMessages,
        setPinnedMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
