import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import SendStatus from "./SendStatus";
const apiUrl = import.meta.env.VITE_API_URL_2;
const GetCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";
  const player = searchParams.get("player") || "";
  const url = `${apiUrl}/getCode/${roomId}`;
  console.log(`roomId: ${roomId}, player: ${player}`);
  const sendStatus = "fix";
  const sendData = { player: player };
  const get = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //JSON形式で送る
      body: JSON.stringify(sendData),
    })
      //接続できたかの確認
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正常ではありません");
        }
        return response.json();
      })
      //ここのdataにレスポンスの値が入っている
      .then((data) => {
        console.log("Success:", data);
        if (data.status == "exchanged") {
          console.log(`status: ${data.status}`);
          console.log(`status: ${data.code}`);
          SendStatus({ roomId, player, sendStatus });
          navigate(`/Fix?roomId=${roomId}&player=${player}`, {
            state: data.code,
          });
        }
      })
      //エラーであった場合
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Box>
        <Button onClick={() => get()}>codeの取得</Button>
      </Box>
    </>
  );
};
export default GetCode;
