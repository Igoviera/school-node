import { IsUser } from "../model/user.model";
import userRepository from "../repositories/user.repository";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const secretJWT = process.env.JWT_SECRET_KEY || ""

class UserServices {
    async createUser(user: IsUser) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        return userRepository.createUser(user)
    };

    async auth(email: string, password: string) {
        const user = await userRepository.userByEmail(email)

        if (!user) throw new Error('Email ou senha inválido')

        const result = await bcrypt.compare(password, user.password)

        if (result) {
            return Jwt.sign({
                email: user.email,
                _id: user._id
            }, secretJWT, {
                expiresIn: '24h'
            })
        }

        throw new Error('Email ou senha inválido')
    }

    async userById(id: string) {
        const userId = await userRepository.userById(id)

        if (!userId) {
            throw new Error('Usuário não encontrado')
        }
        return userId
    };

    async updateUser(id: string, user: Partial<IsUser>) {
        const userId = await userRepository.userById(id)

        if (!userId) {
            throw new Error('Usuário não encontrado')
        }
        return await userRepository.updateUser(id, user)
    };

    async deleteUser(id: string) {
        const user = await userRepository.deleteUser(id)
        if (!user) {
            throw new Error('Usuário não encontrado')
        }
        return 'Usuário excluido com sucesso'
    }
}

export default new UserServices();