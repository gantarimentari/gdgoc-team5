'use client';
import React, { use, useEffect, useState } from 'react';
import JobDetail from '@/components/dashboard/JobDetail';
import { getAllJobs } from '@/services/api';

export default function JobDetailPage({ params }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams?.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data = await getAllJobs();
        const jobsArray = Array.isArray(data) ? data : (data?.jobs || []);
        
        // Cari job berdasarkan ID
        const foundJob = jobsArray.find(j => String(j.id) === String(jobId));
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          // Fallback jika job tidak ditemukan
          setJob({
            id: jobId,
            title: 'Job Not Found',
            roleTitle: 'Job Not Found',
            description: 'Lowongan pekerjaan tidak ditemukan.',
            state: 'Closed',
            candidates: []
          });
        }
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setJob({
          id: jobId,
          title: 'Error Loading Job',
          roleTitle: 'Error Loading Job',
          description: 'Gagal memuat detail lowongan pekerjaan.',
          state: 'Closed',
          candidates: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Job not found</p>
      </div>
    );
  }

  return <JobDetail job={job} />;
}
