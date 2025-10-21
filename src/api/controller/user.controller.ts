import { User } from "../model/index";

export class UserController {
  // Register a new user with email verification
  public register = async (params: any) => {
    try {
      process.stderr.write(`params: ${JSON.stringify(params)}\n`);
      const { name, email, password, role } = params;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          status: false,
          message: "Email already in use",
        };
      }

      const user = await User.create({ name, email, password, role });
      return {
        status: true,
        message: "User Created successfully",
        data: user,
      };
    } catch (err) {
      return {
        status: false,
        message: err,
      };
    }
  };

  public getAll = async () => {
    try {
      const users = await User.findAll();
      return {
        status: true,
        message: "User Created successfully",
        data: users,
      };
    } catch (err) {
      return {
        status: false,
        message: err,
      };
    }
  };

  public getUserById = async (params: any) => {
  try {
    const { id } = params;
    const user = await User.findByPk(id);

    if (!user) {
      return {
        status: false,
        message: "User not found",
        data: null,
      };
    }

    return {
      status: true,
      message: "User fetched successfully",
      data: user,
    };
  } catch (err) {
    return {
      status: false,
      message: (err as Error).message,
    };
  }
};

}
