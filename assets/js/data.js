// Static content: subjects, syllabus topics, curated resources, habits, tips, sample quiz.

export const SUBJECTS = [
  { id: 'polity', name: 'Polity & Governance', short: 'Polity', color: '#3b5bdb', paper: 'GS-II' },
  { id: 'history', name: 'History', short: 'History', color: '#c2410c', paper: 'GS-I' },
  { id: 'geography', name: 'Geography', short: 'Geography', color: '#0f766e', paper: 'GS-I' },
  { id: 'economy', name: 'Indian Economy', short: 'Economy', color: '#b7791f', paper: 'GS-III' },
  { id: 'environment', name: 'Environment & Ecology', short: 'Environment', color: '#15803d', paper: 'GS-III' },
  { id: 'scitech', name: 'Science & Technology', short: 'Sci & Tech', color: '#7c3aed', paper: 'GS-III' },
  { id: 'culture', name: 'Art & Culture', short: 'Culture', color: '#db2777', paper: 'GS-I' },
  { id: 'ir', name: 'International Relations', short: 'IR', color: '#0369a1', paper: 'GS-II' },
  { id: 'society', name: 'Indian Society & Social Justice', short: 'Society', color: '#be123c', paper: 'GS-I' },
  { id: 'security', name: 'Internal Security & Disaster Mgmt', short: 'Security', color: '#475569', paper: 'GS-III' },
  { id: 'ethics', name: 'Ethics, Integrity & Aptitude', short: 'Ethics', color: '#0891b2', paper: 'GS-IV' },
  { id: 'current', name: 'Current Affairs', short: 'Current', color: '#e8751a', paper: 'GS' },
  { id: 'csat', name: 'CSAT (Paper II)', short: 'CSAT', color: '#4f46e5', paper: 'CSAT' },
  { id: 'essay', name: 'Essay', short: 'Essay', color: '#65a30d', paper: 'Essay' },
  { id: 'optional', name: 'Optional Subject', short: 'Optional', color: '#78716c', paper: 'Optional' },
];
export const subjectById = (id) => SUBJECTS.find((s) => s.id === id) || { id, name: id || 'General', short: id || 'General', color: '#8b8d96', paper: 'GS' };

