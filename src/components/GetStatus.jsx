import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL_2;

const GetStatus = ({ roomId, status }) => {
  const [state, setState] = useState("");

  useEffect(() => {
    // 無名関数で非同期処理をラップ
    const fetchData = async () => {
      const url = `${apiUrl}/status/${status}/${roomId}`;
      console.log(`GetStatus : roomId: ${roomId} status: ${status}`);

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
        setState(data);
      } catch (error) {
        console.error("Error:", error);
        setState({ error: error.message });
      }
    };

    fetchData();
  }, [roomId, status]); // `status` も依存関係に追加

  return (
    <div>
      <span>status</span>: {state.status || state.error || "null"}
    </div>
  );
};

export default GetStatus;
