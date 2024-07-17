"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/pages/api/types";
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";
import Button from "./Button";

interface UserFormProps {
    users: User[];
    setUsers: (users: User[]) => void;
}

const UserForm = ({ users, setUsers }: UserFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [isAdding, setIsAdding] = useState(false);

    const onSubmit = async (data: any) => {
        const formattedDate = new Date(data.tanggalLahir).toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        );

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
                <Button onClick={() => setIsAdding(true)}>Tambah Pengguna</Button>
            )}
            {isAdding && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <InputField
                        label="Nama"
                        id="nama"
                        register={register("nama", { required: "Nama harus diisi" })}
                        error={errors.nama?.message as string | undefined}
                    />
                    <InputField
                        label="Alamat"
                        id="alamat"
                        register={register("alamat")}
                        error={errors.alamat?.message as string | undefined}
                    />
                    <RadioGroup
                        label="Jenis Kelamin"
                        register={register("jenisKelamin", {
                            required: "Jenis kelamin harus dipilih",
                        })}
                        options={[
                            { label: "Pria", value: "P" },
                            { label: "Wanita", value: "W" },
                        ]}
                        error={errors.jenisKelamin?.message as string | undefined}
                    />
                    <InputField
                        label="Tanggal Lahir"
                        id="tanggalLahir"
                        type="date"
                        register={register("tanggalLahir", {
                            required: "Tanggal lahir harus diisi",
                        })}
                        error={errors.tanggalLahir?.message as string | undefined}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" variant="green">
                            Simpan
                        </Button>
                        <Button onClick={() => setIsAdding(false)} variant="red">
                            Batal
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserForm;