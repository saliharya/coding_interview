import { useState } from "react";
import { BsEyeFill, BsPencilFill, BsTrashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { User } from "@/pages/api/types";

const UserTable = ({ users }: { users: User[] }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const router = useRouter();

    const handleView = (user: User) => setSelectedUser(user);

    const handleEdit = (user: User) => {
        setEditedUser(user);
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {
        setIsDeleting(true);
        try {
            await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });
            users.splice(users.findIndex((user) => user.id === id), 1);
            setIsDeleting(false);
            router.refresh();
        } catch (error) {
            console.error("Error deleting user:", error);
            setIsDeleting(false);
        }
    };

    const handleSaveEdit = async (editedData: User) => {
        try {
            await fetch(`/api/users/${editedData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedData),
            });
            const index = users.findIndex((user) => user.id === editedData.id);
            if (index !== -1) {
                users[index] = editedData;
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser(null);
    };

    return (
        <div className="mt-4">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Alamat</th>
                        <th className="px-4 py-2">Jenis Kelamin</th>
                        <th className="px-4 py-2">Tanggal Lahir</th>
                        <th className="px-4 py-2">Tanggal Input</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
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
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <BsTrashFill />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                    <h2 className="text-xl font-bold mb-2">Detail Pengguna</h2>
                    <div>
                        <p>Nama: {selectedUser.nama}</p>
                        <p>Alamat: {selectedUser.alamat}</p>
                        <p>Jenis Kelamin: {selectedUser.jenisKelamin === "P" ? "Pria" : "Wanita"}</p>
                        <p>Tanggal Lahir: {selectedUser.tanggalLahir}</p>
                        <p>Tanggal Input: {selectedUser.tanggalInput}</p>
                    </div>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                        onClick={() => setSelectedUser(null)}
                    >
                        Tutup
                    </button>
                </div>
            )}

            {isEditing && editedUser && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                    <h2 className="text-xl font-bold mb-2">Edit Pengguna</h2>
                    <div className="mb-3">
                        <label htmlFor="editNama" className="block text-gray-700 font-bold mb-2">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="editNama"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={editedUser.nama}
                            onChange={(e) => setEditedUser({ ...editedUser, nama: e.target.value })}
                        />
                    </div>
                    {/* Add other fields similarly */}
                    <div className="flex justify-end">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={() => handleSaveEdit(editedUser)}
                        >
                            Simpan
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleCancelEdit}
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
