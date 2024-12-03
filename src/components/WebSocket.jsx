import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { destr } from "destr";
import { Box, Typography, Button, Stack } from "@mui/material";

const WebSocketComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";
  console.log(`ws_roomid: ${roomId}`);
  const url = `ws://127.0.0.1:8000/ws/${roomId}`;

  const [message, setMessage] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    const websocket = new ReconnectingWebSocket(url);
    socketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connection established");
      websocket.send("Hello WebSocket");
    };

    socketRef.current.onmessage = (event) => {
      setMessage(destr(event.data));
      console.log("message", event.data);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId]);

  return (
    <Box
      sx={{
        height: "88vh",
        width: "92vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        padding: "40px",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "70%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: "2.5rem",
          }}
        >
          WebSocket Demo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            fontSize: "1.2rem",
            color: "#555",
          }}
        >
          Status: <strong>{message?.status || "未受信"}</strong>
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              socketRef.current?.send("神様ですが？");
            }}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
            }}
          >
            メッセージを送信
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: "12px 24px",
              border: "2px solid",
              "&:hover": {
                borderColor: "#f50057",
                color: "#f50057",
              },
            }}
          >
            戻る
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default WebSocketComponent;
