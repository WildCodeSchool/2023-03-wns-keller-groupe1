import React, { Dispatch, SetStateAction } from "react";

interface IGlobalState {
  isLogged: boolean;
}

interface IGlobalStateContextProps {
  children: React.ReactNode;
}

const GlobalStateContext = React.createContext<
  [IGlobalState, Dispatch<SetStateAction<IGlobalState>>] | undefined
>(undefined);

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider = ({ children }: IGlobalStateContextProps) => {
  const [globalState, setGlobalState] = React.useState<IGlobalState>({
    isLogged: false,
  });

  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
