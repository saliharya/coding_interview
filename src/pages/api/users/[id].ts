
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
        body,
    } = req;

    const userId = Number(id);

    switch (method) {
        case 'GET':
            try {
                const user = users.find((user) => user.id === userId);
                if (!user) {
                    res.status(404).json({ message: `User with ID ${userId} not found` });
                    return;
                }
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            try {
                const updatedUser = users.find((user) => user.id === userId);
                if (!updatedUser) {
                    res.status(404).json({ message: `User with ID ${userId} not found` });
                    return;
                }

                updatedUser.nama = body.nama;
                updatedUser.alamat = body.alamat;
                updatedUser.jenisKelamin = body.jenisKelamin;
                updatedUser.tanggalLahir = body.tanggalLahir;

                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            try {
                const index = users.findIndex((user) => user.id === userId);
                if (index === -1) {
                    res.status(404).json({ message: `User with ID ${userId} not found` });
                    return;
                }
                users.splice(index, 1);
                res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).json({ message: `Method ${method} Not Allowed` });
            break;
    }
}
