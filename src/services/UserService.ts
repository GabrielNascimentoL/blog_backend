import { LoginDTO, RegisterDTO } from "../dtos/AuthDTO";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function loginService(data: LoginDTO) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } })

    if (!user) {
        throw new Error("Invalid credentials")
    }

    const passwordMatch = await bcrypt.compare(password, user.getDataValue('password'));

    if (!passwordMatch) {
        throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
        {
            sub: user.getDataValue('id'),
            email: user.getDataValue('email')
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '90d' }
    )


    return {
        token,
        user: {
            name: user.getDataValue('name'),
            email: user.getDataValue('email')
        }
    }
}

export async function registerService(data: RegisterDTO) {

    const { name, email, password } = data;

    try {
        const userExists = await User.findOne({ where: { email } })

        if (userExists) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword })

        return {
            name,
            email
        }
    } catch (error) {
        throw new Error("Error creating user")
    }

}