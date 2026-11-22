// Offline key notes: Internal Security & Disaster Management. Keys must match SYLLABUS.security in data.js exactly.
// Standard sources: MHA annual reports, Ashok Kumar & Vipul “Challenges to Internal Security of India”, NDMA guidelines, 2nd ARC reports.
export const CONTENT = {
  'Border management': {
    overview: 'India has about 15,100 km of land borders with seven countries and about 7,500 km of coastline. Border management combines guarding, infrastructure, technology and development of border areas.',
    sections: [
      ['Borders and forces', [
        '**Bangladesh** (longest, about 4,096 km) and **Pakistan:** Border Security Force (BSF).',
        '**China:** Indo-Tibetan Border Police (ITBP). **Nepal** and **Bhutan:** Sashastra Seema Bal (SSB).',
        '**Myanmar:** Assam Rifles. **Line of Control (Pakistan):** the Army.',
        'Coast: Indian Navy, Coast Guard and State marine police (three-tier coastal security after 26/11).',
      ]],
      ['Challenges', [
        'Infiltration, smuggling (drugs, cattle, fake currency, arms), illegal migration, terrain, riverine borders.',
        'Open borders with Nepal and Bhutan; Free Movement Regime with Myanmar (being scrapped and border fenced).',
        'Drones dropping drugs and weapons on the Punjab border.',
      ]],
      ['Initiatives', [
        'Comprehensive Integrated Border Management System (CIBMS): smart fencing (e.g. BOLD-QIT on the Bangladesh riverine border).',
        'Vibrant Villages Programme (2023) for northern border villages; Phase II (2025) for other land borders.',
        'Border Area Development Programme; Integrated Check Posts (Land Ports Authority of India).',
        'Madhukar Gupta Committee (2016) on gaps in border protection.',
      ]],
    ],
    prelims: ['India shares its longest border with Bangladesh.'],
    mains: ['Discuss the challenges of managing the India–Myanmar border.'],
    traps: ['SSB guards the Nepal and Bhutan borders, not ITBP.'],
  },

  'Left-wing extremism': {
    overview: 'Left-wing extremism (LWE, or Naxalism) began at Naxalbari, West Bengal (1967). It is driven by Maoist ideology and fed by tribal alienation, land and forest issues and poor governance. The area affected has shrunk sharply. The government set March 2026 as the target for ending LWE; check the current status.',
    sections: [
      ['Causes', [
        'Land alienation, displacement by mining and projects, denial of forest rights, poverty, weak State presence, exploitation by traders and officials.',
        'The CPI (Maoist), formed in 2004, is banned under the UAPA.',
      ]],
      ['Government strategy (SAMADHAN, 2017)', [
        'Smart leadership, Aggressive strategy, Motivation and training, Actionable intelligence, Dashboard-based KPIs, Harnessing technology, Action plan for each theatre, No access to financing.',
        'National Policy and Action Plan (2015): security + development + rights of local communities.',
        'Schemes: Special Central Assistance for most-affected districts, road and mobile tower projects, Eklavya schools.',
        'Forces: CRPF, CoBRA battalions, State units like Greyhounds (Andhra and Telangana) and the District Reserve Guard (Chhattisgarh).',
      ]],
      ['Development and rights', [
        'Implement PESA and the Forest Rights Act; Gram Sabha consent for projects.',
        'Surrender and rehabilitation policies.',
        'Bastar region of Chhattisgarh remained the core area in recent years.',
      ]],
    ],
    prelims: ['The Naxalbari uprising (1967) was led by Charu Majumdar, Kanu Sanyal and Jangal Santhal.'],
    mains: ['“LWE is a development problem as much as a security problem.” Discuss.'],
    traps: ['Police and public order are State subjects, so the Centre supports States rather than leading operations directly.'],
  },

  'Insurgency in the North-East': {
    overview: 'The North-East has seen ethnic insurgencies since independence, driven by identity, migration, land and the region’s isolation. Violence has fallen sharply due to peace accords, but ethnic conflicts (e.g. Manipur since 2023) continue.',
    sections: [
      ['Major movements', [
        '**Nagaland:** NSCN (IM) and others; ceasefire since 1997; Framework Agreement (2015); dispute over a separate flag and constitution.',
        '**Assam:** ULFA (pro-talks faction signed a peace accord in 2023); Bodo movement (Bodo Peace Accord, 2020); Karbi Anglong agreement (2021).',
        '**Mizoram:** Mizo Accord (1986): the most successful example.',
        '**Tripura:** NLFT agreement (2019); Bru–Reang resettlement agreement (2020).',
        '**Manipur:** valley-based and hill-based groups; Meitei–Kuki-Zo violence since May 2023; President’s Rule in 2025.',
      ]],
      ['Laws and measures', [
        '**AFSPA, 1958:** special powers to armed forces in “disturbed areas”. Its area has been reduced in Assam, Nagaland, Manipur and Arunachal since 2022.',
        'Inner Line Permit (Arunachal, Nagaland, Mizoram, Manipur). Sixth Schedule autonomous councils.',
        'Development: Act East policy, PM-DevINE, connectivity projects.',
      ]],
    ],
    prelims: ['The Sixth Schedule applies to tribal areas of Assam, Meghalaya, Tripura and Mizoram.'],
    mains: ['Should AFSPA be repealed? Discuss with reference to the Jeevan Reddy Committee (2005).'],
    traps: ['Manipur is not under the Sixth Schedule; its hill areas have special provisions under Art. 371C and district councils under a State law.'],
  },

  'Cyber security': {
    overview: 'Cyber security protects networks, devices and data from attack. India faces threats from cyber criminals, hacktivists and State-sponsored actors, especially against critical infrastructure (power, banks, health).',
    sections: [
      ['Threats', [
        'Malware, ransomware (e.g. AIIMS Delhi attack, 2022), phishing, DDoS, data breaches, deepfakes, “digital arrest” scams, attacks on power grids.',
        'Supply-chain risks from imported hardware and software.',
      ]],
      ['Institutions', [
        '**CERT-In** (IT Act, Sec. 70B): nodal agency; incidents must be reported within six hours (2022 directions).',
        '**NCIIPC** (Sec. 70A): protects critical information infrastructure.',
        '**Indian Cyber Crime Coordination Centre (I4C)** under MHA; helpline 1930 and cybercrime.gov.in.',
        'National Cyber Security Coordinator under the National Security Council Secretariat. Defence Cyber Agency.',
      ]],
      ['Gaps and steps', [
        'Update the National Cyber Security Policy (2013); build skilled workforce; cyber hygiene; secure supply chains.',
        'Digital Personal Data Protection Act, 2023.',
        'International cooperation, though India has not joined the Budapest Convention. A UN cybercrime convention was adopted in 2024.',
      ]],
    ],
    prelims: ['Cybercrime complaints: helpline 1930 and the National Cyber Crime Reporting Portal.'],
    mains: ['Discuss the cyber threats to India’s critical infrastructure and the steps needed.'],
    traps: ['CERT-In is under MeitY; I4C is under the Ministry of Home Affairs.'],
  },

  'Money laundering & terror financing': {
    overview: 'Money laundering hides the illegal origin of money through placement, layering and integration. Terror financing funds terrorism, sometimes with legal money. India uses PMLA, UAPA and FATF standards to fight both.',
    sections: [
      ['Laws', [
        '**Prevention of Money Laundering Act (PMLA), 2002:** the Enforcement Directorate (ED) investigates. Upheld in Vijay Madanlal Choudhary (2022).',
        '**UAPA, 1967:** terrorism and its financing; amended in 2019 to designate individuals as terrorists.',
        'Fugitive Economic Offenders Act, 2018. Benami Transactions Act (amended 2016).',
        'Financial Intelligence Unit–India (FIU-IND): receives suspicious transaction reports.',
      ]],
      ['Channels', [
        'Hawala, shell companies, trade-based laundering (over- or under-invoicing), crypto assets, fake Indian currency notes, NGOs and charities, narcotics trade.',
      ]],
      ['FATF', [
        'Financial Action Task Force (1989, G7 initiative; Paris). India became a member in 2010.',
        'India’s mutual evaluation (2024) placed it in “regular follow-up”, the top category.',
        '“Grey list” (increased monitoring) and “black list” (high-risk: North Korea, Iran, Myanmar).',
        'India hosted the “No Money for Terror” conference (2022).',
      ]],
    ],
    prelims: ['The three stages of money laundering: placement, layering, integration.'],
    mains: ['How do cryptocurrencies complicate the fight against money laundering and terror financing?'],
    traps: ['The ED enforces PMLA and FEMA; it is under the Department of Revenue, Ministry of Finance.'],
  },

  'Security forces & agencies': {
    overview: 'India’s security architecture includes the armed forces (under the Ministry of Defence), central armed police forces (under the Ministry of Home Affairs), State police, and intelligence and investigative agencies.',
    sections: [
      ['Central Armed Police Forces (CAPFs, under MHA)', [
        '**BSF**, **ITBP**, **SSB** and **Assam Rifles:** border guarding (Assam Rifles is under MHA administratively; operational control with the Army).',
        '**CRPF:** largest; internal security and counter-insurgency. **CISF:** airports, industrial units, Parliament.',
        '**NSG:** counter-terrorism (“Black Cats”).',
      ]],
      ['Intelligence and investigation', [
        '**Intelligence Bureau (IB):** internal intelligence (MHA). **R&AW:** external intelligence (Cabinet Secretariat).',
        '**National Investigation Agency (NIA, 2008, after 26/11):** terror cases; powers widened in 2019.',
        '**CBI:** corruption and major crimes; needs State consent (general or case-wise).',
        'NATGRID (data integration), Multi-Agency Centre (MAC) for intelligence sharing, NCB (narcotics).',
      ]],
      ['Higher defence management', [
        'Chief of Defence Staff (CDS, created 2019; heads the Department of Military Affairs).',
        'National Security Council and the NSA. Theatre commands under discussion.',
        'Police reforms: Prakash Singh judgment (2006) with seven directives.',
      ]],
    ],
    prelims: ['The CDS is the permanent chairman of the Chiefs of Staff Committee.'],
    mains: ['Discuss the need for police reforms in India in the light of the Prakash Singh judgment.'],
    traps: ['R&AW is not under the Home Ministry; it reports to the Cabinet Secretariat.'],
  },

  'Disaster management framework': {
    overview: 'The Disaster Management Act, 2005 created a three-tier institutional framework. India’s approach has shifted from relief to risk reduction, in line with the Sendai Framework (2015–2030).',
    sections: [
      ['Institutions', [
        '**NDMA** (chaired by the PM), **SDMA** (Chief Minister), **DDMA** (District Collector).',
        '**National Executive Committee** (Union Home Secretary).',
        '**NDRF:** specialised response force (battalions drawn from CAPFs). **NIDM:** training and research.',
        'Disaster Management (Amendment) Act, 2025: urban disaster management authorities and national and State disaster databases.',
      ]],
      ['Funds', [
        'National and State Disaster Response Funds (NDRF/SDRF) and Mitigation Funds (NDMF/SDMF), as recommended by the 15th Finance Commission.',
      ]],
      ['Plans and frameworks', [
        'National Disaster Management Plan (2016, updated 2019): aligned with Sendai, SDGs and the Paris Agreement.',
        '**Sendai Framework:** four priorities: understand risk; strengthen governance; invest in resilience; enhance preparedness and “build back better”.',
        'Coalition for Disaster Resilient Infrastructure (CDRI, India-led, 2019).',
        'Early warning: IMD (cyclones, heat), INCOIS (tsunami), CWC (floods). Common Alerting Protocol (SACHET).',
      ]],
    ],
    prelims: ['The NDMA is chaired by the Prime Minister.'],
    mains: ['Discuss the shift from a relief-centric to a risk-reduction approach in Indian disaster management.'],
    traps: ['The NDRF (response force) and the National Disaster Response Fund share an abbreviation; read the context.'],
  },
};
