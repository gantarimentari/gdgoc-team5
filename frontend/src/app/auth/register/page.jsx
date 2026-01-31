'use client';
import React, { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import Button from '@/components/Buttons';
// import { GoogleIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/api';

const RegisterPage = ()=> {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleChange = (e)=> {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]){
      setErrors(prev=> ({ ...prev, [name]: ''}));
    }
    if(error){
      setError('');
    }
  };
  const handleSubmit = async (e)=> {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert("Password harus minimal 8 karakter!");
      return;
    }

    try {
      // Panggil fungsi register
      await registerUser({
        email: formData.email,
        password: formData.password,
        // Jika backend butuh username, sertakan juga:
        // name: formData.username 
      });

      alert("Registrasi Berhasil! Silakan login.");
      router.push("/auth/login"); // Arahkan ke halaman login
    } catch (err) {
      alert(err.message); // Akan muncul jika email sudah terdaftar (Error 409)
    }
  };
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  return(
    <AuthLayout>
      <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black  py-3 mb-3">
            Register
          </h1>
          
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder=""
            required
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
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
            Register
          </Button>

          {/* Divider */}
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div> */}

          {/* Google Sign In */}
          {/* <Button
            type="button" 
            variant="google"
            icon={<GoogleIcon />}
          >
            Sign in with Google
          </Button> */}

          {/* Register Link */}
          <div className=" text-sm text-gray-600 mt-4">
            Sudah punya akun ?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 font-medium">
                Masuk sekarang
            </Link>
          </div>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage;