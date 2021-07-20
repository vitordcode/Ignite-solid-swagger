import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, { name, email });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => {
      return user.email === email;
    });
  }

  turnAdmin(receivedUser: User): User {
    if (!receivedUser.id) {
      throw new Error("User has no ID");
    }

    const user = this.findById(receivedUser.id);

    if (!user) {
      throw new Error("User not found");
    }

    user.admin = true;
    user.updated_at = new Date();

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
