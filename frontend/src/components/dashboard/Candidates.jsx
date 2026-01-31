'use client';
import React, { useState, useEffect } from 'react';
import { UsersIcon, CardIcon, ListIcon } from '@/components/icons';
import Pageheader from './layouts/PageHeader';
import CandidateDetailView from './modals/CandidateDetailView';
import UploadCV from './modals/UploadCV';

// DUMMY DATA FE 
const DUMMY_CANDIDATES = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 812-3456-7890",
    position: "Senior Frontend Developer",
    status: "Interview",
    appliedDate: "2026-01-15",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js", "TailwindCSS"],
    education: "Bachelor in Computer Science",
    cvUrl: "/cvs/john-doe.pdf",
    score: 85
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+62 813-4567-8901",
    position: "Product Manager",
    status: "Needs Review",
    appliedDate: "2026-01-14",
    experience: "7 years",
    skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
    education: "MBA in Business Administration",
    cvUrl: "/cvs/jane-smith.pdf",
    score: 90
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@email.com",
    phone: "+62 814-5678-9012",
    position: "UI/UX Designer",
    status: "Interview",
    appliedDate: "2026-01-13",
    experience: "4 years",
    skills: ["Figma", "Adobe XD", "User Testing", "Prototyping"],
    education: "Bachelor in Design",
    cvUrl: "/cvs/michael-johnson.pdf",
    score: 88
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    phone: "+62 815-6789-0123",
    position: "Backend Engineer",
    status: "Accepted",
    appliedDate: "2025-12-28",
    experience: "6 years",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
    education: "Master in Computer Engineering",
    cvUrl: "/cvs/sarah-williams.pdf",
    score: 92
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+62 816-7890-1234",
    position: "Data Analyst",
    status: "Needs Review",
    appliedDate: "2026-01-16",
    experience: "3 years",
    skills: ["Python", "SQL", "Tableau", "Excel", "Statistics"],
    education: "Bachelor in Statistics",
    cvUrl: "/cvs/david-brown.pdf",
    score: 78
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+62 817-8901-2345",
    position: "DevOps Engineer",
    status: "Interview",
    appliedDate: "2026-01-17",
    experience: "5 years",
    skills: ["Kubernetes", "Jenkins", "AWS", "Terraform", "Docker"],
    education: "Bachelor in Information Technology",
    cvUrl: "/cvs/emily-davis.pdf",
    score: 87
  },
  {
    id: 7,
    name: "Robert Miller",
    email: "robert.m@email.com",
    phone: "+62 818-9012-3456",
    position: "Senior Frontend Developer",
    status: "Rejected",
    appliedDate: "2026-01-10",
    experience: "4 years",
    skills: ["Vue.js", "JavaScript", "CSS", "HTML"],
    education: "Bachelor in Computer Science",
    cvUrl: "/cvs/robert-miller.pdf",
    score: 65
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+62 819-0123-4567",
    position: "Product Manager",
    status: "Needs Review",
    appliedDate: "2026-01-18",
    experience: "6 years",
    skills: ["Product Development", "Stakeholder Management", "Jira", "Analytics"],
    education: "Bachelor in Business Administration",
    cvUrl: "/cvs/lisa-anderson.pdf",
    score: 82
  }
];

const Candidates = ({ onNavigateToDetail }) => {
  const [candidates, setCandidates] = useState(DUMMY_CANDIDATES);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'Needs Review', 'interview', 'accepted', 'rejected'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // TODO: Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/candidates');
        // const data = await response.json();
        // setCandidates(data);
        
        // Sementara pakai dummy data
        setCandidates(DUMMY_CANDIDATES);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    // fetchCandidates();
  }, []);

  // Filter candidates based on active filter
  const filteredCandidates = candidates.filter(candidate => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Needs-review') return candidate.status === 'Needs Review';
    if (activeFilter === 'interview') return candidate.status === 'Interview';
    if (activeFilter === 'accepted') return candidate.status === 'Accepted';
    if (activeFilter === 'rejected') return candidate.status === 'Rejected';
    return true;
  });

  // Count for filter tabs
  const counts = {
    all: candidates.length,
    needsReview: candidates.filter(c => c.status === 'Needs Review').length,
    interview: candidates.filter(c => c.status === 'Interview').length,
    accepted: candidates.filter(c => c.status === 'Accepted').length,
    rejected: candidates.filter(c => c.status === 'Rejected').length
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailModalOpen(true);
  };

  const handleUploadCV = () => {
    setIsUploadModalOpen(true);
  };

  const handleAddCandidate = (newCandidate) => {
    // Add new candidate to the list
    setCandidates(prevCandidates => [newCandidate, ...prevCandidates]);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Interview':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Needs Review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <Pageheader 
        title="Candidates" 
        addButtonText="Upload CV"
        onAddClick={handleUploadCV}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={counts}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterOptions={[
          { id: 'all', label: 'All Candidates' },
          { id: 'needsReview', label: 'Needs Review' },
          { id: 'interview', label: 'Interview' },
          { id: 'accepted', label: 'Accepted' },
          { id: 'rejected', label: 'Rejected' }
        ]}
      />

      {/* Candidates Grid/List */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCandidateClick(candidate)}
          >
            {/* Header with Name and Status Badge */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-500">{candidate.email}</p>
                </div>
              </div>
            </div>

            {/* Position */}
            <p className="text-sm font-medium text-gray-700 mb-2">{candidate.position}</p>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
              {candidate.score && (
                <span className="text-xs text-gray-600">Score: {candidate.score}</span>
              )}
            </div>

            {/* Skills Preview */}
            <div className="flex flex-wrap gap-1 mb-4">
              {candidate.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {skill}
                </span>
              ))}
              {candidate.skills.length > 3 && (
                <span className="px-2 py-1 text-gray-500 text-xs">
                  +{candidate.skills.length - 3} more
                </span>
              )}
            </div>

            {/* Footer with Applied Date and Arrow */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No candidates found</p>
        </div>
      )}

      {/* Candidate Detail Modal */}
      <CandidateDetailView 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        candidate={selectedCandidate}
      />

      {/* Upload CV Modal */}
      <UploadCV 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleAddCandidate}
      />
    </div>
  );
};

export default Candidates;
