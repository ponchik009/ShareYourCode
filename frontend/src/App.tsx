import AppRouter from "./components/Router/AppRouter";
import { useAppSelector } from "./hooks/hooks";
import MainLayout from "./layout/MainLayout";

function App() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className="App">
      <MainLayout isAuth={isAuth}>
        <AppRouter isAuth={isAuth} />
      </MainLayout>
    </div>
  );
}

export default App;
