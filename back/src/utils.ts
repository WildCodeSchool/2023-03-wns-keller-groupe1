import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { CarbonData } from "./entity/CarbonData";

import { UserFriends } from "./entity/UserFriends";
import { UserGroupe } from "./entity/UserGroupe";
import { Donation } from "./entity/Donation";


const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",
  synchronize: true,
  entities: [User, Category, CarbonData, UserGroupe, Donation, UserFriends],
});

export default dataSource;
