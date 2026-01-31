// Shared job data for the application
export const defaultJobsData = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    roleTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    roleCategory: 'Engineering',
    location: 'Jakarta',
    type: 'Full-time',
    state: 'Active',
    candidateCount: 16,
    description: 'Looking for experienced frontend developer with React expertise',
    requirements: ['3+ years React experience', 'TypeScript knowledge', 'Good communication skills'],
    createdAt: '2026-01-10',
    candidates: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+62 123 456 7890',
        appliedDate: '2024-01-15',
        status: 'Needs Review',
        resume: '/resumes/john-doe.pdf'
      },
      {
        id: 2,
        name: 'Jane Smith', 
        email: 'jane@example.com',
        phone: '+62 098 765 4321',
        appliedDate: '2024-01-16',
        status: 'Under Review',
        resume: '/resumes/jane-smith.pdf'
      }
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    roleTitle: 'Product Manager',
    department: 'Product',
    roleCategory: 'Product',
    location: 'Jakarta',
    type: 'Full-time',
    state: 'Active',
    candidateCount: 12,
    description: 'Seeking PM with 5+ years experience',
    requirements: ['5+ years PM experience', 'Agile methodology', 'Stakeholder management'],
    createdAt: '2026-01-08',
    candidates: [
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com', 
        phone: '+62 555 123 456',
        appliedDate: '2024-01-17',
        status: 'Interview Scheduled',
        resume: '/resumes/mike-johnson.pdf'
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    roleTitle: 'UI/UX Designer',
    department: 'Design',
    roleCategory: 'Design',
    location: 'Bandung',
    type: 'Full-time',
    state: 'Active',
    candidateCount: 8,
    description: 'Creative designer needed for new projects',
    requirements: ['Figma proficiency', 'Portfolio required', 'User research experience'],
    createdAt: '2026-01-05',
    candidates: [
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+62 777 888 999',
        appliedDate: '2024-01-18',
        status: 'Needs Review',
        resume: '/resumes/sarah-wilson.pdf'
      }
    ]
  },
  {
    id: '4',
    title: 'Backend Engineer',
    roleTitle: 'Backend Engineer',
    department: 'Engineering',
    roleCategory: 'Engineering',
    location: 'Jakarta',
    type: 'Full-time',
    state: 'Closed',
    candidateCount: 20,
    description: 'Node.js and Python backend developer',
    requirements: ['Node.js experience', 'Python knowledge', 'Database design'],
    createdAt: '2025-12-20',
    candidates: [
      {
        id: 5,
        name: 'Alex Chen',
        email: 'alex@example.com',
        phone: '+62 111 222 333',
        appliedDate: '2024-01-19',
        status: 'Needs Review',
        resume: '/resumes/alex-chen.pdf'
      }
    ]
  },
  {
    id: '5',
    title: 'Data Analyst',
    roleTitle: 'Data Analyst',
    department: 'Analytics',
    roleCategory: 'Analytics',
    location: 'Jakarta',
    type: 'Full-time',
    state: 'Active',
    candidateCount: 5,
    description: 'Data analyst for business insights',
    requirements: ['SQL expertise', 'Python/R knowledge', 'Data visualization'],
    createdAt: '2025-12-15',
    candidates: []
  }
];

// In-memory storage for new jobs (in real app, this would be API/database)
let dynamicJobs = [];

export const getAllJobs = () => {
  return [...defaultJobsData, ...dynamicJobs];
};

export const addNewJob = (job) => {
  const newJob = {
    ...job,
    candidates: job.candidates || [],
    candidateCount: job.candidates ? job.candidates.length : 0
  };
  dynamicJobs.push(newJob);
  return newJob;
};

export const getJobById = (id) => {
  const allJobs = getAllJobs();
  return allJobs.find(job => job.id == id);
};

export const clearDynamicJobs = () => {
  dynamicJobs = [];
};