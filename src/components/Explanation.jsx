import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SendStatus from "./SendStatus";
import { Box, Button } from "@mui/material";
import GetStatus from "./GetStatus";

const Explanation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";
  const player = searchParams.get("player") || "";
  const sendStatus = "crush";
  const getStatus = "explanation";
  const handleSubmit = () => {
    SendStatus({ roomId, player, sendStatus });
    navigate(`/room?roomId=${roomId}&player=${player}`);
  };
  return (
    <>
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
      <GetStatus roomId={roomId} status={getStatus} />
    </>
  );
};

export default Explanation;
