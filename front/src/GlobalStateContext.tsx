import React, { useState, useEffect } from "react";
import { ICarbonData } from "./interface/CarbonData";

type ISortedData = {
  [year: string]: {
    [month: string]: ICarbonData[];
  };
};

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
  userCarbonData: any | null;
  setUserCarbonData: React.Dispatch<React.SetStateAction<any | null>>;
  logout: () => void;
  calculateTotalCo2: (selected: string) => void;
  setUserFriends: React.Dispatch<React.SetStateAction<any[]>>;
  userFriends: any[];
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
  const [userCarbonData, setUserCarbonData] = useState<ICarbonData[] | null>(
    null
  );
  const [userFriends, setUserFriends] = useState<any[]>([]);

  const logout = () => {
    setIsLogged(false);
    setUser(null);
    setIsMonthChart(true);
    setIsBarChart(true);
    setDropdownOptions([]);
    setInitialData([]);
    setSelectedValue("");
    setTotalCo2(0);
    setUserCarbonData(null);
    setUserFriends([]);
  };

  const calculateTotalCo2 = (selected: string) => {
    let total = 0;
    if (isMonthChart && selected) {
      const [month, year] = selected.split(" ");
      const carbonDataForMonth = initialData[year]?.[month];
      if (carbonDataForMonth) {
        carbonDataForMonth.forEach((data: any) => {
          total += data.consumption;
        });
      }
    } else if (!isMonthChart && selected) {
      const carbonDataForYear = initialData[selected];
      if (carbonDataForYear) {
        Object.values(carbonDataForYear).forEach((monthData: any) => {
          monthData.forEach((data: any) => {
            total += data.consumption;
          });
        });
      }
    }
    setTotalCo2(total);
  };

  useEffect(() => {
    if (userCarbonData && userCarbonData.length > 0) {
      const sortedCarbonData = [...userCarbonData].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const sortedData: ISortedData = {};
      const options: string[] = [];
      const yearsSet = new Set();
      let total = 0;

      sortedCarbonData.forEach((data) => {
        const date = new Date(data.createdAt);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString("fr-FR", { month: "long" });

        if (!sortedData[year]) {
          sortedData[year] = {};
        }
        if (!sortedData[year][month]) {
          sortedData[year][month] = [];
          if (isMonthChart) {
            options.push(`${month} ${year}`);
          } else {
            if (!yearsSet.has(year)) {
              yearsSet.add(year);
              options.push(year);
            }
          }
        }
        sortedData[year][month].push(data);

        if (
          (isMonthChart && `${month} ${year}` === selectedValue) ||
          (!isMonthChart && year === selectedValue)
        ) {
          total += data.consumption;
        }
      });

      if (options.length > 0) {
        options.reverse();
        const selected = options[0];
        setSelectedValue(selected);
        calculateTotalCo2(selected);
      }

      setInitialData(sortedData);
      setDropdownOptions(options);
      setTotalCo2(total);
    }
  }, [userCarbonData, isMonthChart]);

  useEffect(() => {
    if (selectedValue) {
      calculateTotalCo2(selectedValue);
    }
  }, [selectedValue, isMonthChart]);

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
        calculateTotalCo2,
        userCarbonData,
        setUserCarbonData,
        userFriends,
        setUserFriends,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
