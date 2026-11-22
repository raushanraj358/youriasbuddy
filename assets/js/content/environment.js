// Offline key notes: Environment & Ecology. Keys must match SYLLABUS.environment in data.js exactly.
// Standard sources: NCERT Biology (Class XII, Units on Ecology), Shankar IAS Environment, MoEFCC reports, IUCN.
export const CONTENT = {
  'Ecosystems & food chains': {
    overview: 'An ecosystem is a functional unit of living (biotic) and non-living (abiotic) components that interact through energy flow and nutrient cycling. The term was coined by A.G. Tansley (1935).',
    sections: [
      ['Structure and function', [
        'Producers (autotrophs), consumers (herbivores, carnivores, omnivores) and decomposers (bacteria, fungi).',
        '**Energy flow is one-way** (sun → producers → consumers). Nutrient cycles are circular.',
        '**Ten per cent law (Lindeman):** only about 10% of energy passes to the next trophic level.',
        'Productivity: gross primary productivity minus respiration gives net primary productivity.',
      ]],
      ['Food chains and webs', [
        'Grazing food chain (starts with green plants) and detritus food chain (starts with dead organic matter).',
        'A food web is a network of interlinked food chains; more complex webs are more stable.',
        '**Ecological pyramids:** of number, biomass and energy. The pyramid of energy is always upright. The pyramid of biomass is inverted in oceans (phytoplankton vs zooplankton). The pyramid of number is inverted for a tree ecosystem.',
      ]],
      ['Key ideas', [
        '**Biomagnification:** toxins (DDT, mercury) build up at higher trophic levels.',
        '**Ecological succession:** primary (on bare rock; lichens are pioneers) and secondary (after disturbance). Ends in a climax community.',
        '**Keystone species** has an outsized impact (e.g. tiger, fig). **Flagship species** draws public support (e.g. Bengal tiger). **Indicator species** reveals environmental health (e.g. lichens for air pollution).',
        'Ecotone: transition zone between two ecosystems; shows the “edge effect”.',
      ]],
    ],
    prelims: [
      'Lichens are indicators of sulphur dioxide pollution.',
      'The pyramid of energy can never be inverted.',
    ],
    mains: ['Explain biomagnification with examples and its implications for human health.'],
    traps: ['Biomagnification increases up the food chain; bioaccumulation is the build-up within a single organism.'],
  },

  'Biodiversity & hotspots': {
    overview: 'Biodiversity is variety at three levels: genetic, species and ecosystem. India is one of 17 megadiverse countries and has parts of four of the world’s 36 biodiversity hotspots.',
    sections: [
      ['Hotspots', [
        'Concept by Norman Myers (1988). Criteria: at least 1,500 endemic vascular plants and at least 70% of original habitat lost.',
        'India’s four: **Himalaya**, **Indo-Burma** (north-east), **Western Ghats and Sri Lanka**, **Sundaland** (Nicobar Islands).',
      ]],
      ['Conservation', [
        '**In situ:** in natural habitat: national parks, sanctuaries, biosphere reserves, sacred groves, community reserves.',
        '**Ex situ:** outside habitat: zoos, botanical gardens, seed banks (Svalbard Global Seed Vault), gene banks, cryopreservation.',
        'Threats (“HIPPO”): habitat loss, invasive species, pollution, human population, over-exploitation. Plus climate change.',
      ]],
      ['Laws and conventions', [
        '**Biological Diversity Act, 2002** (amended 2023): a three-tier structure: National Biodiversity Authority (Chennai), State Biodiversity Boards, Biodiversity Management Committees (People’s Biodiversity Registers).',
        '**Convention on Biological Diversity (1992, Rio):** Cartagena Protocol (biosafety, LMOs) and Nagoya Protocol (access and benefit sharing).',
        '**Kunming–Montreal Global Biodiversity Framework (2022):** “30x30”: protect 30% of land and sea by 2030.',
      ]],
    ],
    prelims: [
      'India has about 2.4% of the world’s land area and about 7–8% of recorded species.',
      'Biosphere reserves in UNESCO’s Man and the Biosphere network: India has 13 (check the latest).',
    ],
    mains: ['Discuss the role of local communities in biodiversity conservation, citing the Biological Diversity Act.'],
    traps: ['India has 4 of the 36 hotspots; the Eastern Himalaya alone is not a separate hotspot.'],
  },

  'Protected areas & national parks': {
    overview: 'Protected areas under the Wild Life (Protection) Act, 1972 are national parks, wildlife sanctuaries, conservation reserves and community reserves. Tiger reserves and elephant reserves are overlaid on these.',
    sections: [
      ['Categories', [
        '**National park:** higher protection; no grazing or private rights; boundaries changed only by a State legislature resolution on the National Board for Wildlife’s advice.',
        '**Wildlife sanctuary:** some activities allowed; can be upgraded to a national park.',
        '**Conservation reserve** and **community reserve:** added by the 2002 amendment.',
        'The Wild Life (Protection) Amendment Act, 2022 rationalised schedules into four and implemented CITES.',
      ]],
      ['Tiger and elephant conservation', [
        'Project Tiger (1973). National Tiger Conservation Authority (NTCA, statutory since 2006).',
        'All India Tiger Estimation every four years; India has about 75% of the world’s wild tigers.',
        'Project Elephant (1992). Project Cheetah: cheetahs reintroduced at Kuno National Park (MP) from 2022.',
      ]],
      ['Notable parks', [
        'Jim Corbett (Uttarakhand, India’s first national park, 1936, as Hailey National Park).',
        'Kaziranga (Assam; one-horned rhino; UNESCO site), Gir (Gujarat; Asiatic lion), Keibul Lamjao (Manipur; floating park; sangai deer).',
        'Great Himalayan National Park, Sundarbans, Manas, Nanda Devi and Valley of Flowers (UNESCO).',
        'Hemis (Ladakh) is among the largest; snow leopard habitat.',
      ]],
    ],
    prelims: [
      'Eco-sensitive zones around protected areas are notified under the Environment Protection Act, 1986.',
      'Check the latest counts of tiger reserves and national parks before the exam.',
    ],
    mains: ['Discuss human–wildlife conflict and the steps needed to reduce it.'],
    traps: ['Grazing is not allowed in national parks but can be regulated in sanctuaries.'],
  },

  'Wetlands & Ramsar sites': {
    overview: 'Wetlands are areas where water covers the soil for all or part of the year. They filter water, control floods, store carbon and support biodiversity. The Ramsar Convention (1971, Ramsar, Iran) protects wetlands of international importance.',
    sections: [
      ['Ramsar Convention', [
        'Signed in 1971; came into force in 1975. India joined in 1982.',
        'World Wetlands Day: 2 February.',
        '**Montreux Record:** a register of Ramsar sites under threat. Indian sites on it: Keoladeo National Park (Rajasthan) and Loktak Lake (Manipur). Chilika was removed in 2002.',
        'India has the largest number of Ramsar sites in Asia. Tamil Nadu has the most sites among States. Check the latest count.',
      ]],
      ['Notable Indian wetlands', [
        'Chilika (Odisha): largest brackish-water lagoon in India; Irrawaddy dolphins. First Indian Ramsar sites with Keoladeo (1981).',
        'Wular Lake (J&K): one of Asia’s largest freshwater lakes. Loktak (Manipur): phumdis (floating biomass).',
        'Sundarbans: the largest Ramsar site in India.',
      ]],
      ['Rules and programmes', [
        'Wetlands (Conservation and Management) Rules, 2017: State Wetland Authorities.',
        'Amrit Dharohar scheme (2023) and the National Plan for Conservation of Aquatic Ecosystems.',
      ]],
    ],
    prelims: ['Ramsar is not a UN convention; UNESCO is its depositary.'],
    mains: ['Why are wetlands disappearing in urban India, and how can they be protected?'],
    traps: ['Ramsar designation does not by itself make a site a legally protected area under Indian law.'],
  },

  'Climate change & UNFCCC': {
    overview: 'Climate change is the long-term change in temperature and weather patterns, now driven mainly by greenhouse gas emissions. The UN Framework Convention on Climate Change (UNFCCC, 1992) is the main global treaty; its Conference of Parties (COP) meets every year.',
    sections: [
      ['Science basics', [
        'Greenhouse gases: CO₂, methane, nitrous oxide, fluorinated gases (HFCs). Water vapour is the most abundant.',
        'IPCC (set up in 1988 by WMO and UNEP) produces assessment reports. AR6 (2021–23) says warming is unequivocally human-caused.',
        'Global warming potential: methane about 28 times CO₂ over 100 years.',
      ]],
      ['Treaties and COPs', [
        '**Kyoto Protocol (1997):** binding targets for developed countries (Annex I).',
        '**Paris Agreement (COP21, 2015):** keep warming well below 2°C, pursue 1.5°C; Nationally Determined Contributions (NDCs) every five years; global stocktake.',
        '**COP26 Glasgow (2021):** “phase down” of coal; India announced net zero by 2070 (Panchamrit).',
        '**COP27 Sharm el-Sheikh (2022):** Loss and Damage Fund agreed. **COP28 Dubai (2023):** first global stocktake; “transitioning away from fossil fuels”.',
        '**COP29 Baku (2024):** new finance goal of US$300 billion a year by 2035. **COP30 Belém, Brazil (2025).** Check the latest outcomes.',
        'Principle: **common but differentiated responsibilities and respective capabilities (CBDR-RC).**',
      ]],
      ['India’s commitments and actions', [
        'Updated NDC (2022): cut emission intensity of GDP by 45% from 2005 levels by 2030; 50% of installed power capacity from non-fossil sources by 2030.',
        'National Action Plan on Climate Change (2008) with eight missions.',
        'International Solar Alliance (2015, with France; headquarters in Gurugram). Mission LiFE.',
        'Carbon Credit Trading Scheme (2023).',
      ]],
    ],
    prelims: ['The Kigali Amendment (2016) to the Montreal Protocol phases down HFCs.'],
    mains: ['Discuss climate justice and India’s position in global climate negotiations.'],
    traps: ['The Montreal Protocol is about the ozone layer, though its Kigali Amendment also helps the climate.'],
  },

  'Pollution & waste management': {
    overview: 'Pollution degrades air, water and soil. India regulates it through the Water Act (1974), Air Act (1981) and Environment (Protection) Act (1986), with the Central and State Pollution Control Boards.',
    sections: [
      ['Air pollution', [
        'Main pollutants: PM2.5, PM10, NO₂, SO₂, CO, O₃, NH₃, lead (eight pollutants in the National Air Quality Index).',
        'National Clean Air Programme (2019): cut particulate pollution in non-attainment cities (now 40% by 2025–26 versus 2017).',
        'Stubble burning, vehicles, construction dust and industry. Commission for Air Quality Management (NCR, 2021).',
        'Graded Response Action Plan (GRAP) for Delhi-NCR.',
      ]],
      ['Water pollution', [
        'Biochemical Oxygen Demand (BOD): higher BOD means more organic pollution.',
        'Eutrophication: excess nutrients cause algal blooms and fish deaths.',
        'Namami Gange (2014). Fluoride and arsenic contamination of groundwater.',
      ]],
      ['Waste management rules', [
        'Solid Waste Management Rules, 2016 (source segregation), Plastic Waste Management Rules (ban on identified single-use plastics from July 2022; extended producer responsibility), E-Waste Rules (2022), Bio-Medical Waste Rules (2016), Construction and Demolition Waste Rules.',
        'Swachh Bharat Mission (Urban 2.0): garbage-free cities.',
      ]],
    ],
    prelims: ['WHO revised its air quality guidelines in 2021 (annual PM2.5: 5 µg/m³).'],
    mains: ['Why does north India suffer severe winter air pollution? Suggest a multi-State strategy.'],
    traps: ['A high BOD means poorer water quality, not better.'],
  },

  'Environmental laws & institutions': {
    overview: 'India’s environmental governance rests on Art. 48A (DPSP) and Art. 51A(g) (Fundamental Duty), both added in 1976, plus Art. 21 (the right to a clean environment, through case law). Key laws and institutions implement these.',
    sections: [
      ['Major laws', [
        'Wild Life (Protection) Act, 1972. Water Act, 1974. Forest (Conservation) Act, 1980 (amended in 2023 as the Van (Sanrakshan Evam Samvardhan) Adhiniyam). Air Act, 1981.',
        '**Environment (Protection) Act, 1986:** umbrella law passed after the Bhopal gas tragedy (1984). Basis for EIA notifications and coastal regulation zones.',
        'Biological Diversity Act, 2002. Forest Rights Act, 2006. National Green Tribunal Act, 2010. CAMPA Act, 2016.',
      ]],
      ['Institutions', [
        'Ministry of Environment, Forest and Climate Change (MoEFCC). CPCB (statutory under the Water Act).',
        '**National Green Tribunal (2010):** environmental cases; must decide within six months; appeals to the Supreme Court.',
        'National Board for Wildlife (chaired by the PM). Forest Survey of India. Wildlife Crime Control Bureau.',
      ]],
      ['Doctrines from case law', [
        '**Polluter pays principle** and **precautionary principle:** Vellore Citizens’ Welfare Forum (1996).',
        '**Public trust doctrine:** M.C. Mehta v Kamal Nath (1997).',
        '**Absolute liability:** M.C. Mehta (oleum gas leak, 1986).',
        'T.N. Godavarman case (1996): wide definition of “forest”.',
        'Right against the adverse effects of climate change recognised in 2024 (M.K. Ranjitsinh, Great Indian Bustard case).',
      ]],
    ],
    prelims: ['Environmental Impact Assessment is under the EIA Notification, 2006 (issued under the EP Act, 1986).'],
    mains: ['Evaluate the role of the National Green Tribunal in environmental governance.'],
    traps: ['Art. 48A is a DPSP; Art. 51A(g) is a Fundamental Duty. Neither is directly enforceable.'],
  },

  'Species in news & IUCN status': {
    overview: 'The IUCN Red List classifies species by extinction risk. UPSC frequently asks about the status, habitat and features of species in the news, especially Indian endemics.',
    sections: [
      ['IUCN categories', [
        'Extinct (EX), Extinct in the Wild (EW), **Critically Endangered (CR)**, **Endangered (EN)**, **Vulnerable (VU)** (the three “threatened” categories), Near Threatened (NT), Least Concern (LC), Data Deficient (DD), Not Evaluated (NE).',
        'IUCN was founded in 1948; headquarters in Gland, Switzerland.',
      ]],
      ['Indian species to know (verify current status)', [
        '**Critically Endangered:** Great Indian Bustard, Gharial, Jerdon’s Courser, Malabar Civet, White-bellied Heron.',
        '**Endangered:** Tiger, Asian elephant, Ganges river dolphin, red panda, Nilgiri tahr, lion-tailed macaque, pygmy hog, forest owlet.',
        '**Vulnerable:** One-horned rhinoceros, snow leopard, gaur, sloth bear, dugong (check regional assessments).',
      ]],
      ['Related conventions', [
        '**CITES (1973):** regulates international trade. Appendix I (most threatened; trade banned except in exceptional cases), II, III.',
        '**CMS / Bonn Convention (1979):** migratory species. India hosted COP13 (Gandhinagar, 2020).',
        'TRAFFIC monitors wildlife trade (WWF + IUCN).',
      ]],
    ],
    prelims: [
      'The Great Indian Bustard is the State bird of Rajasthan; threatened by power lines.',
      'Ganges river dolphin is India’s national aquatic animal.',
    ],
    mains: ['Discuss the threats to India’s endemic species and the role of species-specific recovery programmes.'],
    traps: ['IUCN categories change; always check the latest assessment for species in news.', 'CITES regulates trade only, not habitat protection.'],
  },

  'Renewable energy & conservation': {
    overview: 'India aims for 500 GW of non-fossil capacity by 2030 and net zero by 2070. Solar and wind lead the transition, supported by green hydrogen, storage and energy efficiency.',
    sections: [
      ['Sources', [
        '**Solar:** largest share of new capacity. Schemes: PM-KUSUM (farmers), PM Surya Ghar Muft Bijli Yojana (rooftop, 2024), solar parks, PLI for solar modules.',
        '**Wind:** mainly Tamil Nadu, Gujarat, Karnataka. Offshore wind policy.',
        '**Hydro:** large hydro (above 25 MW) is counted as renewable since 2019.',
        '**Bioenergy:** ethanol blending (20% target reached in 2025), compressed biogas (SATAT), GOBARdhan.',
        '**National Green Hydrogen Mission (2023):** 5 MMT production a year by 2030.',
      ]],
      ['Energy efficiency', [
        'Bureau of Energy Efficiency (Energy Conservation Act, 2001; amended 2022 to enable a carbon market).',
        'Perform, Achieve and Trade (PAT) scheme; star labelling; UJALA (LED bulbs); Energy Conservation Building Code.',
      ]],
      ['Challenges', [
        'Intermittency and grid integration: need for battery storage and pumped hydro.',
        'Land acquisition, financing, dependence on imports (cells, wafers, critical minerals such as lithium).',
        'National Critical Mineral Mission (2025).',
      ]],
    ],
    prelims: ['Rajasthan and Gujarat lead in installed solar capacity (check latest data).'],
    mains: ['Discuss the challenges of integrating renewable energy into India’s power grid.'],
    traps: ['Large hydro is now classed as renewable energy in India (since 2019).'],
  },
};
