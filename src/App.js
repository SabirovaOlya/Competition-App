import Main from './pages/main/layout'
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <Main />
    </NextUIProvider>
  );
}

export default App;
