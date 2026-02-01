'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ListIcon, UsersIcon, CardIcon } from '@/components/icons';
import Pageheader from './layouts/PageHeader';
import AddNewJob from './modals/AddNewJob';
import { getAllJobs, createJob } from '@/services/api';

const JobOpening = ({ jobs: propJobs }) => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [viewMode, setViewMode] = useState('grid'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mapJobsData = (response) => {
    const jobsArray = response?.data?.jobs || (Array.isArray(response) ? response : []);
    
    return jobsArray.map(job => ({
      ...job,
  
      roleTitle: job.title || job.roleTitle || "Untitled Role",
      roleCategory: job.roleCategory || job.category || "General",
      state: job.state || job.status || "Active",
      candidateCount: job.candidateCount || job.candidates?.length || 0
    }));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setErrorMessage(""); 
      try {
        const response = await getAllJobs();
        console.log("📥 Raw response from GET API:", response);
        setJobs(mapJobsData(response)); 
      } catch (error) {
        console.error('❌ Failed to fetch jobs:', error);
        setErrorMessage("Gagal mengambil data. Pastikan Backend menyala."); 
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = async (newJobData) => {
    try {
      console.log('📤 Sending to BE:', newJobData);
      const response = await createJob(newJobData); 
      console.log('✅ POST Success:', response);
      
      // Kasih jeda sedikit agar DB PostgreSQL punya waktu memproses
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Ambil data terbaru
      const updatedResponse = await getAllJobs();
      setJobs(mapJobsData(updatedResponse));
      
      setIsModalOpen(false);
      alert("Job Berhasil Disimpan ke Database!");
    } catch (error) {
      console.error('❌ Error in handleAddJob:', error);
      alert("Gagal menyimpan ke database: " + error.message);
    }
  };

  // Filter & Counts (Tetap sama)
  const filteredJobs = jobs.filter(job => {
    // if (activeFilter === 'all') return true;
    // if (activeFilter === 'active') return job.state === 'Active';
    // if (activeFilter === 'closed') return job.state === 'Closed';
    return true;
  });

  // const counts = {
  //   all: jobs.length,
  //   active: jobs.filter(j => j.state === 'Active').length,
  //   closed: jobs.filter(j => j.state === 'Closed').length
  // };

  return (
    <div className="p-6">
      <Pageheader 
        title="Job Opening" 
        addButtonText="New Job"
        onAddClick={() => setIsModalOpen(true)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        // counts={counts}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500 italic">Sedang mengambil data...</p>
        </div>
      )}

      {errorMessage && !loading && (
        <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{errorMessage}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">Coba Muat Ulang</button>
        </div>
      )}

      {!loading && !errorMessage && filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-500">Belum ada lowongan pekerjaan.</p>
        </div>
      )}

      {!loading && !errorMessage && filteredJobs.length > 0 && (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/dashboard/job-opening/${job.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{job.roleTitle}</h3>
                {/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.state === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>{job.state}</span> */}
              </div>
              {/* <p className="text-sm text-gray-600 mb-4">{job.roleCategory}</p> */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-700">
                  <UsersIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{job.candidateCount} Candidate</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddNewJob 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
};

export default JobOpening;