export const profile = {
  name: 'Akash H S',
  location: 'Bengaluru, Karnataka, India',
  email: 'akash3arya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akash-h-s-006766266',
  github: 'https://github.com/Akash-h-s',
  resume: '/Akash_H_S_Resume.pdf',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export const stats = [
  { value: 30, suffix: '%', label: 'faster UI rendering through memoization and lazy loading' },
  { value: 5, suffix: '+', label: 'product modules using the component library I built' },
  { value: 9.45, suffix: '', decimals: 2, label: 'CGPA out of 10 in B.E. Computer Science' },
  { value: 500, suffix: '+', label: 'problems solved on LeetCode, GeeksforGeeks and CodeChef' },
]

export const principles = [
  {
    title: 'Measure, then optimise',
    text: 'I profile first, then reach for memoization and lazy loading. At Talview that work cut UI rendering time by 30%.',
  },
  {
    title: 'Build once, reuse everywhere',
    text: 'A Storybook and Tailwind component library now serves 5+ product modules, so teams ship faster and the UI stays consistent.',
  },
  {
    title: 'Test what can break',
    text: 'Unit, integration and end-to-end suites with Jest, Vitest and Cypress, plus root cause analysis when a regression slips through.',
  },
]

export const experience = {
  role: 'Software Developer Intern',
  team: 'Workflow Tools Team',
  company: 'Talview',
  place: 'Bengaluru',
  period: 'Nov 2025 – Jun 2026',
  summary:
    'Enterprise workflow management software: React and TypeScript on the frontend, GraphQL, Temporal and serverless on the backend, and automated tests around both.',
  work: [
    {
      key: 'perf',
      title: 'Faster, safer interfaces',
      text: 'Developed optimized, secure and scalable React.js and TypeScript features for enterprise workflow software. Performance work with memoization and lazy loading reduced UI rendering time by 30%.',
      tags: ['React.js', 'TypeScript', 'Memoization', 'Lazy loading'],
    },
    {
      key: 'lib',
      title: 'A shared component library',
      text: 'Architected a reusable component library with Storybook and Tailwind CSS. It was adopted across 5+ product modules, which sped up feature delivery and improved UI consistency.',
      tags: ['Storybook', 'Tailwind CSS', 'Design consistency'],
    },
    {
      key: 'data',
      title: 'Real-time data and resilient workflows',
      text: 'Integrated GraphQL APIs through Hasura for real-time data fetching, and implemented fault-tolerant workflow orchestration with the Temporal TypeScript SDK.',
      tags: ['GraphQL', 'Hasura', 'Temporal TypeScript SDK'],
    },
    {
      key: 'cloud',
      title: 'Serverless, and tested end to end',
      text: 'Built and deployed AWS Lambda functions for event-driven backend processing. Wrote unit, integration and end-to-end test suites with Jest, Vitest and Cypress to improve code coverage.',
      tags: ['AWS Lambda', 'Jest', 'Vitest', 'Cypress'],
    },
    {
      key: 'team',
      title: 'Debugging and collaboration',
      text: 'Led root cause analysis on regression defects. Worked across functions in an Agile/Scrum team, joined peer code reviews, and kept technical design and test documentation up to date.',
      tags: ['Root cause analysis', 'Code review', 'Agile/Scrum', 'Documentation'],
    },
  ],
}

export const journey = [
  { when: '2022', title: 'Starts B.E. in Computer Science and Engineering', where: 'PES College of Engineering, Mandya' },
  { when: 'Apr – May 2025', title: 'Movie Data Analysis and Visualization', where: 'Python, Scikit-learn, Power BI' },
  { when: 'May – Sep 2025', title: 'Blue Collar Workers Service Marketplace', where: 'MERN stack, Selenium tests' },
  { when: 'Nov 2025', title: 'Joins Talview as Software Developer Intern', where: 'Workflow Tools Team, Bengaluru' },
  { when: 'Nov 2025 – Jan 2026', title: 'Smart Student Management System', where: 'React, Hasura, AWS Lambda' },
  { when: 'Jun 2026', title: 'Completes the internship; finishes B.E.', where: 'CGPA 9.45 / 10' },
]

export type VisualKey = 'student' | 'market' | 'movie'

export const projects: {
  key: VisualKey
  name: string
  period: string
  kind: string
  problem: string
  features: string[]
  built: string[]
  stack: string[]
}[] = [
  {
    key: 'student',
    name: 'Smart Student Management System',
    period: 'Nov 2025 – Jan 2026',
    kind: 'Full-stack enterprise application',
    problem:
      'Student records need to be managed by different users with different permissions, stay in sync across screens, and remain usable when the connection drops.',
    features: [
      'CRUD operations with role-based access control',
      'Real-time data synchronization with Hasura GraphQL over PostgreSQL',
      'Offline-first state management with Redux Toolkit and RXDB',
      'Responsive, accessible interface',
    ],
    built: [
      'Built the full-stack application, from the React.js frontend to the GraphQL data layer',
      'Deployed serverless compute on AWS Lambda using SAM',
      'Wrote unit tests and shipped through peer-reviewed code',
    ],
    stack: ['React.js', 'TypeScript', 'Redux Toolkit', 'GraphQL', 'Hasura', 'PostgreSQL', 'AWS Lambda', 'RXDB', 'Tailwind CSS'],
  },
  {
    key: 'market',
    name: 'Blue Collar Workers Service Marketplace',
    period: 'May 2025 – Sep 2025',
    kind: 'MERN stack marketplace',
    problem:
      'Finding a skilled worker and knowing when they will arrive is slow and uncertain. The marketplace shows who is available, books the appointment and tracks the worker on the way.',
    features: [
      'Real-time worker availability',
      'Appointment booking system',
      'GPS-based live tracking',
      'Automated email notifications',
    ],
    built: [
      'Engineered a scalable full-stack application with a RESTful API backend',
      'Wrote Python and Selenium automation scripts to validate end-to-end booking workflows',
      'Ran structured root cause analysis to track and resolve defects to production-ready quality',
    ],
    stack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'REST APIs', 'Python', 'Selenium'],
  },
  {
    key: 'movie',
    name: 'Movie Data Analysis and Visualization',
    period: 'Apr 2025 – May 2025',
    kind: 'AI/ML and data analysis',
    problem:
      'Ratings, genres and audience preferences are buried in raw data. This project cleans and explores it, models it, and presents the findings so non-technical stakeholders can act on them.',
    features: [
      'Data cleaning, preprocessing and exploratory analysis',
      'Scikit-learn predictive modeling',
      'Insights on ratings, genre trends and audience preferences',
      'Interactive Power BI dashboards',
    ],
    built: [
      'Built the end-to-end analysis and machine learning pipeline',
      'Created Power BI dashboards and Python visualizations to communicate results',
      'Documented methodology, results and model performance',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Power BI'],
  },
]

export type Context = 'talview' | 'student' | 'market' | 'movie'

export const contexts: { id: Context; label: string }[] = [
  { id: 'talview', label: 'Talview internship' },
  { id: 'student', label: 'Student Management' },
  { id: 'market', label: 'Service Marketplace' },
  { id: 'movie', label: 'Movie Analysis' },
]

type Skill = { name: string; used?: Context[] }

export const skillGroups: { title: string; note: string; skills: Skill[] }[] = [
  {
    title: 'Programming languages',
    note: 'Where I think and solve problems',
    skills: [
      { name: 'JavaScript (ES6+)', used: ['talview', 'student', 'market'] },
      { name: 'TypeScript', used: ['talview', 'student'] },
      { name: 'Python', used: ['market', 'movie'] },
      { name: 'Java' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'SQL' },
      { name: 'HTML5' },
    ],
  },
  {
    title: 'Frontend development',
    note: 'Interfaces people actually use',
    skills: [
      { name: 'React.js', used: ['talview', 'student', 'market'] },
      { name: 'Redux Toolkit', used: ['student'] },
      { name: 'Redux Saga' },
      { name: 'RXDB', used: ['student'] },
      { name: 'Tailwind CSS', used: ['talview', 'student'] },
      { name: 'CSS3' },
      { name: 'Bootstrap' },
      { name: 'Storybook', used: ['talview'] },
      { name: 'Responsive Design', used: ['student'] },
      { name: 'UI Components', used: ['talview'] },
    ],
  },
  {
    title: 'Backend and APIs',
    note: 'Data, workflows and serverless',
    skills: [
      { name: 'Node.js', used: ['market'] },
      { name: 'Express.js', used: ['market'] },
      { name: 'GraphQL', used: ['talview', 'student'] },
      { name: 'Hasura', used: ['talview', 'student'] },
      { name: 'REST APIs', used: ['market'] },
      { name: 'AWS Lambda', used: ['talview', 'student'] },
      { name: 'SAM', used: ['student'] },
      { name: 'Temporal TypeScript SDK', used: ['talview'] },
      { name: 'Workflow Automation', used: ['talview'] },
    ],
  },
  {
    title: 'Databases',
    note: 'Relational and document stores',
    skills: [
      { name: 'PostgreSQL', used: ['student'] },
      { name: 'MySQL' },
      { name: 'MongoDB', used: ['market'] },
    ],
  },
  {
    title: 'Cloud and DevOps',
    note: 'Shipping and working as a team',
    skills: [
      { name: 'AWS Lambda', used: ['talview', 'student'] },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'CI/CD Pipelines' },
      { name: 'Agile/Scrum', used: ['talview'] },
      { name: 'SDLC' },
    ],
  },
  {
    title: 'Testing and automation',
    note: 'Confidence before release',
    skills: [
      { name: 'Jest', used: ['talview'] },
      { name: 'Vitest', used: ['talview'] },
      { name: 'Cypress (E2E)', used: ['talview'] },
      { name: 'Selenium', used: ['market'] },
      { name: 'Unit Testing', used: ['talview', 'student'] },
      { name: 'Integration Testing', used: ['talview'] },
      { name: 'Code Coverage', used: ['talview'] },
    ],
  },
  {
    title: 'Data analysis and machine learning',
    note: 'From raw data to a readable answer',
    skills: [
      { name: 'Pandas', used: ['movie'] },
      { name: 'NumPy', used: ['movie'] },
      { name: 'Matplotlib', used: ['movie'] },
      { name: 'Seaborn', used: ['movie'] },
      { name: 'Scikit-learn', used: ['movie'] },
      { name: 'Power BI', used: ['movie'] },
      { name: 'Data Analysis', used: ['movie'] },
      { name: 'Machine Learning', used: ['movie'] },
    ],
  },
]

