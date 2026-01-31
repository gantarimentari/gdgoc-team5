'use client';
import React, { useState, useEffect } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import Button from '@/components/Buttons';
import { useSearchParams, useRouter } from 'next/navigation';

const ConfirmationPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token dari URL query parameter (dari link email)
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid or missing verification token');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!token) {
      setError('Invalid verification token');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Ganti dengan API call yang sebenarnya
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token: token,
      //     newPassword: formData.newPassword
      //   })
      // });
      // const data = await response.json();
      
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Reset password with token:', token);
      console.log('New password:', formData.newPassword);
      
      setSuccess('Password changed successfully! Redirecting to login...');
      
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      
    } catch (err) {
      setError('Failed to change password. Please try again or request a new reset link.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className='text-3xl font-bold text-black py-3 mb-3'>
          Forgot Password
        </h1>
        <p className='text-gray-600 text-sm'>
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          name="newPassword"
          placeholder="enter new password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          disabled={loading || !token}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={loading || !token}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm">{success}</p>
        )}

        <Button
          type="submit"
          disabled={loading || !token}
          className="w-full"
        >
          {loading ? 'Changing Password...' : 'Change Password'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ConfirmationPasswordPage;
 