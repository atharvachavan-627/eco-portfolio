import {
  StudentProfile,
  Assignment,
  EWasteStat,
  HistoricalGrowthData,
  RegionalData,
  CompositionData,
} from '@/types';

export const DEFAULT_PROFILE: StudentProfile = {
  name: 'Atharva Chavan',
  rollNumber: '24101C0006',
  course: 'E-WASTE & ENVIRONMENTAL MANAGEMENT',
  branch: 'Information Technology Engineering',
  college: 'Department of Information Technology Engineering (Add College Name)',
  academicYear: '2025-2026',
  division: 'Div A (Edit Division)',
  mentor: 'Prof. Nilima Main',
  email: 'atharva.chavan@example.com (Edit Email)',
  location: 'Mumbai, India (Edit Location)',
  linkedIn: 'https://linkedin.com/in/atharvachavan (Edit LinkedIn)',
  github: 'https://github.com/atharvachavan (Edit GitHub)',
  resumeUrl: '#',
  photoUrl: '', // Fallback avatar used if empty
  careerGoal:
    'Aspiring IT Engineer dedicated to leveraging technology, AI, and modern web architectures to build sustainable systems. Driven by a passion to reduce electronic waste through repairability, circular software design, and environmental data analytics.',
  academicInterests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    'Software Engineering',
    'Data Analytics',
    'Sustainable Technology',
    'Environmental IoT Systems',
  ],
  hobbies: [
    'Coding & Open Source',
    'Hardware & Gadget Repair',
    'Photography',
    'Tech Blogging',
    'Music',
    'Trekking & Nature Walks',
  ],
  skills: [
    {
      category: 'Programming',
      skills: [
        { name: 'C', level: 'Intermediate' },
        { name: 'Java', level: 'Intermediate' },
        { name: 'Python', level: 'Advanced' },
        { name: 'JavaScript', level: 'Advanced' },
      ],
    },
    {
      category: 'Web Development',
      skills: [
        { name: 'HTML5', level: 'Expert' },
        { name: 'CSS3 / Tailwind', level: 'Advanced' },
        { name: 'React.js', level: 'Advanced' },
        { name: 'Next.js', level: 'Intermediate' },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'PostgreSQL', level: 'Intermediate' },
        { name: 'Supabase', level: 'Intermediate' },
      ],
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git', level: 'Advanced' },
        { name: 'GitHub', level: 'Advanced' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Vercel', level: 'Intermediate' },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'E-Waste Recycling Drop-Off Finder',
      description:
        'A interactive web application mapping authorized e-waste recycling centers and e-scrap drop-off points with real-time location filtering and disposal guidance.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Leaflet API'],
      githubUrl: 'https://github.com/atharvachavan/ewaste-dropoff-finder',
      demoUrl: 'https://ewaste-dropoff-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      sustainabilityFocus: 'Facilitates responsible e-waste disposal by connecting citizens with certified recyclers.',
    },
    {
      id: 'proj-2',
      title: 'EcoTrack — Device Lifespan Estimator',
      description:
        'A diagnostic web utility that calculates carbon footprint and estimated residual value of old consumer electronics to encourage refurbishment over landfill disposal.',
      technologies: ['Next.js', 'Python', 'Recharts', 'Tailwind CSS'],
      githubUrl: 'https://github.com/atharvachavan/ecotrack-lifespan',
      demoUrl: 'https://ecotrack-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      sustainabilityFocus: 'Promotes circular economy principles by quantifying extended hardware usage.',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Green Tech Hackathon 2025 — 2nd Runner Up',
      category: 'Hackathon',
      organization: 'State Engineering Innovation Cell',
      date: 'March 2025',
      description: 'Developed an automated e-waste classification prototype utilizing computer vision.',
    },
    {
      id: 'ach-2',
      title: 'Certificate in Environmental Impact Analysis',
      category: 'Certification',
      organization: 'Global Sustainable Tech Academy',
      date: 'January 2025',
      description: 'Completed comprehensive course on lifecycle assessment (LCA) for electronic devices.',
    },
    {
      id: 'ach-3',
      title: 'Lead Volunteer — Campus E-Waste Drive',
      category: 'Volunteering',
      organization: 'NSS Engineering Unit',
      date: 'December 2024',
      description: 'Organized campus-wide e-waste collection drive gathering over 250kg of discarded electronic items.',
    },
  ],
};

