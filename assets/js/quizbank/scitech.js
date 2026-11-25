// Offline MCQs: Science & Technology. Keys must match SYLLABUS.scitech in data.js exactly. Format: see ../quizbank.js.
// Sources: NCERT Science, ISRO, DRDO, DAE, MeitY, PIB.
export const QUESTIONS = {
  'Space technology & ISRO missions': [
    { q: 'Consider the following statements about Chandrayaan-3:', s: ['Its lander touched down near the Moon\'s south pole on 23 August 2023.', 'The landing site was named "Shiv Shakti Point".'], o: 'C2', a: 2, e: 'Both are correct. 23 August is now observed as National Space Day.' },
    { q: 'Aditya-L1, placed at the first Lagrange point (L1), studies:', o: ['the Moon', 'the Sun', 'Mars', 'Venus'], a: 1, e: 'Aditya-L1 is India\'s first space-based solar observatory, about 1.5 million km from Earth.' },
    { q: 'Which ISRO launch vehicle uses an indigenous cryogenic upper stage to place satellites in geosynchronous transfer orbit?', o: ['PSLV', 'SSLV', 'GSLV', 'RLV-TD'], a: 2, e: 'The GSLV (and the heavier LVM3) use cryogenic stages. PSLV is mainly used for polar and sun-synchronous orbits.' },
    { q: 'NavIC is India\'s:', o: ['regional satellite navigation system', 'weather satellite series', 'space station', 'Mars mission'], a: 0, e: 'NavIC (Navigation with Indian Constellation) gives positioning over India and about 1,500 km around it.' },
    { q: 'Consider the following statements about the Mars Orbiter Mission (Mangalyaan):', s: ['India was the first country to reach Mars orbit on its first attempt.', 'It was launched by a GSLV.'], o: 'C2', a: 0, e: 'Mangalyaan was launched by PSLV-C25 in November 2013 and entered Mars orbit in September 2014.' },
  ],
  'Biotechnology & genetics': [
    { q: 'CRISPR-Cas9 is best described as:', o: ['a gene-editing tool', 'a vaccine platform', 'a type of stem cell', 'an antibiotic'], a: 0, e: 'CRISPR-Cas9 cuts DNA at a chosen site so that genes can be removed, changed or added. Its developers won the 2020 Nobel Prize in Chemistry.' },
    { q: 'Bt cotton carries a gene taken from:', o: ['a virus', 'the bacterium Bacillus thuringiensis', 'a fungus', 'wild cotton'], a: 1, e: 'The Bt gene makes a protein toxic to bollworms, reducing the need for insecticide sprays.' },
    { q: 'Which body approves the environmental release of genetically modified crops in India?', o: ['ICMR', 'FSSAI', 'Department of Biotechnology', 'Genetic Engineering Appraisal Committee'], a: 3, e: 'The GEAC functions under the Ministry of Environment, Forest and Climate Change.' },
    { q: 'Consider the following statements about stem cells:', s: ['Embryonic stem cells are pluripotent.', 'Induced pluripotent stem cells are made by reprogramming adult cells.'], o: 'C2', a: 2, e: 'Both are correct. Pluripotent cells can become almost any cell type.' },
    { q: 'The Genome India Project, completed in 2024, sequenced the genomes of about how many Indians?', o: ['1,000', '10,000', '1 lakh', '10 lakh'], a: 1, e: 'About 10,000 genomes from diverse population groups were sequenced to build a reference database for India.' },
  ],
  'Defence technology & missiles': [
    { q: 'BrahMos is:', o: ['a supersonic cruise missile developed jointly by India and Russia', 'an intercontinental ballistic missile', 'an anti-tank guided missile', 'a nuclear submarine'], a: 0, e: 'The name comes from the Brahmaputra and Moskva rivers.' },
    { q: 'Mission Divyastra (March 2024) was a test of:', o: ['multiple independently targetable re-entry vehicle (MIRV) technology on Agni-V', 'an anti-satellite missile', 'a hypersonic glide vehicle', 'a ship-launched cruise missile'], a: 0, e: 'With MIRV, one missile can carry several warheads aimed at different targets.' },
    { q: 'Consider the following statements about INS Vikrant:', s: ['It is India\'s first indigenously designed and built aircraft carrier.', 'It was commissioned in 2022.'], o: 'C2', a: 2, e: 'Both are correct. It was built by Cochin Shipyard Limited.' },
    { q: 'Consider the following pairs (missile : type):', s: ['Prithvi : surface-to-surface', 'Akash : air-to-air', 'Nag : anti-tank'], o: 'P3', a: 1, e: 'Akash is a surface-to-air missile. Astra is India\'s air-to-air missile.' },
    { q: 'The Integrated Guided Missile Development Programme (IGMDP), led by Dr A.P.J. Abdul Kalam, was launched in:', o: ['1974', '1983', '1998', '2003'], a: 1, e: 'IGMDP (1983) developed Prithvi, Agni, Trishul, Akash and Nag.' },
  ],
  'AI, IT & cybersecurity': [
    { q: 'Which is India\'s national nodal agency for responding to cyber security incidents?', o: ['National Investigation Agency', 'CERT-In', 'DRDO', 'National Security Guard'], a: 1, e: 'CERT-In works under MeitY. NCIIPC, under the NTRO, protects critical information infrastructure.' },
    { q: 'Consider the following statements about the Digital Personal Data Protection Act, 2023:', s: ['It provides for a Data Protection Board of India.', 'It applies only to personal data processed offline.'], o: 'C2', a: 0, e: 'The Act applies to digital personal data, including data collected offline and later digitised.' },
    { q: '"Phishing" is:', o: ['tricking people into revealing passwords or financial details through fake messages or websites', 'a type of computer hardware', 'a method of encrypting data', 'an antivirus technique'], a: 0, e: 'Phishing usually comes through emails, SMS or websites that pretend to be from banks or trusted services.' },
    { q: 'Which of these was a large ransomware attack that spread worldwide in 2017?', o: ['WannaCry', 'Stuxnet', 'Pegasus', 'Mirai'], a: 0, e: 'WannaCry encrypted files and demanded payment in bitcoin. Stuxnet was a worm that targeted Iran\'s nuclear centrifuges; Pegasus is spyware; Mirai was a botnet.' },
    { q: 'A blockchain is best described as:', o: ['a distributed, tamper-resistant digital ledger', 'a central bank database', 'a type of computer virus', 'a cloud storage service'], a: 0, e: 'Records are stored across many computers in linked blocks, so changing past entries is very hard.' },
  ],
  'Nuclear technology': [
    { q: 'Consider the following statements about India\'s three-stage nuclear power programme:', s: ['Stage I uses pressurised heavy water reactors fuelled by natural uranium.', 'Stage III aims to use thorium.'], o: 'C2', a: 2, e: 'Both are correct. Homi Bhabha designed the programme because India has large thorium reserves but little uranium.' },
    { q: 'The energy of the Sun comes mainly from:', o: ['nuclear fusion', 'nuclear fission', 'chemical combustion', 'radioactive decay'], a: 0, e: 'In the Sun\'s core, hydrogen nuclei fuse to form helium and release energy.' },
    { q: 'In a pressurised heavy water reactor, heavy water is mainly used as:', o: ['fuel', 'moderator (and coolant)', 'control rod material', 'radiation shield'], a: 1, e: 'Heavy water slows down neutrons so they can sustain fission in natural uranium.' },
    { q: 'ITER, the international fusion research project in which India is a partner, is being built in:', o: ['Japan', 'the USA', 'Switzerland', 'France'], a: 3, e: 'ITER is at Cadarache in southern France. India joined in 2005.' },
    { q: 'Consider the following statements:', s: ['India is a member of the Nuclear Suppliers Group.', 'India has signed the Treaty on the Non-Proliferation of Nuclear Weapons.'], o: 'C2', a: 3, e: 'Neither is correct. India is not an NSG member and has not signed the NPT, though it received an NSG waiver in 2008.' },
  ],
  'Health, diseases & vaccines': [
    { q: 'Consider the following pairs (disease : causative agent):', s: ['Tuberculosis : bacterium', 'Malaria : protozoan', 'Dengue : virus', 'Ringworm : bacterium'], o: 'P4', a: 2, e: 'Ringworm is a fungal infection.' },
    { q: 'mRNA vaccines work by:', o: ['injecting a weakened form of the virus', 'giving cells instructions to make a viral protein, which trains the immune system', 'changing the person\'s DNA', 'injecting ready-made antibodies'], a: 1, e: 'The mRNA is broken down after use and does not enter the cell nucleus or alter DNA.' },
    { q: 'Consider the following statements:', s: ['Antimicrobial resistance occurs when microbes evolve to survive drugs designed to kill them.', 'Antibiotics are effective against viral infections.'], o: 'C2', a: 0, e: 'Antibiotics work against bacteria, not viruses. Misusing them for viral illnesses speeds up resistance.' },
    { q: 'India was certified polio-free by the World Health Organization in:', o: ['2011', '2012', '2014', '2016'], a: 2, e: 'The last wild polio case was in January 2011; WHO certified the South-East Asia region polio-free in March 2014.' },
    { q: 'Ayushman Bharat PM-JAY provides health cover of up to how much per family per year?', o: ['₹1 lakh', '₹2 lakh', '₹5 lakh', '₹10 lakh'], a: 2, e: 'PM-JAY covers secondary and tertiary hospital care up to ₹5 lakh per family per year.' },
  ],
  'Nanotechnology & new materials': [
    { q: 'One nanometre is equal to:', o: ['10⁻⁶ metre', '10⁻⁹ metre', '10⁻¹² metre', '10⁻³ metre'], a: 1, e: 'Nanotechnology works with materials roughly 1–100 nm in size, where properties can differ from the bulk material.' },
    { q: 'Consider the following statements about graphene:', s: ['It is a single layer of carbon atoms arranged in a hexagonal lattice.', 'It is a very good conductor of electricity.'], o: 'C2', a: 2, e: 'Both are correct. Graphene is also extremely strong and thin.' },
    { q: 'Fullerene (C60) is an allotrope of:', o: ['silicon', 'carbon', 'boron', 'sulphur'], a: 1, e: 'Other allotropes of carbon include diamond, graphite, graphene and carbon nanotubes.' },
    { q: 'Quantum dots, which won the 2023 Nobel Prize in Chemistry, are:', o: ['semiconductor nanocrystals whose colour depends on their size', 'subatomic particles', 'quantum computers', 'particles of dark matter'], a: 0, e: 'They are used in QLED displays and medical imaging.' },
    { q: 'Nitinol, a shape-memory alloy, is made of:', o: ['nickel and tin', 'nickel and titanium', 'niobium and tin', 'iron and nickel'], a: 1, e: 'Nitinol returns to its original shape when heated. It is used in medical stents and spectacle frames.' },
  ],
  'Semiconductors & quantum technology': [
    { q: 'The India Semiconductor Mission works under the:', o: ['Ministry of Electronics and Information Technology', 'Ministry of Heavy Industries', 'DRDO', 'ISRO'], a: 0, e: 'ISM, under MeitY\'s Digital India Corporation, runs the incentive schemes for fabs, display fabs and chip packaging units.' },
    { q: 'Consider the following statements about the National Quantum Mission:', s: ['It was approved by the Union Cabinet in 2023.', 'It is implemented by the Department of Science and Technology.'], o: 'C2', a: 2, e: 'Both are correct. It runs till 2030–31.' },
    { q: 'Unlike a classical bit, a qubit can:', o: ['exist in a superposition of 0 and 1', 'store only 0', 'store only 1', 'never be measured'], a: 0, e: 'Superposition and entanglement let quantum computers solve some problems much faster.' },
    { q: 'Adding phosphorus to pure silicon produces:', o: ['a p-type semiconductor', 'an n-type semiconductor', 'an insulator', 'a superconductor'], a: 1, e: 'Phosphorus has five valence electrons and adds free electrons, making n-type silicon. Boron makes p-type.' },
    { q: 'Quantum Key Distribution (QKD) is used for:', o: ['secure communication in which eavesdropping can be detected', 'faster internet speeds', 'storing energy', 'weather forecasting'], a: 0, e: 'Measuring a quantum state disturbs it, so any interception of the key shows up.' },
  ],
};