export const SYLLABUS = {
  polity: ['Preamble & constitutional values', 'Fundamental Rights', 'DPSP & Fundamental Duties', 'Parliament & legislative process', 'President, PM & Council of Ministers', 'Governor & State executive', 'Supreme Court & High Courts', 'Federalism & Centre–State relations', 'Panchayati Raj & urban local bodies', 'Constitutional & statutory bodies', 'Amendments & Basic Structure', 'Emergency provisions', 'Elections & Representation of People Act'],
  history: ['Prehistoric India: sources & phases', 'Stone Age: Palaeolithic, Mesolithic & Neolithic', 'Chalcolithic & Megalithic cultures', 'Indus Valley Civilisation', 'Vedic age', 'Buddhism & Jainism', 'Mauryan empire', 'Gupta & post-Gupta period', 'Delhi Sultanate', 'Mughal empire', 'Bhakti & Sufi movements', 'Advent of Europeans', 'Revolt of 1857', 'Socio-religious reform movements', 'Gandhian phase of the freedom struggle', 'Constitutional developments 1773–1947', 'Post-independence consolidation', 'World history: revolutions & world wars'],
  geography: ['Geomorphology & landforms', 'Climatology & Indian monsoon', 'Oceanography & currents', 'Physiography of India', 'Drainage systems & rivers', 'Soils & natural vegetation', 'Agriculture & cropping patterns', 'Minerals, energy & industries', 'Mapping: places in news', 'Earthquakes, cyclones & hazards', 'Population & settlement geography'],
  economy: ['National income & GDP', 'Inflation & monetary policy', 'Banking, RBI & NPAs', 'Fiscal policy, budget & FRBM', 'Taxation & GST', 'External sector, BoP & currency', 'Agriculture, MSP & food security', 'Industrial policy & MSMEs', 'Infrastructure & investment models', 'Capital markets & SEBI', 'Poverty, unemployment & inclusive growth'],
  environment: ['Ecosystems & food chains', 'Biodiversity & hotspots', 'Protected areas & national parks', 'Wetlands & Ramsar sites', 'Climate change & UNFCCC', 'Pollution & waste management', 'Environmental laws & institutions', 'Species in news & IUCN status', 'Renewable energy & conservation'],
  scitech: ['Space technology & ISRO missions', 'Biotechnology & genetics', 'Defence technology & missiles', 'AI, IT & cybersecurity', 'Nuclear technology', 'Health, diseases & vaccines', 'Nanotechnology & new materials', 'Semiconductors & quantum technology'],
  culture: ['Temple architecture', 'Buddhist & Jain architecture', 'Indo-Islamic architecture', 'Indian paintings', 'Classical dances', 'Indian music traditions', 'Bhakti literature & languages', 'UNESCO heritage in India', 'Festivals, fairs & GI tags'],
  ir: ['India & neighbourhood', 'India–US relations', 'India–China relations', 'International organisations (UN, WTO, IMF)', 'Groupings: QUAD, BRICS, SCO, G20', 'Indian diaspora', 'West Asia & India', 'Indo-Pacific strategy'],
  society: ['Salient features of Indian society', 'Women & women’s organisations', 'Population & associated issues', 'Urbanisation: problems & remedies', 'Effects of globalisation', 'Communalism, regionalism & secularism', 'Vulnerable sections & welfare schemes', 'Health, education & human resources'],
  security: ['Border management', 'Left-wing extremism', 'Insurgency in the North-East', 'Cyber security', 'Money laundering & terror financing', 'Security forces & agencies', 'Disaster management framework'],
  ethics: ['Ethics & human interface', 'Attitude & persuasion', 'Emotional intelligence', 'Foundational values for civil services', 'Moral thinkers of India & the world', 'Probity in governance', 'Ethics in public administration', 'Case studies'],
  current: ['Government schemes & policies', 'Reports & indices', 'International summits & agreements', 'Places in news', 'Economic Survey & Union Budget', 'Science & environment in news'],
  csat: ['Reading comprehension', 'Logical reasoning', 'Analytical ability', 'Number system', 'Percentages, ratio & proportion', 'Time, speed & distance', 'Time & work', 'Data interpretation', 'Permutations & probability', 'Syllogisms & statement–conclusion'],
  essay: ['Philosophical themes', 'Social justice', 'Economy & development', 'Technology & society', 'Governance & democracy', 'Environment & sustainability'],
  optional: [],
};

export const HABITS = [
  { id: 'newspaper', emoji: '📰', title: 'Newspaper reading', hint: 'The Hindu / Indian Express' },
  { id: 'ca_notes', emoji: '🗂️', title: 'Current affairs notes', hint: 'Make crisp notes' },
  { id: 'answer', emoji: '✍️', title: 'Answer writing', hint: 'At least 1 Mains answer' },
  { id: 'revision', emoji: '🔁', title: 'Revision', hint: 'Revise yesterday’s topics' },
  { id: 'pyq', emoji: '🎯', title: 'PYQs / MCQ practice', hint: '20+ questions' },
  { id: 'csat', emoji: '🧮', title: 'CSAT practice', hint: 'Quant / RC set' },
];

export const TIPS = [
  'Revise on a 1–3–7–21 day cycle. A topic revised four times is a topic you own in the exam hall.',
  'Before reading any chapter, scan the last 10 years of PYQs on it — they tell you what to read and what to skip.',
  'Read the newspaper for issues, not news. Ask: which GS paper does this belong to?',
  'Write one Mains answer daily. 150 words, 7 minutes. Quantity first, then quality.',
  'Static + current linkage wins Prelims: for every news item, find the NCERT/Laxmikanth chapter behind it.',
  'Mock tests are for learning, not ego. Analyse every wrong answer for 2× the time you took to attempt it.',
  'Keep one source per subject and revise it multiple times rather than reading many sources once.',
  'Sleep is part of the syllabus. Memory consolidates while you rest.',
  'Make maps your habit: locate every place, river and protected area you read about.',
  'Elimination is a skill. In statement questions, kill extreme words like "only", "all", "always" first.',
];

