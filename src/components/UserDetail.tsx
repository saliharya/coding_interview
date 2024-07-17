"use client";

import { User } from "@/pages/api/types";

interface UserDetailProps {
    user: User;
    onClose: () => void;
}

const UserDetail = ({ user, onClose }: UserDetailProps) => {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Detail Pengguna</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold">Nama:</p>
                        <p>{user.nama}</p>
                    </div>
                    <div>
                        <p className="font-bold">Alamat:</p>
                        <p>{user.alamat}</p>
                    </div>
                    <div>
                        <p className="font-bold">Jenis Kelamin:</p>
                        <p>{user.jenisKelamin === "P" ? "Pria" : "Wanita"}</p>
                    </div>
                    <div>
                        <p className="font-bold">Tanggal Lahir:</p>
                        <p>{user.tanggalLahir}</p>
                    </div>
                    <div>
                        <p className="font-bold">Tanggal Input:</p>
                        <p>{user.tanggalInput}</p>
                    </div>
                    <div className="col-span-2">
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                            onClick={onClose}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;