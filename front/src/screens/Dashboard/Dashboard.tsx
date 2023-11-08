import React, { useState, useEffect } from "react";
import Styles from "./Dashboard.module.css";
import Statistics from "../../components/statistics/Statistics";
import FriendsContainer from "../../components/shared/FriendsContainer";
import CarbonExpenseList from "../../components/dashboard/CarbonExpenseList";
import { useGlobalState } from "../../GlobalStateContext";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import { useGetUserFriendList } from "../../services/getUserFriendList";

const Dashboard = () => {
  const {
    isLogged,
    user,
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
    setUserFriends,
    userFriends,
    setUserCarbonData,
  } = useGlobalState();

  const userId = user?.userId;
  const {
    loading: loadingCarbonData,
    error: errorCarbonData,
    data: userCarbonData,
  } = useUserCarbonData(userId);
  const {
    userFriendsLists,
    error: errorFriends,
    loading: loadingFriends,
    refetch: refetchFriends,
  } = useGetUserFriendList(userId);

  useEffect(() => {
    if (!loadingFriends && !errorFriends && userFriendsLists) {
      setUserFriends(userFriendsLists);
    }
  }, [userFriendsLists, loadingFriends, errorFriends, setUserFriends]);
  setUserCarbonData(userCarbonData);

  console.log("initialData", initialData);
  console.log(selectedValue);
  return (
    <div className={Styles.Maincontainer}>
      <div className={Styles.MaincontainerLeft}>
        <Statistics
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          isMonthChart={isMonthChart}
          setIsMonthChart={setIsMonthChart}
          isBarChart={isBarChart}
          setIsBarChart={setIsBarChart}
          dropdownOptions={dropdownOptions}
          initialData={initialData}
          totalCo2={totalCo2}
        />
        <div className={Styles.containerCarbon}>
          <CarbonExpenseList
            initialData={initialData}
            selectedValue={selectedValue}
            userId={userId}
          />
        </div>
      </div>
      <div className={Styles.containerSocial}>
        <div className={Styles.containerSocialTop}>
          <p>Communautés</p>
        </div>
        <div className={Styles.containerSocialBottom}>
          <FriendsContainer friendsList={userFriendsLists} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
