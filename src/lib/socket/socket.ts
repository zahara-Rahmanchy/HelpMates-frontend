// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { authKey } from "@/constants/authkey";
import { getFromCookiesClient } from "@/utils/local-storage";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    const token = getFromCookiesClient(authKey);

    socket =io(process.env. NEXT_PUBLIC_SOCKET_URL, {
      auth: token ? { token } : undefined,
       autoConnect: true,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
};
