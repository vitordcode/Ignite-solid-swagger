import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[] | undefined;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) {
      throw new Error("Invalid ID");
    }

    const user = this.usersRepository.findById(user_id.toString());

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.admin) {
      throw new Error("Access denied");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
