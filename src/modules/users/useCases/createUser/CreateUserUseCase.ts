import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if(!email || !name) {
      throw new Error("Please enter email and name!");
    }

    const emailAlreadyInUse = this.usersRepository.findByEmail(email);

    if(emailAlreadyInUse) {
      throw new Error("Invalid email");
    }

    const user = this.usersRepository.create({ email, name });

    return user;
  }
}

export { CreateUserUseCase };
