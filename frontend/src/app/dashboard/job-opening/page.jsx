'use client';
import JobOpening from '@/components/dashboard/JobOpening';

// dummy jobs data untuk job opening page
const jobsData = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Jakarta',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team.',
    requirements: ['3+ years React experience', 'TypeScript knowledge', 'Good communication skills'],
    applicants: 15,
    status: 'Active'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bandung',
    type: 'Full-time',
    description: 'Looking for a creative UI/UX Designer to enhance user experiences.',
    requirements: ['Figma proficiency', 'Portfolio required', 'User research experience'],
    applicants: 8,
    status: 'Active'
  },
  {
    id: '3',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Surabaya',
    type: 'Full-time',
    description: 'Join our backend team to build scalable APIs and services.',
    requirements: ['Node.js experience', 'Database knowledge', 'API design skills'],
    applicants: 12,
    status: 'Active'
  },
  {
    id: '4',
    title: 'Product Manager',
    department: 'Product',
    location: 'Jakarta',
    type: 'Full-time',
    description: 'Lead product strategy and development for our main platform.',
    requirements: ['Product management experience', 'Analytics skills', 'Leadership experience'],
    applicants: 6,
    status: 'Active'
  }
];

export default function JobOpeningPage() {
  return <JobOpening jobs={jobsData} />;
}