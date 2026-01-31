'use client';
import React, { use } from 'react';
import JobDetail from '@/components/dashboard/JobDetail';

// Simple job data - HANYA 5 job yang sudah ada
const jobsData = [
  { id: '1', title: 'Senior Frontend Developer', roleTitle: 'Senior Frontend Developer', candidates: [] },
  { id: '2', title: 'Product Manager', roleTitle: 'Product Manager', candidates: [] },
  { id: '3', title: 'UI/UX Designer', roleTitle: 'UI/UX Designer', candidates: [] },
  { id: '4', title: 'Backend Engineer', roleTitle: 'Backend Engineer', candidates: [] },
  { id: '5', title: 'Data Analyst', roleTitle: 'Data Analyst', candidates: [] }
];

export default function JobDetailPage({ params }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams?.id;
  
  // Find job - support both existing jobs and new ones
  let job = jobsData.find(job => job.id == jobId);
  
  // If not found, create basic job for new ones
  if (!job) {
    job = {
      id: jobId,
      title: 'New Job',
      roleTitle: 'New Job', 
      candidates: []
    };
  }

  return <JobDetail job={job} />;
}