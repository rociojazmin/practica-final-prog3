import React from "react";
import { AppContextProvider } from "@/contexts/AppContext";
import Card from "../components/Card";
import CardsContainer from "@/containers/CardsContainer";

export default function Home() {
  return (
    <AppContextProvider>
      <CardsContainer />
    </AppContextProvider>
  );
}
