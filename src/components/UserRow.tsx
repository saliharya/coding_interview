"use client";

import { BsEyeFill, BsPencilFill, BsTrashFill } from "react-icons/bs";
import { User } from "@/pages/api/types";

interface UserRowProps {
    user: User;
    handleView: (user: User) => void;
    handleEdit: (user: User) => void;
    handleDelete: (id: number, nama: string) => void;
    isDeleting: boolean;
}

const UserRow = ({
    user,
    handleView,
    handleEdit,
    handleDelete,
    isDeleting,
}: UserRowProps) => {
    return (
        <tr key={user.id}>
            <td className="border px-4 py-2">{user.nama}</td>
            <td className="border px-4 py-2">{user.alamat}</td>
            <td className="border px-4 py-2">{user.jenisKelamin === "P" ? "Pria" : "Wanita"}</td>
            <td className="border px-4 py-2">{user.tanggalLahir}</td>
            <td className="border px-4 py-2">{user.tanggalInput}</td>
            <td className="border px-4 py-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleView(user)}
                >
                    <BsEyeFill />
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEdit(user)}
                >
                    <BsPencilFill />
                </button>
                {isDeleting ? (
                    <button className="bg-gray-400 cursor-not-allowed text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        <BsTrashFill />
                    </button>
                ) : (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete(user.id, user.nama)}
                    >
                        <BsTrashFill />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default UserRow;