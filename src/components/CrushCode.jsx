import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Http from "./Http";
import { useSearchParams, useNavigate } from "react-router-dom";
import SendStatus from "./SendStatus";
import GetStatus from "./GetStatus";

const CrushCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(""); // ユーザーが入力するコード
  const [language, setLanguage] = useState("c"); // プログラミング言語
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";
  const player = searchParams.get("player") || "";
  //今のステータスの確認のステータス
  const getStatus = "crush";
  //次の状態にするためにhttp通信で送るステータス
  const sendStatus = "fix";

  const handleRunCode = async () => {
    Http({ code, roomId, player });
    SendStatus({ roomId, player, sendStatus });
    navigate(`/Get?roomId=${roomId}&player=${player}`);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>CrushCode</h1>
      <CodeEditor setCode={setCode} language={language} />
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="c">C</option>
        <option value="python3">Python 3</option>
        <option value="javascript">JavaScript</option>
      </select>
      <GetStatus roomId={roomId} status={getStatus} />
      <br />
      <button onClick={handleRunCode}>送信</button>
    </div>
  );
};

export default CrushCode;
