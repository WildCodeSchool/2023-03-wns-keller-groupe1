import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { CarbonData } from "./entity/CarbonData";

import { UserFriends } from "./entity/UserFriends";
import { UserGroupe } from "./entity/UserGroupe";
import { Donation } from "./entity/Donation";
import { BankDetails } from "./entity/BankDetails";


const dataSource = new DataSource({
	type: "sqlite",
	database: "./wildersdb.sqlite",
	synchronize: true,
	entities: [User, Category, CarbonData, UserGroupe, Donation, UserFriends, BankDetails],
});

export default dataSource;