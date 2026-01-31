'use client';
import React, { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import Button from '@/components/Buttons';
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/api";


const LoginPage = () => {
  
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ 
        email: formData.email, 
        password: formData.password 
      });
      
      console.log("Respon dari Backend:", response); // LIHAT DI CONSOLE (F12)

      // Pastikan mengambil nama field yang benar (misal: token, accessToken, atau data.token)
      const token = response.token || response.accessToken || (response.data && response.data.token);

      if (token) {
        localStorage.setItem("token", token);
        
        // Ambil username dari berbagai kemungkinan struktur response
        const username = response.user?.name || response.user?.username || response.name || response.username || formData.email.split('@')[0];
        localStorage.setItem("userName", username);
        
        router.push("/dashboard");
      } else {
        alert("Token tidak ditemukan dalam respon server!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout>
      
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black  py-3 mb-3">
            Selamat Datang
          </h1>
          <p className="text-sm text-gray-600">
            Silakan masuk untuk melakukan pengelolaan kandidat anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder=""
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div>
            <Input
              id="password"
              name="password"
              type="password"
              label="password"
              placeholder=""
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            
          </div>

          {/* Login Button */}
          <Button
            type="submit" variant="auth"
           
          >
            Login
          </Button>



          {/* Register Link */}
          <div className=" text-sm text-gray-600 mt-4">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-600 font-medium">
              daftar sekarang
            </Link>
          </div>
        </form>
      
    </AuthLayout>
  )
}

export default LoginPage;