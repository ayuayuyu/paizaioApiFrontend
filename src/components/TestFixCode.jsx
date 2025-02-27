import CodeEditor from "./CodeEditor";
import { useState } from "react";
const TestFixCode = () => {
  const [code, setCode] = useState(""); // 初期コード
  const [language, setLanguage] = useState("c"); // 言語選択
  const request = async () => {
    const url = "http://localhost:3000/api/fasfsafs/codeExchange"; // APIのURL
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("ネットワーク応答が正常ではありません");
      }
      const data = await response.json();
      console.log("Success:", data);
      // ① エスケープされた `\n` を本来の改行に戻す
      let formattedCode = data.diff ? data.diff.replace(/\\n/g, "\n") : "";
      // ② 2つ以上の空白を改行 (`\n`) に変換
      formattedCode = formattedCode.replace(/ {2,}/g, "\n");
      console.log(`formattedCode: ${formattedCode}`);
      setCode(formattedCode);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FixCode</h1>
      <CodeEditor setCode={setCode} code={code} language={language} />
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="c">C</option>
        <option value="python3">Python 3</option>
        <option value="javascript">JavaScript</option>
      </select>
      <button onClick={request}>Fix Code</button>
    </div>
  );
};

export default TestFixCode;