export const LIBRARY = [
  // Official
  { id: 'upsc', cat: 'Official', title: 'UPSC official website', desc: 'Notifications, admit cards, results and exam notices.', url: 'https://upsc.gov.in', type: 'web', subject: 'general' },
  { id: 'upsc-pyq', cat: 'Official', title: 'Previous year question papers', desc: 'Download Prelims & Mains PYQs straight from UPSC.', url: 'https://upsc.gov.in/examinations/previous-question-papers', type: 'pdf', subject: 'general' },
  { id: 'upsc-cal', cat: 'Official', title: 'UPSC exam calendar', desc: 'Check the official date for CSE Prelims 2027.', url: 'https://upsc.gov.in/examinations/exam-calendar', type: 'web', subject: 'general' },
  { id: 'ncert', cat: 'Official', title: 'NCERT textbooks (Class 6–12)', desc: 'The foundation for every GS subject — free PDFs.', url: 'https://ncert.nic.in/textbook.php', type: 'pdf', subject: 'general' },
  // Current affairs
  { id: 'pib', cat: 'Current Affairs', title: 'Press Information Bureau', desc: 'Official releases on schemes, policies and cabinet decisions.', url: 'https://pib.gov.in', type: 'web', subject: 'current' },
  { id: 'prs', cat: 'Current Affairs', title: 'PRS Legislative Research', desc: 'Bill summaries, budget analyses and Parliament data.', url: 'https://prsindia.org', type: 'web', subject: 'polity' },
  { id: 'budget', cat: 'Current Affairs', title: 'Union Budget & Economic Survey', desc: 'Primary documents for Economy — read the Survey chapters.', url: 'https://www.indiabudget.gov.in', type: 'pdf', subject: 'economy' },
  { id: 'yojana', cat: 'Current Affairs', title: 'Yojana & Kurukshetra', desc: 'Publications Division monthlies for in-depth themes.', url: 'https://www.publicationsdivision.nic.in', type: 'web', subject: 'current' },
  { id: 'dte', cat: 'Current Affairs', title: 'Down To Earth', desc: 'Environment, science and development journalism.', url: 'https://www.downtoearth.org.in', type: 'web', subject: 'environment' },
  { id: 'hindu', cat: 'Current Affairs', title: 'The Hindu', desc: 'Daily newspaper — editorials and national news.', url: 'https://www.thehindu.com', type: 'web', subject: 'current' },
  { id: 'ie', cat: 'Current Affairs', title: 'The Indian Express', desc: 'Daily newspaper — "Explained" section is gold.', url: 'https://indianexpress.com', type: 'web', subject: 'current' },
  // Government portals
  { id: 'rbi', cat: 'Government Portals', title: 'Reserve Bank of India', desc: 'Monetary policy statements and annual reports.', url: 'https://www.rbi.org.in', type: 'web', subject: 'economy' },
  { id: 'niti', cat: 'Government Portals', title: 'NITI Aayog', desc: 'Reports, indices and policy papers.', url: 'https://www.niti.gov.in', type: 'web', subject: 'economy' },
  { id: 'mea', cat: 'Government Portals', title: 'Ministry of External Affairs', desc: 'Bilateral briefs and joint statements for IR.', url: 'https://www.mea.gov.in', type: 'web', subject: 'ir' },
  { id: 'isro', cat: 'Government Portals', title: 'ISRO', desc: 'Missions, launch vehicles and space programmes.', url: 'https://www.isro.gov.in', type: 'web', subject: 'scitech' },
  { id: 'moef', cat: 'Government Portals', title: 'MoEFCC', desc: 'Environment ministry — notifications and reports.', url: 'https://moef.gov.in', type: 'web', subject: 'environment' },
  { id: 'bhuvan', cat: 'Government Portals', title: 'Bhuvan (ISRO geoportal)', desc: 'Explore Indian maps and thematic layers.', url: 'https://bhuvan.nrsc.gov.in', type: 'web', subject: 'geography' },
  { id: 'nios', cat: 'Government Portals', title: 'NIOS study material', desc: 'Excellent free material for Art & Culture and more.', url: 'https://www.nios.ac.in', type: 'pdf', subject: 'culture' },
  { id: 'egyan', cat: 'Government Portals', title: 'IGNOU eGyanKosh', desc: 'University-level notes; useful for Ethics & optionals.', url: 'https://egyankosh.ac.in', type: 'pdf', subject: 'optional' },
  // Standard books
  { id: 'b-laxmikanth', cat: 'Standard Books', title: 'Indian Polity — M. Laxmikanth', desc: 'The polity bible for Prelims & Mains.', type: 'book', subject: 'polity' },
  { id: 'b-spectrum', cat: 'Standard Books', title: 'A Brief History of Modern India — Spectrum', desc: 'Modern history for Prelims; concise and exam-oriented.', type: 'book', subject: 'history' },
  { id: 'b-bipan', cat: 'Standard Books', title: 'India’s Struggle for Independence — Bipan Chandra', desc: 'Analytical depth for the freedom struggle.', type: 'book', subject: 'history' },
  { id: 'b-leong', cat: 'Standard Books', title: 'Certificate Physical & Human Geography — G.C. Leong', desc: 'Physical geography fundamentals.', type: 'book', subject: 'geography' },
  { id: 'b-atlas', cat: 'Standard Books', title: 'Oxford School Atlas', desc: 'Keep it open while reading anything.', type: 'book', subject: 'geography' },
  { id: 'b-economy', cat: 'Standard Books', title: 'Indian Economy — Ramesh Singh', desc: 'Concept-heavy reference for Economy.', type: 'book', subject: 'economy' },
  { id: 'b-shankar', cat: 'Standard Books', title: 'Environment — Shankar IAS Academy', desc: 'Standard Prelims reference for Environment.', type: 'book', subject: 'environment' },
  { id: 'b-singhania', cat: 'Standard Books', title: 'Indian Art & Culture — Nitin Singhania', desc: 'Comprehensive culture coverage.', type: 'book', subject: 'culture' },
  { id: 'b-lexicon', cat: 'Standard Books', title: 'Lexicon for Ethics, Integrity & Aptitude', desc: 'Terms and concepts for GS-IV.', type: 'book', subject: 'ethics' },
  { id: 'b-rssharma', cat: 'Standard Books', title: 'Ancient India — R.S. Sharma (old NCERT)', desc: 'Classic for ancient history.', type: 'book', subject: 'history' },
  { id: 'b-satish', cat: 'Standard Books', title: 'Medieval India — Satish Chandra (old NCERT)', desc: 'Classic for medieval history.', type: 'book', subject: 'history' },
];