export const SAMPLE_ASSIGNMENT: Assignment = {
  id: 'assignment-sample-01',
  activityNumber: 1,
  title: 'Device Anatomy – Mobile Phone Disassembly (Sample Assignment)',
  objective:
    'To perform a hands-on physical teardown of a discarded mobile smartphone, identify key internal component layers (PCB, lithium battery, display panel, camera module, connectors), catalogue valuable metals vs toxic fractions, and evaluate repairability index.',
  evidence: [
    {
      id: 'ev-1',
      type: 'image',
      name: 'Mobile Phone Internal Teardown PCB.jpg',
      url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
      size: '2.4 MB',
      createdAt: '2026-02-10',
    },
    {
      id: 'ev-2',
      type: 'image',
      name: 'Battery and Display Flex Connectors Teardown.jpg',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      size: '1.8 MB',
      createdAt: '2026-02-10',
    },
    {
      id: 'ev-3',
      type: 'pdf',
      name: 'Smartphone Teardown & Component Analysis Report.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      size: '520 KB',
      createdAt: '2026-02-11',
    },
    {
      id: 'ev-4',
      type: 'url',
      name: 'iFixit Repairability Score Methodology Link',
      url: 'https://www.ifixit.com/Right-to-Repair',
      size: 'External Link',
      createdAt: '2026-02-11',
    },
  ],
  learned:
    'During this disassembly exercise, I learned that modern smartphones are constructed with dense modular integration. The motherboard contains valuable precious metals such as gold, silver, copper, and palladium, alongside toxic substances like lead solders, cobalt in lithium-ion batteries, and flame retardants in plastics. I discovered that glue-sealed battery compartments significantly decrease repairability score from 8/10 to 3/10, making manual disassembly difficult without specialized heating equipment.',
  sustainabilityConnection:
    'This activity directly demonstrates the core tenets of urban mining and eco-design. Mobile phones contain over 40 elements; extracting 1 tonne of smartphones yields more gold than 1 tonne of gold ore. By understanding internal assembly, engineers can design for disassembly (DfD), modular repairability, and targeted toxic material isolation during formal e-waste recycling operations.',
  surprised:
    'I was surprised by the sheer amount of industrial adhesive used to bond the display assembly to the aluminum frame. Instead of screws or mechanical snaps, glues were used everywhere, which increases manufacturing speed but makes end-of-life recycling and screen replacement hazardous.',
  challenge:
    'The main challenge was safely disconnecting the bloated lithium-ion battery pouch without puncturing its outer membrane, as puncturing can cause thermal runaway or dangerous chemical leakage.',
  improvement:
    'In future teardowns, I will use precise plastic spudger tools and a dedicated heat gun to soften adhesives, and measure the exact mass of each separated material component using a digital scale to calculate mass recovery percentages.',
  references: [
    {
      id: 'ref-1',
      title: 'Global E-waste Monitor 2024 — UNU / ITU Teardown Insights',
      url: 'https://ewastemonitor.info/',
      authorOrOrg: 'United Nations University / ITU',
      date: '2024',
    },
    {
      id: 'ref-2',
      title: 'Design for Disassembly in Modern Mobile Electronics',
      url: 'https://ieeexplore.ieee.org/',
      authorOrOrg: 'IEEE Transactions on Sustainable Electronics',
      date: '2023',
    },
  ],
  status: 'Completed',
  createdAt: '2026-02-10T10:00:00Z',
  updatedAt: '2026-02-12T14:30:00Z',
};

export const CORE_EWASTE_STATS: EWasteStat[] = [
  {
    id: 'stat-1',
    title: 'Global E-Waste Generation',
    value: '62.0',
    unit: 'Million Tonnes',
    change: '+82% since 2010',
    description: 'Record high electronic waste produced globally in 2022, equivalent to 7.8 kg per person on Earth.',
    source: 'The Global E-waste Monitor 2024 (UNITAR & ITU)',
    sourceUrl: 'https://ewastemonitor.info/',
    year: '2024 Report',
  },
  {
    id: 'stat-2',
    title: 'Formal Recycling Rate',
    value: '22.3%',
    unit: 'Documented Recycling',
    change: '77.7% undocumented',
    description: 'Only less than one-quarter of generated e-waste is formally collected, catalogued, and recycled safely.',
    source: 'UN Environment Programme (UNEP) & UNU',
    sourceUrl: 'https://www.unep.org/',
    year: '2024 Data',
  },
  {
    id: 'stat-3',
    title: 'Annual E-Waste Growth',
    value: '2.6',
    unit: 'Million Tonnes / Year',
    change: '5x faster than recycling growth',
    description: 'E-waste creation is growing five times faster than documented recycling infrastructure expansion.',
    source: 'Global E-waste Statistics Partnership (GESP)',
    sourceUrl: 'https://globalewaste.org/',
    year: '2024 Analysis',
  },
  {
    id: 'stat-4',
    title: '2030 Future Projection',
    value: '82.0',
    unit: 'Million Tonnes',
    change: 'Target trajectory by 2030',
    description: 'Without urgent intervention and right-to-repair laws, global e-waste will surpass 82 million tonnes by 2030.',
    source: 'United Nations Institute for Training and Research (UNITAR)',
    sourceUrl: 'https://unitar.org/',
    year: '2030 Forecast',
  },
];

