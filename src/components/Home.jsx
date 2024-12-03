import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  TextField,
  Select,
  MenuItem,
  useMediaQuery,
  Container,
} from "@mui/material";
import SendStatus from "./SendStatus";

const Home = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [player, setPlayer] = useState(""); // playerの状態を追加
  const sendStatus = "explanation";

  useEffect(() => {
    setName("");
    setPassword("");
    setPlayer(""); // 初期化
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
  };

  const handleSubmit = () => {
    if (name && password && player) {
      const roomId = password;
      console.log(`password: ${password} player: ${player} status: ${status}`);
      SendStatus({ roomId, player, sendStatus });
      navigate(`/Explanation?roomId=${password}&player=${player}`);
    } else {
      alert("名前、合言葉、そしてプレイヤーを選択してください");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91vh",
        width: "91vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ marginBottom: 2, fontWeight: "bold" }}
          >
            ログイン
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <TextField
                label="名前"
                placeholder="名前を入力"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                size={isSmallScreen ? "small" : "medium"}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="合言葉"
                placeholder="合言葉を入力"
                value={password}
                onChange={handlePassChange}
                variant="outlined"
                size={isSmallScreen ? "small" : "medium"}
              />
            </FormControl>

            <FormControl fullWidth>
              <Select
                value={player}
                onChange={handlePlayerChange}
                displayEmpty
                variant="outlined"
                size={isSmallScreen ? "small" : "medium"}
              >
                <MenuItem value="" disabled>
                  プレイヤーを選択
                </MenuItem>
                <MenuItem value="player1">プレイヤー1</MenuItem>
                <MenuItem value="player2">プレイヤー2</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
                color: "white",
                fontWeight: "bold",
              }}
            >
              タップ
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
