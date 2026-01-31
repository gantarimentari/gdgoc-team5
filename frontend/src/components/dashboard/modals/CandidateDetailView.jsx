'use client';
import React, { useState } from 'react';

const CandidateDetailView = ({ isOpen, onClose, candidate, onStatusChange }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  React.useEffect(() => {
    if (candidate?.cvFile) {
      const url = URL.createObjectURL(candidate.cvFile);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [candidate]);

  const handleApprove = () => {
    if (candidate && onStatusChange) {
      onStatusChange(candidate.id, 'approved');
      onClose();
    }
  };

  const handleReject = () => {
    if (candidate && onStatusChange) {
      onStatusChange(candidate.id, 'rejected');
      onClose();
    }
  };

  if (!isOpen || !candidate) return null;

  const analysis = candidate.aiAnalysis || {};
  const matchScore = analysis.matchScore || candidate.matchScore || 0;
  const skillsBadges = analysis.skillsBadges || [];
  const strengths = analysis.strengths || [];
  const weaknesses = analysis.weaknesses || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
            <p className="text-sm text-gray-500 mt-1">AI Screening Results</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content - Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: CV Preview */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="text-sm font-semibold text-gray-900">CV Preview</h3>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border border-gray-300 rounded-lg"
                  title="CV Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg className="mx-auto mb-4 text-gray-400" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40 8H16C14.9391 8 13.9217 8.42143 13.1716 9.17157C12.4214 9.92172 12 10.9391 12 12V52C12 53.0609 12.4214 54.0783 13.1716 54.8284C13.9217 55.5786 14.9391 56 16 56H48C49.0609 56 50.0783 55.5786 50.8284 54.8284C51.5786 54.0783 52 53.0609 52 52V20L40 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M40 8V20H52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-500">No CV uploaded</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: AI Analysis */}
          <div className="w-1/2 flex flex-col bg-white overflow-y-auto">
            <div className="p-6">
              {/* Match Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <svg className="transform -rotate-90" width="160" height="160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={matchScore >= 80 ? '#10B981' : matchScore >= 60 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - matchScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-5xl font-bold ${
                      matchScore >= 80 ? 'text-green-600' : matchScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {matchScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Match Description */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                  <svg className="flex-shrink-0 text-yellow-600 mt-0.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm text-yellow-900 font-medium">
                    {matchScore >= 80 ? 'Strong match' : matchScore >= 60 ? 'Good match' : 'Fair match'} for this position
                  </p>
                </div>
              </div>

              {/* Skills Badges */}
              {skillsBadges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsBadges.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          index % 4 === 0 ? 'bg-green-100 text-green-700 border border-green-200' :
                          index % 4 === 1 ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                          index % 4 === 2 ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                          'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Why this score? */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-left">
                  <h3 className="text-sm font-semibold text-gray-900">Why this score?</h3>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className="mt-4 space-y-3">
                  {/* Strengths */}
                  {strengths.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Strengths</h4>
                      <ul className="space-y-2">
                        {strengths.map((strength, index) => (
                          <li key={index} className="flex gap-2 text-sm text-gray-700">
                            <svg className="flex-shrink-0 text-green-500 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="8" fill="currentColor"/>
                              <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {weaknesses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Areas for Consideration</h4>
                      <ul className="space-y-2">
                        {weaknesses.map((weakness, index) => (
                          <li key={index} className="flex gap-2 text-sm text-gray-700">
                            <svg className="flex-shrink-0 text-yellow-500 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="8" fill="currentColor"/>
                              <path d="M8 4V9M8 11H8.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Candidate Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{candidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Match Score</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{matchScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{candidate.status?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Candidate ID</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{candidate.cn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Approve Candidate
          </button>
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailView;
