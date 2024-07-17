



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/pages/api/types";
import UserRow from "./UserRow";
import UserDetail from "./UserDetail";
import UserEdit from "./UserEdit";

interface UserTableProps {
    users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
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

    const handleDelete = async (id: number, nama: string) => {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus ${nama}?`);
        if (!confirmDelete) {
            return;
        }

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
            router.refresh();
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
                        <UserRow
                            key={user.id}
                            user={user}
                            handleView={handleView}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
            {isEditing && editedUser && (
                <UserEdit
                    user={editedUser}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default UserTable;