"use client";

import { useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { authKey } from "@/constants/authkey";
import { getFromCookiesClient } from "@/utils/local-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { connectSocket } from "@/lib/socket/socket";
import { MotionBox, MotionButton, MotionStack, MotionTypography } from "@/FramerMotion/MotionComponents";

type Message = { from: "user" | "bot"; text: string };



export default function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hello! How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const openChat = () => {
    setIsOpen(true);

    if (!socketRef.current) {
      const token = getFromCookiesClient(authKey);
      // NEXT_PUBLIC_SOCKET_URL
      const socket = connectSocket();
      //  io("http://localhost:5000", {
      //   auth: token ? { token } : undefined,
      //   autoConnect: true,
      // });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });

      socket.on("bot_reply_stream", (msg: string) => {
       
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.from === "bot") {
            const updated = [...prev];
            updated[updated.length - 1] = { from: "bot", text: last.text + msg };
            return updated;
          } else {
            return [...prev, { from: "bot", text: msg }];
          }
        });
        // setTimeout(() =>
           setIsBotTyping(false)
        // , 500);
      });
    }
  };

  const sendMessage = () => {
     setIsBotTyping(true);
    if (!input.trim() || !socketRef.current || !socketRef.current.connected) return;

    socketRef.current.emit("user_message", input);
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
  };

  const handleClose = ()=>{
    setIsOpen(false)
    socketRef?.current?.emit("end_chat")

  }
  return (
    <>
      {/* Floating chat button with motion */}
      <AnimatePresence>
        {!isOpen && (
          <MotionStack
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0], opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            position="fixed"
            bottom={"1rem"}
            right={"1rem"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            >
              <MotionTypography
                color="secondary.dark"
                paddingX={1}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: ["100%", "0%", "0%", "100%"],
                  opacity: [0, 1, 1,0],
                }}
                transition={{
                  duration: 5,
                  times: [0, 0.2, 0.9, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                bgcolor={"secondary.light"}
                height={"fit-content"}
                position="relative"
                right={"0.5rem"}>
                 
                Hi! How may I help you?
               
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8
                 border-l-rose-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></span>
              
              </MotionTypography>

                <MotionButton
                  onClick={openChat}
                  variant="contained"
                  color="error"
                  animate={{
                    scale: [1,1.02,1],
                    boxShadow: [
                      "0 0 0px #ff4d4d",
                      "0 0 25px #ff4d4d",
                      "0 0 0px #ff4d4d",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    fontSize: 45,
                    boxShadow: "0 0 10px #ff4d4d",
                    bgcolor: "secondary.light",
                    borderWidth: "2px",
                    borderColor: "secondary.dark",
                    borderStyle: "solid",
                    "&:hover": { backgroundColor: "#c53030" },
                  }}
                >
                  🤖
                </MotionButton>
  


          </MotionStack>
        )}
      </AnimatePresence>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "tween", stiffness: 200, damping: 25 }}
            className="fixed bottom-4 right-4 w-80 z-50 "
          >
            <Paper elevation={6} 
              sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  height: 400,
                  borderBottomRightRadius: "40px",
                  
              
              }}>
              {/* Header */}
              <Box sx={{ p: 1, borderBottom: "1px solid #ccc",
                
                borderTopLeftRadius: "-50px" , display: "flex", 
                justifyContent: "flex-end", 
                bgcolor: "#f5f5f5" }}>
              
                <IconButton sx={{float:"right"}} size="small" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflowY: "auto", p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                {messages.map((msg, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                      bgcolor: msg.from === "user" ? "secondary.main" : "grey.300",
                      color: msg.from === "user" ? "white" : "black",
                      p: 1,
                      borderRadius: 2,
                      maxWidth: "75%",
                      fontSize: 14,
                    }}
                  >
                    {msg.text}
                  </Box>
                ))}

                {/* Typing indicator */}
                {isBotTyping && (
                  <Box sx={{ alignSelf: "flex-start", display: "flex", gap: 0.5, p: 1, bgcolor: "grey.300", borderRadius: 2 }}>
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i*0.1 }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#555" }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Input */}
              <Box sx={{ display: "flex", gap: 1, p: 1, borderTop: "1px solid #ccc" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Ask anything about Helpmates..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <IconButton color="error" onClick={sendMessage} disabled={!input.trim()}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
