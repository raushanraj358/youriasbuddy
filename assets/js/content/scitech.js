// Offline key notes: Science & Technology. Keys must match SYLLABUS.scitech in data.js exactly.
// Standard sources: NCERT Science (VI–X), ISRO, DRDO, DBT and PIB releases, The Hindu Science page.
export const CONTENT = {
  'Space technology & ISRO missions': {
    overview: 'ISRO (set up in 1969; Department of Space, 1972) runs India’s space programme under Vikram Sarabhai’s vision of space for national development. UPSC asks about launch vehicles, orbits, missions and the space policy.',
    sections: [
      ['Orbits and launch vehicles', [
        '**LEO** (low earth orbit, 200–2,000 km), **SSO/polar** (sun-synchronous, for remote sensing), **GTO/GEO** (geostationary at about 35,786 km above the equator, for communication).',
        '**PSLV:** workhorse; four stages (solid and liquid alternately); polar and sun-synchronous orbits; launched Chandrayaan-1 and Mangalyaan.',
        '**GSLV Mk II:** indigenous cryogenic upper stage. **LVM3 (GSLV Mk III):** heaviest; Chandrayaan-2 and -3; to be human-rated for Gaganyaan.',
        '**SSLV:** small satellites, launch on demand.',
      ]],
      ['Major missions', [
        '**Chandrayaan-1 (2008):** found water molecules on the Moon (Moon Mineralogy Mapper).',
        '**Mars Orbiter Mission (2013):** first Asian nation to reach Mars orbit, and first in the world to succeed on the first attempt.',
        '**Chandrayaan-3 (2023):** soft landing near the lunar south pole (Shiv Shakti point, 23 August, now National Space Day).',
        '**Aditya-L1 (2023):** solar observatory at Lagrange point L1.',
        '**SpaDeX (2024–25):** docking demonstration. **Gaganyaan:** human spaceflight programme; uncrewed test flights first.',
        'Planned: Bharatiya Antariksh Station (by 2035), Chandrayaan-4 (sample return), Venus Orbiter Mission.',
      ]],
      ['Navigation and policy', [
        '**NavIC (IRNSS):** regional navigation system covering India and about 1,500 km around it.',
        'Indian Space Policy 2023; IN-SPACe (authoriser for private players); NSIL (commercial arm).',
        'Private launches: Skyroot’s Vikram-S (2022), Agnikul’s Agnibaan (2024).',
      ]],
    ],
    prelims: [
      'Geostationary satellites have an orbital period of about 24 hours and appear fixed over one point.',
      'Lagrange points are five positions where a small object can stay steady relative to two large bodies.',
    ],
    mains: ['Discuss the significance of private sector participation in India’s space sector.'],
    traps: ['Geostationary orbit is a type of geosynchronous orbit, directly above the equator; not all geosynchronous orbits are geostationary.'],
  },

  'Biotechnology & genetics': {
    overview: 'Biotechnology uses living organisms or their parts to make products. Key areas: genetic engineering, GM crops, gene editing, stem cells and diagnostics. UPSC often asks about techniques and their regulation.',
    sections: [
      ['Basics', [
        'DNA is a double helix (Watson and Crick, 1953). Genes code for proteins.',
        '**Recombinant DNA technology:** restriction enzymes cut DNA; ligase joins it; plasmids carry genes into hosts.',
        '**PCR:** amplifies DNA (used in COVID-19 tests).',
        '**CRISPR-Cas9:** precise gene editing (Doudna and Charpentier, Nobel 2020).',
      ]],
      ['Applications', [
        '**GM crops:** Bt cotton is the only GM crop approved for commercial cultivation in India (2002). GM mustard DMH-11 got environmental release approval in 2022 (court case pending).',
        'Genome-edited rice varieties (SDN-1/SDN-2, no foreign DNA) were released in 2025.',
        '**Stem cells:** embryonic (pluripotent) vs adult; induced pluripotent stem cells (iPSCs).',
        '**Gene therapy**, DNA fingerprinting, mRNA vaccines, biofortification.',
        '**Genome India Project:** sequenced 10,000 Indian genomes.',
      ]],
      ['Regulation', [
        'Genetic Engineering Appraisal Committee (GEAC) under MoEFCC approves GM organisms.',
        'Rules under the Environment (Protection) Act, 1986. Cartagena Protocol on Biosafety.',
        'SDN-1 and SDN-2 genome editing exempted from GM rules (2022).',
        'BioE3 policy (2024): biotechnology for economy, environment and employment.',
      ]],
    ],
    prelims: ['Bt cotton contains genes from Bacillus thuringiensis that produce insecticidal Cry proteins.'],
    mains: ['Discuss the ethical and ecological concerns of GM crops and gene editing.'],
    traps: ['GEAC is under MoEFCC, not the Ministry of Agriculture.'],
  },

  'Defence technology & missiles': {
    overview: 'The Defence Research and Development Organisation (DRDO, 1958) leads defence R&D. The Integrated Guided Missile Development Programme (1983, under Dr A.P.J. Abdul Kalam) developed Prithvi, Agni, Trishul, Nag and Akash.',
    sections: [
      ['Missile types', [
        '**Ballistic:** powered then free-falling on a high arc (Prithvi, Agni). **Cruise:** powered throughout, flies low (BrahMos, Nirbhay).',
        '**Agni series:** Agni-V is an ICBM-class missile (5,000+ km); MIRV test under Mission Divyastra (2024).',
        '**BrahMos:** supersonic cruise missile (India–Russia joint venture; named after the Brahmaputra and Moskva rivers).',
        '**Akash:** surface-to-air. **Nag / Helina:** anti-tank. **Astra:** air-to-air beyond visual range.',
        'Hypersonic: speed above Mach 5; HSTDV test and the long-range hypersonic missile test (2024).',
      ]],
      ['Platforms', [
        'Tejas (light combat aircraft), INS Vikrant (first indigenous aircraft carrier, commissioned 2022), INS Arihant (nuclear-powered ballistic missile submarine).',
        'Prachand (light combat helicopter), Arjun tank, Pinaka rocket system.',
        'Ballistic missile defence (two-tier: PAD/AAD) and S-400 (from Russia).',
      ]],
      ['Policy', [
        'Positive indigenisation lists; Defence Acquisition Procedure 2020; defence corridors in UP and Tamil Nadu.',
        'iDEX (Innovations for Defence Excellence). India’s defence exports have grown many times since 2014.',
      ]],
    ],
    prelims: ['India’s nuclear doctrine: no first use, credible minimum deterrence, civilian control (Nuclear Command Authority).'],
    mains: ['Discuss the challenges to self-reliance (Atmanirbharta) in defence manufacturing.'],
    traps: ['BrahMos is a cruise missile, not a ballistic missile.'],
  },

  'AI, IT & cybersecurity': {
    overview: 'Digital technologies (AI, cloud, 5G, blockchain, IoT) are reshaping governance and the economy. India’s Digital Public Infrastructure (Aadhaar, UPI, DigiLocker) is a global model. Cybersecurity and data protection are key concerns.',
    sections: [
      ['Key technologies', [
        '**Artificial intelligence:** machine learning, deep learning, generative AI (large language models).',
        '**Blockchain:** a distributed, tamper-resistant ledger. **IoT:** connected devices. **5G:** low latency; launched in India in 2022.',
        '**Quantum computing:** qubits use superposition and entanglement.',
        '**Edge computing**, **cloud computing** (IaaS, PaaS, SaaS).',
      ]],
      ['Indian initiatives', [
        'IndiaAI Mission (2024): compute capacity (GPUs), datasets, home-grown foundation models.',
        'Digital India (2015), Bharat Net, UPI (by NPCI, 2016), ONDC (open network for digital commerce).',
        '**Digital Personal Data Protection Act, 2023:** consent, data fiduciaries, Data Protection Board. Rules notified in 2025.',
        'IT Act, 2000 (Section 69A blocking; Section 79 safe harbour); IT Rules, 2021.',
      ]],
      ['Cybersecurity', [
        'Threats: malware, ransomware, phishing, DDoS, deepfakes, attacks on critical infrastructure.',
        'Institutions: CERT-In (national nodal agency), NCIIPC (critical information infrastructure), Indian Cyber Crime Coordination Centre (I4C).',
        'National Cyber Security Policy, 2013 (an updated strategy is pending).',
        'Budapest Convention: India has not joined it.',
      ]],
    ],
    prelims: ['K.S. Puttaswamy (2017) recognised privacy as a fundamental right, which paved the way for the DPDP Act.'],
    mains: ['Discuss the regulatory challenges posed by AI, including deepfakes and algorithmic bias.'],
    traps: ['CERT-In handles general cyber incidents; NCIIPC protects critical information infrastructure.'],
  },

  'Nuclear technology': {
    overview: 'Nuclear energy comes from fission (splitting heavy nuclei like uranium-235) or fusion (joining light nuclei). India follows Homi Bhabha’s three-stage nuclear programme, designed to use its large thorium reserves.',
    sections: [
      ['Three-stage programme', [
        '**Stage 1:** Pressurised Heavy Water Reactors (PHWRs) using natural uranium; produce plutonium.',
        '**Stage 2:** Fast Breeder Reactors using plutonium; the Prototype Fast Breeder Reactor (500 MW) at Kalpakkam began core loading in 2024.',
        '**Stage 3:** thorium-based reactors (thorium converted to uranium-233). Advanced Heavy Water Reactor design.',
      ]],
      ['Key concepts', [
        'Moderators slow neutrons (heavy water, graphite). Control rods absorb neutrons (boron, cadmium). Coolants remove heat.',
        'Enriched uranium has a higher share of U-235 (about 3–5% for power reactors).',
        'Small Modular Reactors (SMRs): Budget 2025 announced a Nuclear Energy Mission (target 100 GW by 2047). Bharat Small Reactors.',
        'Fusion: ITER (France); India is a member.',
      ]],
      ['Treaties and India', [
        'India has not signed the NPT (1968) or the CTBT (1996), calling them discriminatory.',
        'India–US civil nuclear agreement (123 Agreement, 2008); NSG waiver (2008).',
        'India is a member of the MTCR (2016), Wassenaar Arrangement (2017) and Australia Group (2018), but not the NSG.',
        'Civil Liability for Nuclear Damage Act, 2010. Atomic Energy Act, 1962.',
      ]],
    ],
    prelims: ['Pokhran-I (1974, “Smiling Buddha”) and Pokhran-II (1998, Operation Shakti).'],
    mains: ['Discuss the role of nuclear energy in India’s energy transition and the barriers to its expansion.'],
    traps: ['India is not a member of the Nuclear Suppliers Group, though it got a waiver in 2008.'],
  },

  'Health, diseases & vaccines': {
    overview: 'Questions cover pathogens, diseases, vaccines, public health programmes and emerging health technologies. Link science to policy (e.g. elimination targets, antimicrobial resistance).',
    sections: [
      ['Pathogens and diseases', [
        '**Viral:** COVID-19, influenza, HIV, hepatitis, dengue, chikungunya, Nipah, mpox, measles, polio, rabies.',
        '**Bacterial:** tuberculosis, cholera, typhoid, leprosy, diphtheria, tetanus, pertussis, plague.',
        '**Protozoan:** malaria (Plasmodium; Anopheles mosquito), kala-azar (Leishmania; sandfly), amoebiasis.',
        '**Fungal:** candidiasis, mucormycosis (“black fungus”). **Helminth:** filariasis, roundworm.',
        'Non-communicable diseases (heart disease, diabetes, cancer) cause most deaths in India.',
      ]],
      ['Vaccines', [
        'Types: live attenuated (MMR, oral polio), inactivated (IPV), subunit/recombinant (hepatitis B, HPV), toxoid (tetanus), viral vector (Covishield), mRNA, DNA (ZyCoV-D, the world’s first DNA vaccine for humans).',
        'Universal Immunisation Programme (1985); Mission Indradhanush (2014). U-WIN digital platform.',
        'HPV vaccine for cervical cancer (Cervavac, indigenous).',
        'India was declared polio-free in 2014; maternal and neonatal tetanus eliminated in 2015.',
      ]],
      ['Public health concerns and programmes', [
        'Antimicrobial resistance (AMR): misuse of antibiotics. Kerala’s action plan; Red Line campaign.',
        'TB elimination target (2025, ahead of the SDG’s 2030); Ni-kshay Poshan Yojana.',
        'Ayushman Bharat: PM-JAY (insurance, ₹5 lakh per family; extended to all aged 70+) and Ayushman Arogya Mandirs.',
        'One Health approach: links human, animal and environmental health.',
      ]],
    ],
    prelims: ['Malaria is caused by a protozoan, not a virus or bacterium.'],
    mains: ['Discuss the threat of antimicrobial resistance and India’s response.'],
    traps: ['Antibiotics do not work against viruses.', 'Kala-azar is spread by sandflies, not mosquitoes.'],
  },

  'Nanotechnology & new materials': {
    overview: 'Nanotechnology works with materials at 1–100 nanometres, where properties change (e.g. greater reactivity, different colour or strength). New materials such as graphene and metamaterials have wide uses.',
    sections: [
      ['Key materials', [
        '**Graphene:** a single layer of carbon atoms in a hexagonal lattice; very strong, light, highly conductive. Nobel 2010 (Geim and Novoselov).',
        '**Carbon nanotubes** and **fullerenes** (buckyballs, C60).',
        '**Quantum dots:** nanocrystals whose colour depends on size; used in displays and imaging. Nobel in Chemistry 2023.',
        '**Metamaterials:** engineered structures with unusual properties (e.g. negative refraction).',
        '**Aerogels**, **shape memory alloys** (nitinol), **smart materials**.',
      ]],
      ['Applications', [
        'Medicine: targeted drug delivery, diagnostics. Energy: better solar cells and batteries. Water purification (nano-filters, nano-silver).',
        'Agriculture: nano-urea (IFFCO, 2021) and nano-DAP.',
      ]],
      ['Concerns and India’s programme', [
        'Toxicity of nanoparticles, environmental persistence and unclear regulation.',
        'Nano Mission (2007) under the Department of Science and Technology.',
      ]],
    ],
    prelims: ['One nanometre is a billionth of a metre (10⁻⁹ m).'],
    mains: ['Discuss the potential of nanotechnology in agriculture and the risks involved.'],
    traps: ['Graphene is a form of carbon, not a metal or a polymer.'],
  },

  'Semiconductors & quantum technology': {
    overview: 'Semiconductors are the base of all electronics, and India is building a chip ecosystem. Quantum technologies (computing, communication, sensing) use quantum effects like superposition and entanglement.',
    sections: [
      ['Semiconductors', [
        'Materials with conductivity between conductors and insulators (silicon, germanium, gallium nitride). Doping creates n-type and p-type materials.',
        'Value chain: design, fabrication (fabs), assembly, testing, marking and packaging (ATMP / OSAT).',
        '**India Semiconductor Mission (2021):** incentives for fabs, display fabs and ATMP units. Projects include the Tata–PSMC fab at Dholera and the Micron ATMP unit at Sanand (Gujarat).',
        'First “Made in India” chips from domestic units expected or launched in 2025 (check the latest).',
        'Global concentration: Taiwan (TSMC) leads advanced manufacturing; the Netherlands (ASML) makes EUV lithography machines.',
      ]],
      ['Quantum technology', [
        '**Qubits** can be 0 and 1 at the same time (superposition); entangled qubits stay linked.',
        '**Quantum computing:** may break current encryption; could speed up drug discovery and materials science.',
        '**Quantum key distribution (QKD):** secure communication; any eavesdropping is detected.',
        '**National Quantum Mission (2023):** ₹6,003 crore over 2023–31; target of 50–1,000 qubit computers; four thematic hubs.',
      ]],
    ],
    prelims: ['Nobel Prize in Physics 2022 went to Aspect, Clauser and Zeilinger for experiments with entangled photons.'],
    mains: ['Why is semiconductor manufacturing strategically important for India, and what are the hurdles?'],
    traps: ['ATMP/OSAT units package and test chips; they do not fabricate wafers.'],
  },
};
