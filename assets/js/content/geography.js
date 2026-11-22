// Offline key notes: Geography. Keys must match SYLLABUS.geography in data.js exactly.
// Standard sources: NCERT Class XI (Fundamentals of Physical Geography; India: Physical Environment), Class XII, G.C. Leong, an atlas.
export const CONTENT = {
  'Geomorphology & landforms': {
    overview: 'Geomorphology studies the origin and change of landforms. Landforms are shaped by endogenic forces (from inside the earth: diastrophism, volcanism) and exogenic forces (on the surface: weathering, erosion by rivers, wind, glaciers, waves and groundwater).',
    sections: [
      ['Interior of the earth', [
        'Layers: crust (oceanic crust is basaltic and denser; continental crust is granitic), mantle (asthenosphere is the source of magma), core (outer core liquid, inner core solid).',
        'Discontinuities: Mohorovičić (crust–mantle), Gutenberg (mantle–core), Lehmann (outer–inner core).',
        'Seismic waves: P-waves travel through solids and liquids; S-waves only through solids. The S-wave shadow zone shows the outer core is liquid.',
      ]],
      ['Plate tectonics', [
        'Wegener’s continental drift (1912): Pangaea, Panthalassa. Evidence: jigsaw fit, fossils (Glossopteris, Mesosaurus), tillite.',
        'Sea-floor spreading (Harry Hess, 1960s): new crust at mid-ocean ridges; rocks are younger near the ridge.',
        '**Boundaries:** divergent (Mid-Atlantic Ridge, East African Rift), convergent (Himalaya: continent–continent; Andes: ocean–continent; Japan: ocean–ocean), transform (San Andreas Fault).',
      ]],
      ['Landforms by agents', [
        '**Rivers:** V-shaped valleys, gorges, waterfalls (youth); meanders, oxbow lakes (maturity); floodplains, deltas (old age).',
        '**Glaciers:** U-shaped valleys, cirques, aretes, horns, moraines, eskers, drumlins.',
        '**Wind:** mushroom rocks (pedestal), yardangs, barchans (crescent dunes), loess.',
        '**Groundwater (karst):** sinkholes, caves, stalactites (hang from the roof) and stalagmites (rise from the floor).',
        '**Waves:** cliffs, sea arches, stacks, spits, bars, lagoons.',
      ]],
    ],
    prelims: [
      'The Himalayas are young fold mountains formed by the Indian plate colliding with the Eurasian plate.',
      'Weathering is in-place breakdown of rock; erosion involves transport.',
    ],
    mains: ['Explain how plate tectonics accounts for the distribution of earthquakes, volcanoes and fold mountains.'],
    traps: ['Stalactites hang from the ceiling; stalagmites rise from the floor.', 'S-waves cannot pass through liquids.'],
  },

  'Climatology & Indian monsoon': {
    overview: 'Climatology covers the atmosphere’s structure, insolation, pressure and winds, humidity and precipitation. The Indian monsoon is a seasonal reversal of winds, explained by differential heating, the ITCZ shift, jet streams and ocean–atmosphere links such as El Niño and the Indian Ocean Dipole.',
    sections: [
      ['Atmosphere and winds', [
        'Layers: troposphere (weather; height about 8 km at the poles and 18 km at the equator), stratosphere (ozone layer), mesosphere (coldest; meteors burn), thermosphere (ionosphere), exosphere.',
        'Pressure belts: equatorial low, subtropical highs (about 30°), subpolar lows (about 60°), polar highs.',
        'Planetary winds: trade winds, westerlies (roaring forties), polar easterlies. Coriolis force deflects winds to the right in the Northern Hemisphere.',
        'Local winds: loo (north India, hot and dry), mango showers (Kerala, Karnataka), kalbaisakhi / nor’westers (Bengal), chinook, foehn, sirocco, mistral.',
      ]],
      ['Mechanism of the Indian monsoon', [
        'Shift of the ITCZ (Inter-Tropical Convergence Zone) north to the Ganga plains in summer (the monsoon trough).',
        'Low pressure over the Tibetan plateau; the **tropical easterly jet** over the peninsula; the subtropical westerly jet moves north of the Himalaya.',
        'Onset over Kerala around 1 June. Two branches: Arabian Sea and Bay of Bengal.',
        'Retreating (north-east) monsoon gives Tamil Nadu most of its rain in October–December.',
        '“Breaks” in the monsoon occur when the trough shifts to the Himalayan foothills.',
      ]],
      ['ENSO and IOD', [
        '**El Niño:** warming of the central and eastern Pacific; usually weakens the Indian monsoon.',
        '**La Niña:** cooling; usually strengthens it.',
        '**Indian Ocean Dipole (IOD):** a positive IOD (warmer western Indian Ocean) usually helps the Indian monsoon.',
        '**Madden–Julian Oscillation (MJO):** an eastward-moving pulse of clouds and rain that affects monsoon breaks.',
      ]],
    ],
    prelims: [
      'Koeppen’s climate classification uses temperature and precipitation; India has climates such as Amw (Konkan coast), As (Coromandel coast), BWhw (western Rajasthan).',
      'Mawsynram and Cherrapunji (Meghalaya) receive the highest rainfall in India.',
    ],
    mains: ['Discuss the effect of climate change on the Indian monsoon’s variability and extreme rainfall events.'],
    traps: ['Tamil Nadu gets most of its rain from the north-east (retreating) monsoon, not the south-west monsoon.'],
  },

  'Oceanography & currents': {
    overview: 'Oceanography covers ocean floor relief, temperature and salinity, waves, tides and currents. Currents redistribute heat and shape climates, fisheries and deserts.',
    sections: [
      ['Ocean floor relief', [
        'Continental shelf (shallow, rich in fish and oil), continental slope, deep-sea plain (abyssal plain), and ocean deeps (trenches).',
        'Mariana Trench (Challenger Deep) in the Pacific is the deepest point.',
        'Mid-ocean ridges, seamounts, guyots (flat-topped), atolls.',
      ]],
      ['Temperature and salinity', [
        'Average salinity is about 35 parts per thousand. Highest in partly enclosed seas in hot, dry areas (Dead Sea, Red Sea); low near river mouths and polar ice melt.',
        'Thermocline: layer where temperature falls sharply with depth.',
      ]],
      ['Currents', [
        '**Warm currents** (from the equator): Gulf Stream, Kuroshio, Brazil, East Australian, Agulhas.',
        '**Cold currents** (towards the equator): Labrador, Oyashio, California, Peru (Humboldt), Benguela, Canary, West Australian.',
        'Cold currents on the western coasts of continents help form deserts (Atacama, Namib).',
        'Where warm and cold currents meet: rich fishing grounds (Grand Banks near Newfoundland, north-east Japan).',
        'Indian Ocean currents reverse with the monsoon in the north.',
      ]],
      ['Tides', [
        'Caused mainly by the moon’s gravity. Spring tides at new and full moon (sun, moon and earth aligned); neap tides at the quarter moons.',
        'Bay of Fundy (Canada) has the highest tides in the world.',
      ]],
    ],
    prelims: [
      'The Gulf Stream keeps north-western Europe warm in winter.',
      'Upwelling of cold water off Peru brings nutrients and supports anchovy fisheries; El Niño disrupts it.',
    ],
    mains: ['How do ocean currents influence climate and economic activities? Give examples.'],
    traps: ['The Labrador current is cold; the Gulf Stream is warm.', 'Spring tides have nothing to do with the spring season.'],
  },

  'Physiography of India': {
    overview: 'India has six physiographic divisions: the Himalaya, the Northern Plains, the Peninsular Plateau, the Indian Desert, the Coastal Plains and the Islands.',
    sections: [
      ['The Himalaya', [
        'Three parallel ranges: **Greater Himalaya (Himadri)**, **Lesser Himalaya (Himachal)** with hill stations, and **Shiwaliks** (outermost; duns such as Dehradun).',
        'Regional divisions: Punjab Himalaya (Indus–Satluj), Kumaon (Satluj–Kali), Nepal (Kali–Teesta), Assam (Teesta–Dihang).',
        'Purvanchal (eastern hills): Patkai, Naga, Mizo, Garo–Khasi–Jaintia.',
      ]],
      ['Northern Plains', [
        'Formed by the Indus, Ganga and Brahmaputra systems.',
        'Bhabar (pebbles; streams disappear), Terai (marshy), Bhangar (older alluvium, kankar), Khadar (newer alluvium, fertile).',
      ]],
      ['Peninsular Plateau', [
        'Part of Gondwanaland; made of old crystalline, igneous and metamorphic rocks.',
        'Central Highlands (Malwa, Bundelkhand, Chotanagpur) and the Deccan Plateau.',
        '**Western Ghats (Sahyadri):** continuous, higher; Anamudi is the highest peak of South India.',
        '**Eastern Ghats:** discontinuous, cut by rivers; Mahendragiri is a high point.',
        'Aravalli: among the oldest fold mountains in the world; Guru Shikhar (Mount Abu) is the highest point.',
      ]],
      ['Desert, coasts and islands', [
        'Thar Desert west of the Aravalli; Luni the only major river.',
        'Western coast: Konkan, Kannad, Malabar (lagoons/kayals). Eastern coast: Northern Circars and Coromandel; broad deltas.',
        'Andaman and Nicobar (volcanic and tectonic; Barren Island is India’s only active volcano). Lakshadweep (coral).',
      ]],
    ],
    prelims: [
      'Kanchenjunga is the highest peak in India; K2 lies in the Indian-claimed territory of PoK/Gilgit-Baltistan.',
      'Ten Degree Channel separates the Andamans from the Nicobars; Nine Degree Channel separates Lakshadweep (Kavaratti side) from Minicoy.',
    ],
    mains: ['Explain how the Himalaya affect India’s climate, drainage and economy.'],
    traps: ['Barren Island, not Narcondam, is the active volcano (Narcondam is dormant).'],
  },

  'Drainage systems & rivers': {
    overview: 'Indian rivers fall into the Himalayan (perennial; fed by snow and rain; deep gorges; meanders) and Peninsular (seasonal; mostly rain-fed; older; graded valleys) systems.',
    sections: [
      ['Himalayan rivers', [
        '**Indus:** rises near Lake Mansarovar (Tibet). Tributaries: Jhelum, Chenab, Ravi, Beas, Satluj. **Indus Waters Treaty (1960):** India controls the eastern rivers (Ravi, Beas, Satluj); Pakistan gets the western rivers (Indus, Jhelum, Chenab), with limited Indian use. India put the treaty “in abeyance” in 2025.',
        '**Ganga:** Bhagirathi (from Gangotri/Gaumukh) and Alaknanda meet at Devprayag. Right-bank: Yamuna, Son. Left-bank: Ramganga, Gomti, Ghaghara, Gandak, Kosi (“sorrow of Bihar”).',
        '**Brahmaputra:** Tsangpo in Tibet, Siang/Dihang in Arunachal; Jamuna in Bangladesh. Majuli is a river island.',
      ]],
      ['Peninsular rivers', [
        '**East-flowing (form deltas):** Mahanadi, Godavari (“Dakshin Ganga”, longest peninsular river), Krishna, Kaveri.',
        '**West-flowing (form estuaries):** Narmada and Tapi flow through rift valleys. Also Sabarmati, Mahi.',
        'Kaveri gets rain from both monsoons, so its flow is fairly steady.',
      ]],
      ['Drainage patterns', [
        'Dendritic (Ganga plains), trellis, radial (Amarkantak, from which the Narmada and Son flow), centripetal (Loktak lake), rectangular.',
      ]],
    ],
    prelims: [
      'The Narmada rises at Amarkantak; the Tapi at Multai (Betul).',
      'Chambal is known for badland (ravine) topography.',
    ],
    mains: ['Discuss the benefits and risks of the river interlinking project.'],
    traps: ['Narmada and Tapi form estuaries, not deltas.', 'Godavari, not Krishna, is the longest peninsular river.'],
  },

  'Soils & natural vegetation': {
    overview: 'The ICAR classifies Indian soils into eight major groups. Natural vegetation depends mainly on rainfall and temperature, ranging from tropical evergreen forests to alpine vegetation.',
    sections: [
      ['Major soils', [
        '**Alluvial:** most widespread; rich in potash, poor in nitrogen and phosphorus.',
        '**Black (regur):** from Deccan basalt; high clay; holds moisture; self-ploughing (cracks); best for cotton.',
        '**Red and yellow:** iron oxide gives the red colour; on crystalline rocks.',
        '**Laterite:** heavy leaching in high rainfall; good for cashew, tea, coffee; used as bricks.',
        '**Arid:** sandy, saline; kankar layer. **Saline/alkaline (reh, kallar, usar):** poor drainage.',
        '**Peaty:** high organic matter (Kerala, Sundarbans). **Forest/mountain soils.**',
      ]],
      ['Natural vegetation', [
        '**Tropical evergreen:** rainfall over 200 cm; Western Ghats, north-east, Andamans; ebony, mahogany, rosewood.',
        '**Tropical deciduous (monsoon):** most widespread; teak, sal, sandalwood.',
        '**Thorn forests:** below 70 cm rainfall; babool, khejri.',
        '**Montane:** oak and chestnut at lower heights; deodar, pine, fir higher up; alpine meadows above.',
        '**Mangroves (tidal):** Sundarbans (sundari tree), Bhitarkanika, Pichavaram.',
      ]],
    ],
    prelims: [
      'The India State of Forest Report is published every two years by the Forest Survey of India (Dehradun).',
      'Black soil is poor in nitrogen and phosphorus but rich in lime, iron, magnesia and potash.',
    ],
    mains: ['Discuss soil degradation in India and steps to address it (soil health cards, watershed development).'],
    traps: ['Laterite soil forms from leaching in high rainfall, not in deserts.'],
  },

  'Agriculture & cropping patterns': {
    overview: 'Agriculture supports about 45% of India’s workforce. Cropping depends on seasons (kharif, rabi, zaid), soil and irrigation. Key issues: small holdings, water stress, low productivity and market access.',
    sections: [
      ['Cropping seasons', [
        '**Kharif (June–October):** rice, maize, jowar, bajra, cotton, groundnut, soybean.',
        '**Rabi (October–March):** wheat, barley, mustard, gram, peas.',
        '**Zaid (summer):** watermelon, cucumber, fodder crops.',
      ]],
      ['Major crops and conditions', [
        '**Rice:** high temperature, rainfall over 100 cm. **Wheat:** cool growing season, bright sun at ripening.',
        '**Cotton:** black soil, 210 frost-free days. **Jute:** “golden fibre”; West Bengal delta.',
        '**Sugarcane:** tropical and subtropical; Uttar Pradesh is the largest producer.',
        '**Tea:** hill slopes, well-drained soil (Assam, Darjeeling, Nilgiris). **Coffee:** Karnataka is the largest producer.',
      ]],
      ['Revolutions and policy', [
        'Green (food grains, 1960s; M.S. Swaminathan), White (milk; Verghese Kurien, Operation Flood), Blue (fisheries), Yellow (oilseeds), Golden (horticulture, honey).',
        'Cropping systems: intercropping, mixed cropping, multiple cropping.',
        'Shifting cultivation: jhum (north-east), podu (Andhra Pradesh, Odisha).',
      ]],
    ],
    prelims: [
      'India is the largest producer of milk and pulses, and among the top two producers of rice and wheat (check the latest rankings).',
      'Millets (shree anna) are climate-resilient; 2023 was the International Year of Millets.',
    ],
    mains: ['Discuss the need for crop diversification in Punjab and Haryana.'],
    traps: ['Mustard is a rabi crop; groundnut is mostly kharif.'],
  },

  'Minerals, energy & industries': {
    overview: 'India’s minerals are concentrated in the peninsular plateau, especially the Chotanagpur belt. Industrial location depends on raw material, power, labour, market and transport.',
    sections: [
      ['Mineral belts', [
        '**North-eastern plateau (Chotanagpur, Odisha):** iron ore, coal, manganese, bauxite, mica.',
        '**South-western plateau (Karnataka, Goa):** iron ore, manganese. **North-western (Rajasthan):** copper, zinc, lead, building stone.',
        'Iron ore: haematite and magnetite are the best. Odisha is the largest producer.',
        'Coal: Gondwana coal (about 98% of reserves) in the Damodar, Mahanadi and Godavari valleys. Tertiary coal in the north-east.',
      ]],
      ['Energy', [
        'Thermal power dominates installed capacity; renewables are growing fast.',
        'Target: 500 GW of non-fossil capacity by 2030 and net zero by 2070.',
        'Nuclear plants: Tarapur (first, 1969), Kudankulam (largest), Kaiga, Rawatbhata, Kakrapar, Narora, Kalpakkam.',
        'Thorium: monazite sands of Kerala.',
      ]],
      ['Industries', [
        'Iron and steel: near the coal–iron belt (Jamshedpur, Bhilai, Rourkela, Bokaro, Durgapur).',
        'Cotton textiles: Mumbai, Ahmedabad (“Manchester of India”). Jute: Hooghly basin.',
        'IT: Bengaluru, Hyderabad, Pune.',
      ]],
    ],
    prelims: ['Jharkhand and Odisha have the largest coal reserves; Neyveli (Tamil Nadu) has lignite.'],
    mains: ['Discuss factors that decide the location of the iron and steel industry in India.'],
    traps: ['Tarapur is India’s first nuclear power plant, not Kudankulam.'],
  },

  'Mapping: places in news': {
    overview: 'Mapping questions test locations: straits, rivers, mountain passes, national parks, islands and conflict zones. Learn places with a map beside you and link each to current events.',
    sections: [
      ['How to study', [
        'Keep a blank political map of India and the world. Mark each place you read about in the news.',
        'For each place, note: country/State, the nearby water body or river, neighbours and why it is in the news.',
        'Revise by region (e.g. West Asia, Indo-Pacific, Africa’s Sahel, Central Asia).',
      ]],
      ['High-value world locations', [
        'Straits: Hormuz (Iran–Oman), Bab-el-Mandeb (Yemen–Djibouti/Eritrea), Malacca (Malaysia–Indonesia), Bosphorus and Dardanelles (Turkey), Gibraltar, Taiwan Strait.',
        'Seas and gulfs: Red Sea, Black Sea, Caspian Sea (landlocked), Gulf of Aden, South China Sea.',
        'Landlocked countries in news: Afghanistan, Kazakhstan, Ethiopia, Armenia, Nepal, Bhutan.',
      ]],
      ['India mapping', [
        'Passes: Zoji La (Srinagar–Leh), Shipki La (Himachal–Tibet), Nathu La (Sikkim), Bomdi La (Arunachal).',
        'Tiger reserves, Ramsar sites and national parks by State (check the latest counts).',
        'Islands: Andaman and Nicobar, Lakshadweep, and those in news (e.g. Katchatheevu).',
      ]],
    ],
    prelims: ['UPSC often asks which countries border a sea or river, and which rivers flow through a State.'],
    mains: ['Use maps in Mains answers wherever possible; they save words and earn marks.'],
    traps: ['Check the latest counts for tiger reserves and Ramsar sites before the exam; they change every year.'],
  },

  'Earthquakes, cyclones & hazards': {
    overview: 'India is exposed to earthquakes, cyclones, floods, droughts, landslides, tsunamis, heatwaves and lightning. The Disaster Management Act, 2005 and the Sendai Framework (2015–2030) guide risk reduction.',
    sections: [
      ['Earthquakes', [
        'Focus (hypocentre) is the point of origin; epicentre is the point directly above on the surface.',
        'Measured by the Richter scale (magnitude, logarithmic) or the moment magnitude scale; intensity by the Mercalli scale.',
        'India’s seismic zones: II to V. Zone V includes the north-east, Himalayan belt, Kutch and the Andamans.',
      ]],
      ['Cyclones', [
        'Tropical cyclones need warm seas (above about 27°C), the Coriolis force (so they do not form at the equator), low wind shear and pre-existing disturbance.',
        'Bay of Bengal sees more cyclones than the Arabian Sea, though Arabian Sea cyclones have increased.',
        'Names come from the WMO/ESCAP panel lists for the north Indian Ocean.',
        'Anticlockwise rotation in the Northern Hemisphere.',
      ]],
      ['Other hazards', [
        'Floods: Assam, Bihar (Kosi). Droughts: rain-shadow areas and arid zones.',
        'Landslides: Himalaya and Western Ghats. Tsunami: Indian Ocean (2004). Heatwaves and lightning are emerging killers.',
        'Glacial lake outburst floods (GLOF): Sikkim (South Lhonak lake, 2023), Kedarnath (2013).',
      ]],
    ],
    prelims: ['The Indian Tsunami Early Warning Centre is at INCOIS, Hyderabad.'],
    mains: ['Discuss Odisha’s cyclone management as a model of disaster risk reduction.'],
    traps: ['Cyclones do not form at the equator because the Coriolis force is zero there.'],
  },

  'Population & settlement geography': {
    overview: 'Population geography covers distribution, density, growth, composition and migration. Settlement geography studies rural and urban settlement patterns.',
    sections: [
      ['Indian population basics (Census 2011)', [
        'Population about 121 crore; density 382 per sq km; sex ratio 943; literacy 74%.',
        'Most populous State: Uttar Pradesh. Highest density: Bihar. Highest sex ratio: Kerala. Lowest: Haryana.',
        'The next census (with caste enumeration) is due; check the latest status.',
      ]],
      ['Demographic transition', [
        'Stage 1: high birth and death rates. Stage 2: death rate falls (population explosion). Stage 3: birth rate falls. Stage 4: both low.',
        'India’s total fertility rate is below replacement level (2.0 in NFHS-5); a “demographic dividend” window.',
      ]],
      ['Settlements', [
        'Rural patterns: clustered, semi-clustered, hamleted, dispersed.',
        'Urban: census towns (population 5,000+, density 400+/sq km, 75% of male workers outside agriculture), statutory towns, urban agglomerations.',
        'Migration: rural to urban is the most common; marriage is the main reason for female migration.',
      ]],
    ],
    prelims: ['Census town criteria: 5,000 people, 400 per sq km density, 75% male main workers in non-farm work.'],
    mains: ['How can India reap its demographic dividend? Discuss skills, health and jobs.'],
    traps: ['Bihar has the highest population density, not Uttar Pradesh or West Bengal (Census 2011).'],
  },
};
