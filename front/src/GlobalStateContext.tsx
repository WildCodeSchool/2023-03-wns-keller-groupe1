import React from "react";

interface IGlobalState {
  isLogged: boolean;
  user: any; // Type à spécifier
  isMonthChart: boolean;
  isBarChart: boolean;
  dropdownOptions: string[];
  selectedValue: string;
  totalCo2: number;
}

interface IGlobalStateContext {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: any; // Type à spécifier
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isMonthChart: boolean;
  setIsMonthChart: React.Dispatch<React.SetStateAction<boolean>>;
  isBarChart: boolean;
  setIsBarChart: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownOptions: string[];
  setDropdownOptions: React.Dispatch<React.SetStateAction<string[]>>;
  initialData: any;
  setInitialData: React.Dispatch<React.SetStateAction<any>>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  totalCo2: number;
  setTotalCo2: React.Dispatch<React.SetStateAction<number>>;
  logout: () => void;
}

interface IGlobalStateContextProps {
  children: React.ReactNode;
}

const GlobalStateContext = React.createContext<IGlobalStateContext | undefined>(
  undefined
);

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider = ({ children }: IGlobalStateContextProps) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [isMonthChart, setIsMonthChart] = React.useState(true);
  const [isBarChart, setIsBarChart] = React.useState(true);
  const [dropdownOptions, setDropdownOptions] = React.useState<string[]>([]);
  const [initialData, setInitialData] = React.useState<any>([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [totalCo2, setTotalCo2] = React.useState(0);

  const logout = () => {
    setIsLogged(false);
    setUser(null);
    setIsMonthChart(true);
    setIsBarChart(true);
    setDropdownOptions([]);
    setInitialData([]);
    setSelectedValue("");
    setTotalCo2(0);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        isMonthChart,
        setIsMonthChart,
        isBarChart,
        setIsBarChart,
        dropdownOptions,
        setDropdownOptions,
        initialData,
        setInitialData,
        selectedValue,
        setSelectedValue,
        totalCo2,
        setTotalCo2,
        logout,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
