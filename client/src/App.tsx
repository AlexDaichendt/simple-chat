import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { ChatProvider } from "./components/ChatProvider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/room/:roomId"
          element={
            <ChatProvider>
              <Room />
            </ChatProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
