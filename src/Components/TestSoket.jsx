import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TestSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [socketInstance, setSocketInstance] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [ackResponse, setAckResponse] = useState(null);
  const [notificationData, setNotificationData] = useState(null);

  // Socket.IO configuration
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsInVzZXJJZCI6IjY3ZmEyY2JkN2ZiZTZkYzNkYjk0MzRkNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTcyNzUzOCwiZXhwIjoxNzU0MzY3NTM4fQ.gp98XVYeHvITJaieSQEfjJSDyhJLflpkpO5sntJibdA";
  const socketUrl = "http://10.0.70.112:9020";

  useEffect(() => {
    // Initialize Socket.IO client
    const socket = io(socketUrl, {
      transports: ["websocket"],
      auth: { token },
    });

    setSocketInstance(socket);

    socket.on("connect", () => {
      setIsConnected(true);
      setError(null);
      console.log("Socket.IO connected successfully!");
    });

    // Listen for any event (for debugging)
    socket.onAny((eventName, ...args) => {
      console.log(`Event received: ${eventName}`, args);
      setMessages((prev) => [...prev, { event: eventName, data: args }]);
    });

    // Listen for the 'notification' event
    socket.on("notification", (data) => {
      setNotificationData(data);
      setMessages((prev) => [...prev, data]);
      console.log("Notification received:", data);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log("Message received:", message);
    });

    socket.on("connect_error", (err) => {
      setIsConnected(false);
      setError(`Connection error: ${err.message}`);
      console.error("Socket.IO connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      setError(`Disconnected: ${reason}`);
      console.log("Socket.IO disconnected:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (eventName = "message") => {
    if (socketInstance && isConnected && messageInput.trim()) {
      socketInstance.emit(eventName, messageInput, (response) => {
        // Handle acknowledgment response from the server
        setAckResponse(response);
        console.log("Acknowledgment received:", response);
      });
      console.log(`Sent message: ${messageInput} with event: ${eventName}`);
      setMessageInput(""); // Clear input after sending
    } else {
      console.log("Cannot send message: Not connected or empty message");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Socket.IO Test</h2>
      <p className="mb-2">
        Status:{" "}
        <span className={isConnected ? "text-green-600" : "text-red-600"}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </p>
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}

      {/* Input and Send Buttons */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter message (e.g., testing)"
          className="flex-1 p-2 border rounded"
          disabled={!isConnected}
        />
        <button
          onClick={() => sendMessage("message")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!isConnected || !messageInput.trim()}
        >
          Send (message)
        </button>
        <button
          onClick={() => sendMessage("testing")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!isConnected || !messageInput.trim()}
        >
          Send (testing)
        </button>
      </div>

      {/* Acknowledgment Response */}
      {ackResponse && (
        <p className="mb-2 text-blue-600">
          Acknowledgment: {JSON.stringify(ackResponse)}
        </p>
      )}

      {/* Notification Data */}
      {notificationData && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Notification:</h3>
          <p>Status Code: {notificationData.statusCode}</p>
          <p>Success: {notificationData.success ? "Yes" : "No"}</p>
          <p>Unread Count: {notificationData.unreadCount}</p>
        </div>
      )}

      {/* Messages */}
      <h3 className="text-lg font-semibold mb-2">Messages:</h3>
      <ul className="border p-4 rounded max-h-60 overflow-y-auto">
        {messages.length === 0 ? (
          <li className="text-gray-500">No messages received</li>
        ) : (
          messages.map((msg, index) => (
            <li key={index} className="mb-1">
              {typeof msg === "object" ? JSON.stringify(msg) : msg}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TestSocket;
