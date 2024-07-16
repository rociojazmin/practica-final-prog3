import { AppContextProvider } from "@/contexts/AppContext";
import Card from "../components/Card";

export default function Home() {
  return (
    <AppContextProvider>
      <Card />
    </AppContextProvider>
  );
}