export const education = [
  {
    title: 'B.E. in Computer Science and Engineering',
    school: 'PES College of Engineering, Mandya (VTU)',
    period: '2022 – 2026',
    score: 'CGPA 9.45 / 10',
    value: 9.45,
    max: 10,
  },
  {
    title: 'Pre-University Certificate (PUC), PCMB',
    school: 'Govt. PU College, Kudige',
    period: '2020 – 2022',
    score: '92.33%',
    value: 92.33,
    max: 100,
  },
  {
    title: 'SSLC (10th Grade)',
    school: 'Morarji Desai Residential School, Kudige (KSEEB)',
    period: '2019 – 2020',
    score: '91.04%',
    value: 91.04,
    max: 100,
  },
]

export const achievements = [
  {
    place: '1st',
    title: 'Coding Challenge and Analytics Arena (IEEE)',
    where: 'PESCE Mandya',
    text: 'Solved advanced data structures and algorithms problems and delivered data-driven insights with Python analytics and Power BI visualization.',
  },
  {
    place: '2nd',
    title: 'National Level Hackathon and Code Treasure Hunt',
    where: 'PESCE Mandya',
    text: 'Delivered an innovative full-stack solution in 24 hours and finished as runner-up, building on algorithmic reasoning and teamwork.',
  },
]
