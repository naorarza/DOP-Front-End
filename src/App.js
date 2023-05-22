import "./App.css";
import AppRoutes from "./appRoutes";
import { AuthProvider } from "./context/AuthContext";
import ThemeProvider from "./mui";

function App() {
  



  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
