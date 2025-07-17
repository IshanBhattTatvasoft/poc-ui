import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const WebSocketContext = createContext();

export const useWebSocketMessage = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [webSocketMessage, setWebSocketMessage] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      setWebSocketMessage(event.data);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ webSocketMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
