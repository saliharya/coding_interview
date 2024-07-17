"use client";

import { User } from "@/pages/api/types";

interface UserDetailProps {
    user: User;
    onClose: () => void;
}

const UserDetail = ({ user, onClose }: UserDetailProps) => {
    return (
        <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Detail Pengguna</h2>
            <div>
                <p>Nama: {user.nama}</p>
                <p>Alamat: {user.alamat}</p>
                <p>Jenis Kelamin: {user.jenisKelamin === "P" ? "Pria" : "Wanita"}</p>
                <p>Tanggal Lahir: {user.tanggalLahir}</p>
                <p>Tanggal Input: {user.tanggalInput}</p>
            </div>
            <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                onClick={onClose}
            >
                Tutup
            </button>
        </div>
    );
};

export default UserDetail;