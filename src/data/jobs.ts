
export interface Job {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    requirements: string[];
    location: string;
    type: string;
    postedDate: string; // ISO string for sorting
    applyUrl: string;
}

export const jobs: Job[] = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        shortDescription: "We are looking for an experienced Frontend Developer to lead our UI team.",
        fullDescription: "As a Senior Frontend Developer, you will be responsible for architecting and building scalable user interfaces using React and TypeScript. You will work closely with designers and backend engineers to deliver high-quality web applications.",
        requirements: ["5+ years of experience with React", "Strong TypeScript skills", "Experience with Tailwind CSS", "Knowledge of web performance optimization"],
        location: "Remote",
        type: "Full-time",
        postedDate: "2023-10-28T10:00:00Z",
        applyUrl: "https://example.com/apply/frontend-senior",
    },
    {
        id: "2",
        title: "Machine Learning Engineer",
        shortDescription: "Join our AI team to build state-of-the-art machine learning models.",
        fullDescription: "We are seeking a Machine Learning Engineer to design and implement ML models for our core products. You will be working with large datasets and deploying models to production.",
        requirements: ["Strong background in Python and ML frameworks (PyTorch, TensorFlow)", "Experience with NLP or Computer Vision", "Understanding of MLOps practices"],
        location: "Bangalore, India",
        type: "Full-time",
        postedDate: "2023-10-27T14:30:00Z",
        applyUrl: "https://example.com/apply/ml-engineer",
    },
    {
        id: "3",
        title: "Full Stack Developer",
        shortDescription: "Work across the stack to build end-to-end features.",
        fullDescription: "You will be working on both the frontend and backend of our applications. This role requires a good understanding of database design, API development, and UI implementation.",
        requirements: ["Experience with Node.js and React", "Knowledge of SQL and NoSQL databases", "Familiarity with cloud platforms (AWS/GCP)"],
        location: "Hyderabad, India",
        type: "Full-time",
        postedDate: "2023-10-26T09:15:00Z",
        applyUrl: "https://example.com/apply/fullstack",
    },
    {
        id: "4",
        title: "Product Designer",
        shortDescription: "Design intuitive and beautiful user experiences.",
        fullDescription: "We are looking for a Product Designer to create user-centric designs. You will be conducting user research, creating wireframes, and designing high-fidelity prototypes.",
        requirements: ["Portfolio demonstrating strong UX/UI skills", "Proficiency in Figma", "Experience with design systems"],
        location: "Remote",
        type: "Contract",
        postedDate: "2023-10-25T11:00:00Z",
        applyUrl: "https://example.com/apply/designer",
    },
    {
        id: "5",
        title: "DevOps Engineer",
        shortDescription: "Manage and optimize our infrastructure.",
        fullDescription: "Your role will involve managing our CI/CD pipelines, ensuring high availability of our services, and optimizing cloud infrastructure costs.",
        requirements: ["Experience with Docker and Kubernetes", "Strong scripting skills (Bash/Python)", "Knowledge of Terraform or Ansible"],
        location: "Pune, India",
        type: "Full-time",
        postedDate: "2023-10-24T16:45:00Z",
        applyUrl: "https://example.com/apply/devops",
    },
    // Generating more mock jobs to test pagination (need > 12 total)
    ...Array.from({ length: 15 }).map((_, i) => ({
        id: `mock-${i + 6}`,
        title: `Software Engineer ${i + 1}`,
        shortDescription: "Exciting opportunity to work on cutting-edge technologies.",
        fullDescription: "This is a great opportunity for a motivated software engineer to join a dynamic team. You will be working on challenging problems and contributing to the success of our products.",
        requirements: ["Bachelor's degree in Computer Science", "Good problem-solving skills", "Team player"],
        location: "Mumbai, India",
        type: "Full-time",
        postedDate: new Date(Date.now() - (i + 5) * 86400000).toISOString(), // Generate past dates
        applyUrl: "https://example.com/apply/general",
    })),
];