export const HISTORICAL_GROWTH_DATA: HistoricalGrowthData[] = [
  { year: 2010, generatedMt: 34.0, recycledMt: 6.8 },
  { year: 2012, generatedMt: 39.0, recycledMt: 7.9 },
  { year: 2014, generatedMt: 44.4, recycledMt: 8.9 },
  { year: 2016, generatedMt: 49.0, recycledMt: 9.8 },
  { year: 2018, generatedMt: 53.6, recycledMt: 10.7 },
  { year: 2020, generatedMt: 57.4, recycledMt: 12.1 },
  { year: 2022, generatedMt: 62.0, recycledMt: 13.8 },
  { year: 2024, generatedMt: 67.2, recycledMt: 15.0 },
  { year: 2026, generatedMt: 72.5, recycledMt: 16.2, projected: true },
  { year: 2028, generatedMt: 77.1, recycledMt: 17.5, projected: true },
  { year: 2030, generatedMt: 82.0, recycledMt: 18.8, projected: true },
];

export const REGIONAL_EWASTE_DATA: RegionalData[] = [
  { region: 'Asia', generatedMt: 30.2, recycledPercent: 11.8, perCapitaKg: 6.4 },
  { region: 'Americas', generatedMt: 14.1, recycledPercent: 30.0, perCapitaKg: 14.1 },
  { region: 'Europe', generatedMt: 13.2, recycledPercent: 42.8, perCapitaKg: 17.6 },
  { region: 'Africa', generatedMt: 3.5, recycledPercent: 0.7, perCapitaKg: 2.5 },
  { region: 'Oceania', generatedMt: 1.0, recycledPercent: 41.4, perCapitaKg: 16.1 },
];

export const COMPOSITION_DATA: CompositionData[] = [
  { category: 'Small Equipment (vacuum cleaners, cameras, toys)', percentage: 33, weightMt: 20.4, color: '#059669' },
  { category: 'Large Equipment (washing machines, solar panels)', percentage: 25, weightMt: 15.5, color: '#0d9488' },
  { category: 'Temperature Exchange Equipment (fridges, ACs)', percentage: 21, weightMt: 13.0, color: '#0284c7' },
  { category: 'Screens & Monitors (TVs, laptops, tablets)', percentage: 11, weightMt: 6.8, color: '#6366f1' },
  { category: 'Small IT & Telecom (smartphones, routers, PCs)', percentage: 9, weightMt: 5.6, color: '#8b5cf6' },
  { category: 'Lamps & Lighting Devices', percentage: 1, weightMt: 0.7, color: '#ec4899' },
];

export const GALLERY_IMAGES = [
  {
    id: 'img-1',
    title: 'E-Waste Accumulation & Circuit Boards',
    category: 'E-Waste Overview',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Discarded circuit boards containing copper, gold, and hazardous heavy metal traces.',
    alt: 'Pile of printed circuit boards and e-waste components',
    credit: 'Unsplash / Science & Technology Collection',
  },
  {
    id: 'img-2',
    title: 'Formal E-Waste Recycling Facility',
    category: 'Recycling',
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Robotic and manual material separation at a certified zero-landfill recycling plant.',
    alt: 'Recycling facility workers sorting electronics',
    credit: 'Unsplash / Green Tech Focus',
  },
  {
    id: 'img-3',
    title: 'Smartphone Hardware Teardown',
    category: 'Device Anatomy',
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    caption: 'Microscopic analysis of semiconductor chips and surface mount capacitors.',
    alt: 'Computer microchip component on green PCB',
    credit: 'Unsplash / Microelectronics',
  },
  {
    id: 'img-4',
    title: 'Old Consumer Electronics Stack',
    category: 'Sources of E-Waste',
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    caption: 'Rapid obsolescence leads to millions of obsolete laptops and monitors annually.',
    alt: 'Stacked old laptops and computer monitors',
    credit: 'Unsplash / E-Waste Impact',
  },
  {
    id: 'img-5',
    title: 'Modular Repair & Refurbishment',
    category: 'Circular Economy',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    caption: 'Extending device lifespan by replacing worn batteries and upgradable memory modules.',
    alt: 'Engineer repairing electronic device with soldering tool',
    credit: 'Unsplash / Circular Engineering',
  },
  {
    id: 'img-6',
    title: 'Sustainable Green Technology',
    category: 'Future Vision',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80',
    caption: 'Harmonizing technological advancement with environmental protection and renewable energy.',
    alt: 'Solar panels and green nature representing eco tech',
    credit: 'Unsplash / Eco Tech',
  },
];
