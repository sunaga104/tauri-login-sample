import { useState } from "react";
import { useRouter } from "next/navigation";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  async function loginCheck() {
    setErrMsg('')
    const status = await invoke('login_check', { userid: userId, password:password})
    if(status == "OK"){
      router.push("/main");
    } else {
      setErrMsg('userId、またはpasswordが違います。')
    }
  }

  return (
    <div className="container">
      <h1>Welcome to My System</h1>

      <p>ログイン</p>
      <span className="errMsg">{errMsg}</span>
      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginCheck();
          }}
        >
          <div className="row">
            <input
              id="loginId"
              onChange={(e) => setUserId(e.currentTarget.value)}
              placeholder="loginId"
            />
          </div>
          <div className="row">
            <input
              id="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

    </div>
  );
}

export default App;
