"use client";

import React, { useState, useEffect } from 'react';
import { DBHomeIcon, BagIcon, UserGroupIcon, AlertCircleIcon } from "@/components/icons";
import Link from 'next/link';

export default function Dashboard() {
  const [userName, setUserName] = useState('John');
  const [metrics, setMetrics] = useState({
    jobOpening: 0,
    totalCandidates: 0,
    needsReview: 0,
  });

  const [jobOpenings, setJobOpenings] = useState([
    {
      id: 1,
      roleTitle: 'Senior Frontend Developer',
      roleCategory: 'Engineering',
      candidateCount: 16,
      state: 'Open'
    },
    {
      id: 2,
      roleTitle: 'Backend Engineer',
      roleCategory: 'Engineering', 
      candidateCount: 12,
      state: 'Open'
    },
    {
      id: 3,
      roleTitle: 'Product Manager',
      roleCategory: 'Product',
      candidateCount: 8,
      state: 'Open'
    },
    {
      id: 4,
      roleTitle: 'UI/UX Designer',
      roleCategory: 'Design',
      candidateCount: 14,
      state: 'Open'
    },
    {
      id: 5,
      roleTitle: 'Data Scientist',
      roleCategory: 'Analytics',
      candidateCount: 10,
      state: 'Open'
    },
    {
      id: 6,
      roleTitle: 'DevOps Engineer',
      roleCategory: 'Infrastructure',
      candidateCount: 6,
      state: 'Open'
    }
  ]);
  return(
    <div className='space-y-6'>
      <div className="bg-gradient-to-r from-[#5671AC] to-[#15223F] rounded-2xl shadow-xl p-6 flex items-center gap-4 shadow-[0_8px_10px_-6px_rgba(31,162,255,0.3),_0_20px_25px_-5px_rgba(31,162,255,0.3)]">
        <div className="w-20 h-20 rounded-2xl bg-white/20 shadow flex items-center justify-center flex-shrink-0">
          <p className="text-5xl">👋</p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-1">
            Welcome Back, {userName}!
          </h2>
          <p className="text-md text-white/90">
            Monitor candidate matches and manage your active job openings in one glance
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-black">Summary</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Job Opening Card */}
        <div className="gap-4 flex item-center justify-center bg-white rounded-2xl border-1 border-[#94A3B8] shadow-md  p-6">
            <div className="w-14 h-14 rounded-2xl  bg-gradient-to-r from-[#ffb900] to-[#ff6900] flex items-center justify-center">
              <BagIcon className="w-7 h-7" color="white" />
            </div>
          <div className='flex-1'> 
            <p className="text-md font-bold text-black">Job Opening</p>
            <h3 className="text-h-6 font-semibold  text-black  ">
            {metrics.jobOpening}
          </h3>
          
          </div>
          
        </div>

        {/* total candidates */}
        <div className="gap-4 flex item-center justify-center  bg-white rounded-2xl border-1 border-[#94A3B8] shadow-md p-6">
            <div className="w-14 h-14  shadow-e4 rounded-2xl bg-gradient-to-r from-[#00D5BE] to-[#00B8DB] flex items-center justify-center">
              <UserGroupIcon  className="w-7 h-7" color="white"/>
            </div>
          <div className='flex-1'>
            <p className="text-md font-bold text-black">Total Candidates</p>
            <h3 className="text-h-6 font-semibold text-black">
            {metrics.totalCandidates}
          </h3>
          
        </div>
          </div>
        {/* Needs Review */}
        <div className="gap-4 flex item-center justify-center  bg-white rounded-2xl border-[1px] border-[#94A3B8] shadow-md p-6">
          
            <div className="w-14 h-14 rounded-2xl  shadow-e4 bg-gradient-to-r from-[#fb64b6] to-[#ff2056] flex items-center justify-center">
              <AlertCircleIcon className="w-7 h-7"  color="white" />
            </div>
          <div className='flex-1'>
            <p className="text-md font-bold text-black">Evaluated</p>
            <h3 className="text-h-6 font-semibold text-black ">
            {metrics.needsReview}
          </h3>
          </div>  
        </div> 
      </div>
      
      {/* Job Opening Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Job Opening</h1>
        <Link href="/dashboard/job-opening" className="text-blue-600 hover:text-blue-800 font-medium">→</Link>
      </div>

      {/* Job Opening Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobOpenings.map((job) => (
          <Link key={job.id} href={`/dashboard/job-opening/${job.id}`} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer block">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{job.roleTitle}</h3>
                <p className="text-gray-500 text-sm">{job.roleCategory}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {job.state}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <UserGroupIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{job.candidateCount} Candidate</span>
              </div>
              <div className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}