import { cppLanguage } from "@codemirror/lang-cpp";
import { pythonLanguage } from "@codemirror/lang-python";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback, useEffect, useState } from "react";

function CodeEditor({ setCode, language }) {
  const [value, setValue] = useState(
    '#include <stdio.h>\nint main() {// メッセージを出力printf("Hello, World!");\nprintf("簡単なC言語プログラムです");\n// 変数を宣言して値を出力\nint number = 42;\nprintf("数値: %d", number);\nreturn 0;}'
  );

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const getExtensions = () => {
    console.log(`language: ${language}`);
    switch (language) {
      case "python3":
        return [pythonLanguage];
      case "javascript":
        return [javascriptLanguage];
      case "c":
      default:
        return [cppLanguage];
    }
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "20px" }}>
      {/* 左揃えに設定 */}
      <ReactCodeMirror
        value={value}
        onChange={onChange}
        theme={dracula}
        extensions={getExtensions()} // 言語に基づいて拡張を切り替える
        height="400px"
        style={{ width: "600px" }}
      />
    </div>
  );
}

export default CodeEditor;