export const PRESET_REMINDERS = [
  { title: 'Read the newspaper', time: '07:00', repeat: 'daily', emoji: '📰' },
  { title: 'Deep work block — GS', time: '09:00', repeat: 'weekdays', emoji: '📚' },
  { title: 'Daily answer writing', time: '21:00', repeat: 'daily', emoji: '✍️' },
  { title: 'Weekly revision & mock analysis', time: '10:00', repeat: 'weekly', days: [0], emoji: '🔁' },
  { title: 'Take a full-length mock test', time: '09:30', repeat: 'weekly', days: [6], emoji: '🎯' },
];

// A small offline question bank so the quiz works without an AI key.
export const SAMPLE_QUIZ = [
  {
    subject: 'polity', stem: 'Which Article of the Constitution of India guarantees the right to move the Supreme Court for the enforcement of Fundamental Rights?',
    statements: [], ask: '', options: ['Article 19', 'Article 21', 'Article 32', 'Article 226'], answer: 2,
    explanation: 'Article 32 (Right to Constitutional Remedies) lets a person move the Supreme Court directly for enforcement of Fundamental Rights. Dr. B.R. Ambedkar called it the "heart and soul" of the Constitution. Article 226 empowers High Courts and is wider in scope, but it is not itself a Fundamental Right.',
  },
  {
    subject: 'polity', stem: 'Consider the following statements regarding the Rajya Sabha:',
    statements: ['It is a permanent body and is not subject to dissolution.', 'One-third of its members retire every second year.', 'The Vice-President of India is the ex-officio Chairman of the Rajya Sabha.'],
    ask: 'How many of the above statements are correct?', options: ['Only one', 'Only two', 'All three', 'None'], answer: 2,
    explanation: 'All three are correct. Under Article 83(1) the Rajya Sabha is a continuing chamber not subject to dissolution; one-third of members retire every two years. Article 64 makes the Vice-President the ex-officio Chairman.',
  },
  {
    subject: 'polity', stem: 'The "Basic Structure" doctrine of the Constitution was propounded by the Supreme Court in which case?',
    statements: [], ask: '', options: ['Golaknath v. State of Punjab', 'Kesavananda Bharati v. State of Kerala', 'Minerva Mills v. Union of India', 'Shankari Prasad v. Union of India'], answer: 1,
    explanation: 'In Kesavananda Bharati (1973) a 13-judge bench held that Parliament can amend any part of the Constitution but cannot alter its basic structure. Minerva Mills (1980) later reaffirmed and applied the doctrine.',
  },
  {
    subject: 'geography', stem: 'The Tropic of Cancer does NOT pass through which one of the following States?',
    statements: [], ask: '', options: ['Gujarat', 'Odisha', 'Tripura', 'Jharkhand'], answer: 1,
    explanation: 'The Tropic of Cancer passes through eight States: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram. Odisha lies entirely south of it.',
  },
  {
    subject: 'environment', stem: 'Consider the following pairs:',
    statements: ['Kaziranga National Park : Assam', 'Silent Valley National Park : Kerala', 'Bandhavgarh National Park : Madhya Pradesh', 'Simlipal National Park : Jharkhand'],
    ask: 'How many of the above pairs are correctly matched?', options: ['Only one', 'Only two', 'Only three', 'All four'], answer: 2,
    explanation: 'The first three pairs are correct. Simlipal National Park (a tiger reserve and biosphere reserve) is in Odisha, not Jharkhand.',
  },
  {
    subject: 'environment', stem: 'The Montreal Protocol is an international treaty that deals with:',
    statements: [], ask: '', options: ['Trade in endangered species', 'Phasing out ozone-depleting substances', 'Transboundary movement of hazardous wastes', 'Conservation of wetlands'], answer: 1,
    explanation: 'The Montreal Protocol (1987) phases out ozone-depleting substances such as CFCs. CITES deals with endangered species trade, the Basel Convention with hazardous wastes, and the Ramsar Convention with wetlands.',
  },
  {
    subject: 'history', stem: 'Which Harappan site in present-day Gujarat is best known for an artificial dockyard?',
    statements: [], ask: '', options: ['Dholavira', 'Kalibangan', 'Lothal', 'Banawali'], answer: 2,
    explanation: 'Lothal, on the Bhogava river in Gujarat, has a large brick-lined basin widely interpreted as a dockyard. Dholavira is also in Gujarat but is known for its water-management system; Kalibangan is in Rajasthan and Banawali in Haryana.',
  },
  {
    subject: 'economy', stem: 'With reference to the Finance Commission of India, consider the following statements:',
    statements: ['It is constituted under Article 280 of the Constitution.', 'It is constituted by the President every fifth year or earlier, as considered necessary.'],
    ask: 'Which of the statements given above is/are correct?', options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'], answer: 2,
    explanation: 'Both are correct. Article 280 provides for a Finance Commission constituted by the President at the expiration of every fifth year or earlier, which recommends the distribution of tax proceeds between the Union and the States.',
  },
  {
    subject: 'economy', stem: 'When the Reserve Bank of India raises the repo rate, what is the most likely immediate intended effect?',
    statements: [], ask: '', options: ['Increase in liquidity in the banking system', 'Reduction in the cost of borrowing for banks', 'Tightening of money supply to contain inflation', 'Increase in government tax revenue'], answer: 2,
    explanation: 'Repo rate is the rate at which RBI lends short-term funds to banks against government securities. Raising it makes borrowing costlier for banks, which tends to tighten liquidity and curb inflationary pressure.',
  },
  {
    subject: 'csat', stem: 'A train 120 metres long crosses a stationary pole in 6 seconds. What is the speed of the train?',
    statements: [], ask: '', options: ['60 km/h', '66 km/h', '72 km/h', '80 km/h'], answer: 2,
    explanation: 'Speed = 120 m ÷ 6 s = 20 m/s. Converting: 20 × 18/5 = 72 km/h.',
  },
];

// Level Up IAS daily current-affairs category (verified 22 Nov 2026).
export const LEVELUP_IAS = { currentAffairs: 'https://www.levelupias.com/category/currentaffairs/' };

// Vision IAS current-affairs links (verified 21 Nov 2026). Monthly issues: the archive's year + month filters (month = issue month).
export const VISION_IAS = {
  dailySummary: 'https://visionias.in/current-affairs/upsc-daily-news-summary',
  magazineArchive: 'https://visionias.in/current-affairs/monthly-magazine/archive',
  magazineMonth: (year, month) => `https://visionias.in/current-affairs/monthly-magazine/archive?year=${year}&month=${month}`,
};
