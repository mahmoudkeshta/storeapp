"use client";

import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent } from "../../components/ui";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log("Auth component mounted");
        return () => {
            console.log("Auth component unmounted");
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch("https://yourapi.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();

            if (data.status === "success") {
                console.log("Login successful:", data);
                alert(`Welcome, ${data.data.username}!`);
                localStorage.setItem("user", JSON.stringify({
                    id: data.data.user_id,
                    username: data.data.username,
                    role: data.data.role,
                    phone: data.data.phone_number,
                }));
            } else {
                setErrorMessage("Invalid login credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm p-4 shadow-lg">
                <CardContent>
                    <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <Button
                        onClick={handleLogin}
                        className="w-full py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
