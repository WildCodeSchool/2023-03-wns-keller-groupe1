import dataSource from "./utils";
import { User } from "./entity/User";

const start = async (): Promise<void> => {
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.synchronize();
  await dataSource
    .getRepository(User)
    .save({
      email: "test",
      hashedPassword: "test",
      firstname: "test",
      lastname: "test",
      totalCo2: 0,
      isVerified: true,
      modifiedAt: new Date(),
      createdAt: new Date(),
    });
}

void start();