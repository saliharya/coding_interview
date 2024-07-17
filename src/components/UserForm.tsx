"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/pages/api/types";

const UserForm = ({ users, setUsers }: { users: User[]; setUsers: (users: User[]) => void }) => {
    const { register, handleSubmit, reset } = useForm();
    const [isAdding, setIsAdding] = useState(false);

    const onSubmit = async (data: any) => {
        const formattedDate = new Date(data.tanggalLahir).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const newUser: User = {
            id: users.length + 1,
            nama: data.nama,
            alamat: data.alamat,
            jenisKelamin: data.jenisKelamin,
            tanggalLahir: formattedDate,
            tanggalInput: new Date().toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        };

        try {
            await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            setUsers([...users, newUser]);
            reset();
            setIsAdding(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="mb-4">
            {!isAdding && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsAdding(true)}
                >
                    Tambah Pengguna
                </button>
            )}
            {isAdding && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="nama" className="block text-gray-700 font-bold mb-2">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="nama"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("nama", { required: true })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alamat" className="block text-gray-700 font-bold mb-2">
                            Alamat
                        </label>
                        <input
                            type="text"
                            id="alamat"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("alamat")}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jenisKelamin" className="block text-gray-700 font-bold mb-2">
                            Jenis Kelamin
                        </label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="male"
                                name="jenisKelamin"
                                value="P"
                                {...register("jenisKelamin")}
                                className="mr-2"
                            />
                            <label htmlFor="male" className="text-gray-700">
                                Pria
                            </label>
                            <input
                                type="radio"
                                id="female"
                                name="jenisKelamin"
                                value="W"
                                {...register("jenisKelamin")}
                                className="mr-2 ml-4"
                            />
                            <label htmlFor="female" className="text-gray-700">
                                Wanita
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tanggalLahir" className="block text-gray-700 font-bold mb-2">
                            Tanggal Lahir
                        </label>
                        <input
                            type="date"
                            id="tanggalLahir"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("tanggalLahir")}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsAdding(false)}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserForm;