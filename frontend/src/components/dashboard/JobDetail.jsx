'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadCV from './modals/UploadCV';
import CandidateDetailView from './modals/CandidateDetailView';
import Link from 'next/link';

// Dummy 
const DUMMY_CANDIDATES = [
  {
    id: 1,
    cn: 'CN',
    name: 'John Doe',
    matchScore: 85,
    status: 'Needs Review',
    experience: '5 years',
    skills: 'React, Node.js',
    education: 'Computer Science'
  },
  {
    id: 2,
    cn: 'CN',
    name: 'Jane Smith',
    matchScore: 92,
    status: 'Needs Review',
    experience: '7 years',
    skills: 'Python, Django',
    education: 'Software Engineering'
  },
  {
    id: 3,
    cn: 'CN',
    name: 'Mike Johnson',
    matchScore: 78,
    status: 'Under Review',
    experience: '3 years',
    skills: 'Java, Spring Boot',
    education: 'Information Technology'
  },
  {
    id: 4,
    cn: 'CN',
    name: 'Sarah Williams',
    matchScore: 88,
    status: 'Approved',
    experience: '6 years',
    skills: 'Vue.js, TypeScript',
    education: 'Computer Science'
  },
  {
    id: 5,
    cn: 'CN',
    name: 'David Brown',
    matchScore: 95,
    status: 'Approved',
    experience: '8 years',
    skills: 'React, AWS',
    education: 'Software Engineering'
  },
  {
    id: 6,
    cn: 'CN',
    name: 'Emily Davis',
    matchScore: 72,
    status: 'Needs Review',
    experience: '4 years',
    skills: 'Angular, MongoDB',
    education: 'Computer Science'
  },
  {
    id: 7,
    cn: 'CN',
    name: 'Robert Wilson',
    matchScore: 81,
    status: 'Rejected',
    experience: '5 years',
    skills: 'Go, Docker',
    education: 'Information Systems'
  }
];

const JobDetail = ({ job, onBack }) => {
  const router = useRouter();
  const [candidates, setCandidates] = useState(job?.candidates || DUMMY_CANDIDATES);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [jobStatus, setJobStatus] = useState(job?.state || 'Active');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [jobDescription, setJobDescription] = useState(job?.description || '');

  console.log("JobDetail component rendered with job:", job);
  console.log("Job candidates:", job?.candidates);

  // Update candidates when job prop changes
  React.useEffect(() => {
    if (job?.candidates) {
      setCandidates(job.candidates);
    }
  }, [job]);

  // Handle back navigation
  const handleBack = () => {
    console.log("Back button clicked");
    try {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    } catch (error) {
      console.error("Error navigating back:", error);
      window.history.back();
    }
  };

  // Filter candidates based on active filter
  const filteredCandidates = candidates.filter(candidate => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high-match') return candidate.matchScore >= 80;
    if (activeFilter === 'needs-review') return candidate.status === 'Needs Review';
    if (activeFilter === 'under-review') return candidate.status === 'Under Review';
    return true;
  });

  // Count for filter tabs
  const counts = {
    all: candidates.length,
    highMatch: candidates.filter(c => c.matchScore >= 80).length,
    needsReview: candidates.filter(c => c.status === 'Needs Review').length,
    underReview: candidates.filter(c => c.status === 'Under Review').length
  };

  const handleUploadCVs = () => {
    setIsUploadModalOpen(true);
  };

  const handleUpload = (newCandidates) => {
    setCandidates(prev => [...newCandidates, ...prev]);
  };

  const handleViewDetails = (candidate) => {
    // Otomatis ubah status ke Under Review kalau sebelumnya Needs Review
    // Normalize status comparison (case-insensitive)
    const currentStatus = (candidate.status || '').toLowerCase().replace(/\s+/g, '-');
    
    if (currentStatus === 'needs-review') {
      const updatedCandidate = { ...candidate, status: 'Under Review' };
      setCandidates(prev => prev.map(c => 
        c.id === candidate.id ? updatedCandidate : c
      ));
      setSelectedCandidate(updatedCandidate);
    } else {
      setSelectedCandidate(candidate);
    }
    setIsDetailViewOpen(true);
  };

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    ));
    // Update selected candidate juga kalau masih terbuka
    setSelectedCandidate(prev => 
      prev && prev.id === candidateId ? { ...prev, status: newStatus } : prev
    );
  };

  const handleSaveJobStatus = () => {
    // TODO: Implement API call to update job status
    console.log('Saving job status:', jobStatus);
    setIsEditingStatus(false);
    // Simulate API call - replace with actual API call
    alert(`Job status updated to: ${jobStatus}`);
  };

  const handleSaveDescription = () => {
    // TODO: Implement API call to update job description
    console.log('Saving job description:', jobDescription);
    setIsEditingDescription(false);
    // Simulate API call - replace with actual API call
    alert('Job description updated successfully');
  };

  const handleDeleteJob = () => {
    if (window.confirm(`Are you sure you want to delete "${job?.title || job?.roleTitle}"? This action cannot be undone.`)) {
      // TODO: Implement API call to delete job
      console.log('Deleting job:', job?.id);
      alert('Job deleted successfully');
      // Navigate back after deletion
      if (onBack) {
        onBack();
      } else {
        router.push('/dashboard/job-opening');
      }
    }
  };

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
            onClick={handleUploadCVs}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13V4M10 4L7 7M10 4L13 7M4 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload CVs
          </button>
        </div>
      </div>

      {/* Job Information Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          {/* Status Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Status
            </label>
            {isEditingStatus ? (
              <div className="flex items-center gap-2">
                <select
                  value={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                  className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
                <button
                  onClick={handleSaveJobStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setJobStatus(job?.state || 'Active');
                    setIsEditingStatus(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                  jobStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {jobStatus}
                </span>
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit Status"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80969 15.8327 1.80969C16.1422 1.80969 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1897 3.85714 18.1897 4.16667C18.1897 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Job Description Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            {!isEditingDescription && (
              <button
                onClick={() => setIsEditingDescription(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Description"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80969 15.8327 1.80969C16.1422 1.80969 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1897 3.85714 18.1897 4.16667C18.1897 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          {isEditingDescription ? (
            <div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                placeholder="Enter job description..."
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSaveDescription}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Description
                </button>
                <button
                  onClick={() => {
                    setJobDescription(job?.description || '');
                    setIsEditingDescription(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {jobDescription || 'No description available'}
            </p>
          )}
        </div>

        {/* Requirements Section (if available) */}
        {job?.requirements && job.requirements.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-900">{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 border border-gray-200 w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All {counts.all}
        </button>
        <button
          onClick={() => setActiveFilter('high-match')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'high-match'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          &gt;80% Match {counts.highMatch}
        </button>
        <button
          onClick={() => setActiveFilter('needs-review')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'needs-review'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Needs Review {counts.needsReview}
        </button>
        <button
          onClick={() => setActiveFilter('under-review')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'under-review'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Under Review {counts.underReview}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-16 px-4 py-3 text-left text-sm font-medium text-gray-700">No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">CN</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Match Score</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Experience</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Skills</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Details</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <tr 
                  key={candidate.id}
                  className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{candidate.cn}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{candidate.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.matchScore}%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.experience}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.skills}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleViewDetails(candidate)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${
                      candidate.status === 'Needs Review' ? 'bg-yellow-50 text-amber-600 border-amber-100' : 
                      candidate.status === 'Under Review' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      candidate.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {candidate.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <p className="text-gray-500">No candidates found</p>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-6 flex ">
        <Link
        href="/dashboard/job-opening"
          // onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Job Opening
        </Link>
      </div>

      {/* Modals */}
      <UploadCV
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        jobId={job?.id}
      />

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
