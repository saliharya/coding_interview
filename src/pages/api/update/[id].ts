import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../types";
import { users } from "../data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const userId = parseInt(id as string, 10);
        const updatedUser: User = req.body;

        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
            users[index] = {
                ...users[index],
                ...updatedUser,
            };
            res.status(200).json(users[index]);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
