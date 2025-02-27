import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { useLocation, useSearchParams } from "react-router-dom";

const apiUrl = "http://localhost:3000/";

const TestSeikai = () => {
  const location = useLocation();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("c");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId") || "";

  useEffect(() => {
    setCode(location.state || "");
  }, [location.state]);

  const handleRunCode = async () => {
    if (loading) return;
    setLoading(true);

    const proxyUrl = `${apiUrl}api/paiza/codeValidator`;
    const data = { code: code.trim() };

    try {
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setOutput(result.status === "OK" ? result.status : result.message);
      console.log(`result: ${result.output}`);
    } catch (error) {
      console.error("エラー:", error);
      setOutput("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>正解判定</h1>
      <CodeEditor setCode={setCode} code={code} language={language} />
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="c">C</option>
        <option value="python3">Python 3</option>
        <option value="javascript">JavaScript</option>
      </select>
      <br />
      <button onClick={handleRunCode} disabled={loading}>
        {loading ? "実行中..." : "実行"}
      </button>
      <h2>結果</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default TestSeikai;
