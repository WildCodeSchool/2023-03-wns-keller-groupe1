import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { CarbonData } from "./entity/CarbonData";

import { UserFriends } from "./entity/UserFriends";
import { UserGroupe } from "./entity/UserGroupe";
import { Donation } from "./entity/Donation";
import { BankDetails } from "./entity/BankDetails";

const isTestEnvironment = process.env.NODE_ENV === "test";

let dataSource: DataSource;

if (isTestEnvironment) {
  dataSource = new DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [User, Category, CarbonData, UserGroupe, Donation, UserFriends, BankDetails],
  });
} else {
  dataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [User, Category, CarbonData, UserGroupe, Donation, UserFriends, BankDetails],
  });
}


export default dataSource;
