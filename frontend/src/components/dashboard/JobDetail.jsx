'use client';
import React, { useState, useEffect } from 'react'; // Tambahkan useEffect di sini
import { useRouter, useParams } from 'next/navigation'; // Gabungkan import useParams di sini
import UploadCV from './modals/UploadCV';
import CandidateDetailView from './modals/CandidateDetailView';
import Link from 'next/link';
import { getJobById, deleteJob } from '@/services/api'; // Pastikan import deleteJob ada

const JobDetail = ({ onBack }) => { // HAPUS 'job' dari props agar tidak bentrok
  const router = useRouter();
  const params = useParams(); // Ambil ID dari URL
  
  // STATE UTAMA
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  // STATE UI
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [jobStatus, setJobStatus] = useState('Active');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  // 1. FUNGSI AMBIL DATA DARI DATABASE
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await getJobById(params.id); 
        
        // Sesuaikan dengan struktur data Backend (data.job atau langsung data)
        const jobData = response?.data?.job || response; 
        
        setJob(jobData);
        setJobStatus(jobData.state || jobData.status || 'Active');
        setJobDescription(jobData.description || '');
        setCandidates(jobData.candidates || []);
        
      } catch (error) {
        console.error("Gagal ambil detail job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchJobDetail();
  }, [params.id]);

  // HANDLE NAVIGASI KEMBALI
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/dashboard/job-opening');
    }
  };

  // FILTER KANDIDAT
  const filteredCandidates = candidates.filter(candidate => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high-match') return candidate.matchScore >= 80;
    if (activeFilter === 'needs-review') return candidate.status === 'Needs Review';
    if (activeFilter === 'under-review') return candidate.status === 'Under Review';
    return true;
  });

  const counts = {
    all: candidates.length,
    highMatch: candidates.filter(c => c.matchScore >= 80).length,
    needsReview: candidates.filter(c => c.status === 'Needs Review').length,
    underReview: candidates.filter(c => c.status === 'Under Review').length
  };

  const handleUpload = (newCandidates) => {
    setCandidates(prev => [...newCandidates, ...prev]);
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailViewOpen(true);
  };

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    ));
  };

  const handleSaveJobStatus = () => {
    console.log('Saving job status:', jobStatus);
    setIsEditingStatus(false);
    alert(`Job status updated to: ${jobStatus}`);
  };

  const handleSaveDescription = () => {
    console.log('Saving job description:', jobDescription);
    setIsEditingDescription(false);
    alert('Job description updated successfully');
  };

  // 2. FUNGSI DELETE YANG BENERAN NEMBAK DATABASE
  const handleDeleteJob = async () => {
    if (window.confirm(`Are you sure you want to delete this job? This action cannot be undone.`)) {
      try {
        await deleteJob(params.id);
        alert('Job deleted successfully');
        router.push('/dashboard/job-opening');
      } catch (error) {
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500 italic">Sedang memuat detail pekerjaan...</div>;
  if (!job) return <div className="p-12 text-center text-red-500">Data tidak ditemukan.</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{job?.title || job?.roleTitle || 'Job Title'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteJob}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H4.16667H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.66602 5.00016V3.3335C6.66602 2.89147 6.84161 2.46754 7.15417 2.15498C7.46673 1.84242 7.89066 1.66683 8.33268 1.66683H11.666C12.108 1.66683 12.532 1.84242 12.8445 2.15498C13.1571 2.46754 13.3327 2.89147 13.3327 3.3335V5.00016M15.8327 5.00016V16.6668C15.8327 17.1089 15.6571 17.5328 15.3445 17.8453C15.032 18.1579 14.608 18.3335 14.166 18.3335H5.83268C5.39065 18.3335 4.96673 18.1579 4.65417 17.8453C4.34161 17.5328 4.16602 17.1089 4.16602 16.6668V5.00016H15.8327Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33398 9.16683V14.1668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.666 9.16683V14.1668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete Job
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13V4M10 4L7 7M10 4L13 7M4 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload CVs
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Status</label>
        <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${jobStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {jobStatus}
        </span>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <p className="text-sm text-gray-900 whitespace-pre-wrap">{jobDescription || 'No description available'}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 border border-gray-200 w-fit">
        <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
          All {counts.all}
        </button>
        <button onClick={() => setActiveFilter('high-match')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'high-match' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
          &gt;80% Match {counts.highMatch}
        </button>
        <button onClick={() => setActiveFilter('needs-review')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'needs-review' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
          Needs Review {counts.needsReview}
        </button>
        <button onClick={() => setActiveFilter('under-review')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === 'under-review' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}>
          Under Review {counts.underReview}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Match Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Details</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{candidate.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{candidate.matchScore}%</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleViewDetails(candidate)} className="text-blue-600 hover:underline text-sm font-medium">View Details</button>
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">{candidate.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCandidates.length === 0 && <div className="p-12 text-center text-gray-500">No candidates found</div>}
      </div>

      {/* Back Button */}
      <div className="mt-6 flex">
        <Link href="/dashboard/job-opening" className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Job Opening
        </Link>
      </div>

      {/* Modals */}
      <UploadCV isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} jobId={params.id} />
      <CandidateDetailView 
        key={selectedCandidate ? `${selectedCandidate.id}-${selectedCandidate.status}` : 'none'}
        isOpen={isDetailViewOpen} 
        onClose={() => setIsDetailViewOpen(false)} 
        candidate={selectedCandidate} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};

export default JobDetail;