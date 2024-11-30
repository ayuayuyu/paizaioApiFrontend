import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
const apiUrl = import.meta.env.VITE_API_URL;

const Paiza = () => {
  const [code, setCode] = useState(""); // ユーザーが入力するコード
  const [language, setLanguage] = useState("c"); // プログラミング言語
  const [output, setOutput] = useState(""); // 実行結果

  const handleRunCode = async () => {
    const proxyUrl = `${apiUrl}/run`; // FastAPIのURL

    const data = {
      source_code: code,
      language: language,
      api_key: "guest",
      longpoll: true,
    };

    try {
      // ジョブの作成
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const initialResult = await response.json();
      console.log("Initial Response:", initialResult);

      if (!initialResult.id) {
        setOutput("ジョブの作成に失敗しました。");
        return;
      }

      // ジョブの結果をポーリング
      const jobId = initialResult.id;
      const detailsUrl = `${apiUrl}/details/${jobId}`; // FastAPIの結果取得エンドポイント

      const pollJobDetails = async () => {
        const detailsResponse = await fetch(detailsUrl);
        const jobDetails = await detailsResponse.json();
        console.log("Job Details Response:", jobDetails);

        if (jobDetails.status === "completed") {
          if (jobDetails.stdout || jobDetails.stderr) {
            setOutput(jobDetails.stdout || jobDetails.stderr);
          } else {
            setOutput("実行結果が見つかりませんでした。");
          }
        } else if (jobDetails.status === "running") {
          setTimeout(pollJobDetails, 1000); // 1秒後に再ポーリング
        } else {
          setOutput("コードの実行に失敗しました。");
        }
      };

      pollJobDetails();
    } catch (error) {
      console.error("エラー:", error);
      setOutput("エラーが発生しました。");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>オンラインコードエディタ</h1>
      <CodeEditor setCode={setCode} language={language} />
      {/* <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
        placeholder="ここにコードを入力してください..."
      /> */}
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="c">C</option>
        <option value="python3">Python 3</option>
        <option value="javascript">JavaScript</option>
      </select>
      <br />
      <button onClick={handleRunCode}>実行</button>
      <h2>結果</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default Paiza;
