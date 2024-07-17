"use client";

import { User } from "@/pages/api/types";
import { useState } from "react";

interface UserEditProps {
    user: User;
    onSave: (editedData: User) => void;
    onCancel: () => void;
}

const UserEdit = ({ user, onSave, onCancel }: UserEditProps) => {
    const [editedUser, setEditedUser] = useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Edit Pengguna</h2>
            <div className="mb-3">
                <label htmlFor="editNama" className="block text-gray-700 font-bold mb-2">
                    Nama
                </label>
                <input
                    type="text"
                    id="editNama"
                    name="nama"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedUser.nama}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="editAlamat" className="block text-gray-700 font-bold mb-2">
                    Alamat
                </label>
                <input
                    type="text"
                    id="editAlamat"
                    name="alamat"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedUser.alamat}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="editJenisKelamin" className="block text-gray-700 font-bold mb-2">
                    Jenis Kelamin
                </label>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="editMale"
                        name="jenisKelamin"
                        value="P"
                        checked={editedUser.jenisKelamin === "P"}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="editMale" className="text-gray-700">
                        Pria
                    </label>
                    <input
                        type="radio"
                        id="editFemale"
                        name="jenisKelamin"
                        value="W"
                        checked={editedUser.jenisKelamin === "W"}
                        onChange={handleChange}
                        className="mr-2 ml-4"
                    />
                    <label htmlFor="editFemale" className="text-gray-700">
                        Wanita
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="editTanggalLahir" className="block text-gray-700 font-bold mb-2">
                    Tanggal Lahir
                </label>
                <input
                    type="date"
                    id="editTanggalLahir"
                    name="tanggalLahir"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedUser.tanggalLahir}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => onSave(editedUser)}
                >
                    Simpan
                </button>
                <button
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onCancel}
                >
                    Batal
                </button>
            </div>
        </div>
    );
};

export default UserEdit;