"use client";
import { useState, useEffect } from "react";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";
import { User } from "@/pages/api/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-24 px-4">
      <h1 className="text-4xl font-bold mb-4">Daftar Pengguna</h1>
      {isLoading && (
        <div className="flex items-center justify-center">
          <p className="text-lg">Sedang memuat data...</p>
        </div>
      )}
      {!isLoading && (
        <>
          <UserForm users={users} setUsers={setUsers} />
          <UserTable users={users} />
        </>
      )}
    </main>
  );
}