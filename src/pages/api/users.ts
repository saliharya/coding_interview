import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./types";
import { users } from "./data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.status(200).json(users);
    } else if (req.method === "POST") {
        const newUser: User = req.body;
        users.push(newUser);
        res.status(201).json(newUser);
    } else if (req.method === "PUT") {
        const { id } = req.query;
        const userId = parseInt(id as string, 10);
        const updatedUser: User = req.body;

        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
            users[index] = updatedUser;
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } else if (req.method === "DELETE") {
        const userId = parseInt(req.query.id as string, 10);
        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
