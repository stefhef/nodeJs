import { AppDataSource } from "./dataSource";
import { User } from "./models/User";

const UserRepository = AppDataSource.getRepository(User);

export const getUsers = async () => {
    try {
        const users = await UserRepository.find();
        if (!users) {
            return null;
        }
        return users;
    } catch (err) {
        console.log("Error while get users", err);
        return null;
    }
}

export const addUser = async (user: { name: string, age: number }) => {
    try {
        const newUser = UserRepository.create(user);
        await UserRepository.save(newUser);
        return newUser;
    } catch (err) {
        console.log("Error while add user", err);
        return null;
    }
    
}

export const updateUser = async (id: number, updatedData: { name: string, age: number }) => {
    try {
        const user = await UserRepository.findOneBy({ id });
        if (!user) {
            return null;
        }
        UserRepository.merge(user, updatedData);
        await UserRepository.save(user);
        return user
    } catch (err) {
        console.log("Error while update user", err)
    }
}


export const getUserById = async (id: number) => {
    try {
        const user = await UserRepository.findOneBy({ id });
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        console.log("Error while get user by id", err);
        return null;
    }
}

export const deleteUser = async (id: number) => {
    try {
        const result = await UserRepository.delete(id)
        return (result.affected ?? 0) > 0
    } catch (err) {
        console.log("Error while delete user", err)
    }
}