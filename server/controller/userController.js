import { UserModel } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    res.status(200).send(allUser);
  } catch (error) {
    console.log("error while fetching user", error);
  }
};
