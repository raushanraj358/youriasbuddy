// Offline key notes: History. Keys must match SYLLABUS.history in data.js exactly.
// Standard sources: NCERT (Old: R.S. Sharma, Satish Chandra, Bipan Chandra; New: Themes in Indian History), Spectrum, Bipan Chandra “India’s Struggle for Independence”.
export const CONTENT = {
  'Prehistoric India: sources & phases': {
    overview: 'Indian history is divided into prehistory (no writing), protohistory (writing exists but is undeciphered, e.g. the Harappan script) and history (written records that can be read). Sources are archaeological and literary.',
    sections: [
      ['Sources of ancient Indian history', [
        '**Archaeological:** sites, tools, pottery, coins (numismatics), inscriptions (epigraphy), monuments.',
        '**Inscriptions:** the earliest deciphered are Ashoka’s, mostly in Prakrit in the Brahmi script. James Prinsep deciphered Brahmi in 1837.',
        '**Literary:** religious (Vedas, Buddhist Tripitakas, Jain Agamas, Puranas) and secular (Arthashastra, Kalidasa’s works, Kalhana’s Rajatarangini).',
        '**Foreign accounts:** Megasthenes (Indica), Fa-Hien (Chandragupta II), Hiuen Tsang (Harsha), I-tsing, Al-Biruni (Kitab-ul-Hind).',
      ]],
      ['Phases', [
        '**Stone Age:** Palaeolithic, Mesolithic, Neolithic.',
        '**Metal Age:** Chalcolithic (copper + stone), Bronze Age (Harappan), Iron Age (Painted Grey Ware culture, later Vedic period).',
        'Chronology varies by region: the Neolithic in the Kashmir valley and the Chalcolithic in central India overlapped with other cultures.',
      ]],
    ],
    prelims: [
      'Rajatarangini (12th century, Kalhana) is considered the first true historical text of India.',
      'Robert Bruce Foote discovered the first Palaeolithic tool in India at Pallavaram (near Chennai) in 1863.',
      'Rock-cut edicts of Ashoka in Greek and Aramaic have been found at Kandahar (Afghanistan).',
    ],
    mains: ['Discuss how archaeology and literary sources complement each other in reconstructing early Indian history.'],
    traps: ['The Harappan script is undeciphered, so the Harappan period is protohistoric, not historic.'],
  },

  'Stone Age: Palaeolithic, Mesolithic & Neolithic': {
    overview: 'The Stone Age is divided by tool technology and way of life: hunting-gathering in the Palaeolithic, microliths and the beginnings of domestication in the Mesolithic, and settled farming with polished stone tools in the Neolithic.',
    sections: [
      ['Palaeolithic (Old Stone Age)', [
        '**Lower:** hand-axes and cleavers (Acheulian). Sites: Sohan valley (Pakistan), Belan valley (UP), Bhimbetka (MP), Didwana (Rajasthan), Hunsgi (Karnataka), Attirampakkam (TN).',
        '**Middle:** flake tools (scrapers, borers). Sites: Narmada, Luni, Tungabhadra valleys.',
        '**Upper:** blades and burins; coincides with the arrival of Homo sapiens.',
        'Bhimbetka rock shelters (UNESCO site) have paintings from the Upper Palaeolithic onwards.',
      ]],
      ['Mesolithic (Middle Stone Age)', [
        '**Microliths:** tiny stone tools fixed to wood or bone.',
        'Earliest evidence of animal domestication: Adamgarh (MP) and Bagor (Rajasthan).',
        'Burials: Sarai Nahar Rai and Mahadaha (UP).',
      ]],
      ['Neolithic (New Stone Age)', [
        'Polished stone tools, farming, pottery, settled villages.',
        '**Mehrgarh (Baluchistan, c. 7000 BCE):** earliest farming in the subcontinent (wheat, barley).',
        '**Burzahom and Gufkral (Kashmir):** pit dwellings; dogs buried with masters at Burzahom.',
        '**Chirand (Bihar):** bone tools. **Koldihwa (UP):** early rice evidence.',
        '**Southern Neolithic:** ash mounds at Utnur and Kupgal (Karnataka). **Daojali Hading (Assam):** eastern Neolithic.',
      ]],
    ],
    prelims: [
      'Mehrgarh shows the earliest evidence of farming and of cotton cultivation in the subcontinent.',
      'Pit dwellings: Burzahom. Ash mounds: southern Neolithic sites.',
      'Bhimbetka was found by V.S. Wakankar in 1957.',
    ],
    mains: ['Explain the “Neolithic revolution” and its social consequences.'],
    traps: ['Microliths are characteristic of the Mesolithic, not the Palaeolithic.', 'Burzahom is Neolithic, not Harappan.'],
  },

  'Chalcolithic & Megalithic cultures': {
    overview: 'Chalcolithic cultures used copper alongside stone. Most were rural and some are earlier than, some contemporary with and some later than the Harappan civilisation. Megaliths are burials marked by large stones, common in South India in the Iron Age.',
    sections: [
      ['Major Chalcolithic cultures', [
        '**Ahar–Banas (Rajasthan):** Ahar, Gilund, Balathal. Black-and-red ware.',
        '**Kayatha (MP).** **Malwa culture:** Navdatoli, Eran, Nagda. Known for its rich pottery.',
        '**Jorwe (Maharashtra):** Inamgaon (fortified, pre-urban), Daimabad (bronze chariot and figures), Chandoli, Nevasa.',
        '**Ochre Coloured Pottery (OCP) culture:** Ganga–Yamuna doab; linked with copper hoards.',
        'Features: painted pottery (black-on-red), burials beneath house floors in Maharashtra, worship of a mother goddess and the bull.',
      ]],
      ['Megalithic culture', [
        'Mainly in the Deccan and South India from about 1000 BCE. Iron tools found in graves.',
        'Types: cists, dolmens, menhirs, cairn circles, urn burials.',
        'Sites: Brahmagiri, Maski (Karnataka), Adichanallur (TN), Junapani (Maharashtra).',
        'Black-and-red ware pottery is typical.',
      ]],
    ],
    prelims: [
      'Inamgaon is a large fortified Chalcolithic settlement. Daimabad yielded a bronze chariot.',
      'Chalcolithic people were mostly unfamiliar with burnt bricks.',
    ],
    mains: ['Compare the Chalcolithic cultures of central India and the Deccan with the Harappan civilisation.'],
    traps: ['Daimabad is Chalcolithic (Jorwe/late Harappan), not a Mesolithic site.'],
  },

  'Indus Valley Civilisation': {
    overview: 'The Harappan civilisation (mature phase c. 2600–1900 BCE) was a Bronze Age urban culture spread across present-day Pakistan, north-west and western India. Harappa was the first site discovered (Daya Ram Sahni, 1921), followed by Mohenjo-daro (R.D. Banerji, 1922).',
    sections: [
      ['Town planning', [
        'Grid pattern of streets, burnt bricks of standard ratio (4:2:1), covered drainage.',
        'Citadel (western, raised) and lower town (eastern). Dholavira has three divisions.',
        '**Great Bath:** Mohenjo-daro. **Granary:** Harappa (and Mohenjo-daro).',
        '**Dockyard:** Lothal (Gujarat). **Fire altars:** Kalibangan, Lothal.',
      ]],
      ['Economy and society', [
        'Agriculture: wheat, barley, cotton (earliest cotton production). Ploughed field at Kalibangan.',
        'Trade with Mesopotamia (called “Meluhha” in Mesopotamian records). Persian Gulf seals found.',
        'Standard weights (binary and decimal system), seals of steatite (unicorn the most common motif).',
        'Crafts: bead-making (Chanhudaro, Lothal), bronze “Dancing Girl” (Mohenjo-daro), bearded priest (steatite).',
        'Religion: “Pashupati” seal (proto-Shiva), mother goddess figurines, worship of trees and animals.',
      ]],
      ['Important sites (river / state)', [
        'Harappa (Ravi, Punjab, Pakistan), Mohenjo-daro (Indus, Sindh), Chanhudaro (Sindh, no citadel), Kalibangan (Ghaggar, Rajasthan), Lothal (Bhogava, Gujarat), Dholavira (Gujarat, UNESCO site 2021), Rakhigarhi (Haryana, among the largest), Banawali (Haryana), Ropar (Punjab), Surkotada (horse remains, Gujarat), Shortughai (Afghanistan, trade outpost).',
      ]],
      ['Decline', [
        'Theories: climate change and drying of rivers (Ghaggar-Hakra), floods, tectonic shifts, decline in trade. The Aryan invasion theory (Wheeler) is now largely rejected.',
      ]],
    ],
    prelims: [
      'The Harappan script is pictographic, written mostly right to left (boustrophedon on some), and remains undeciphered.',
      'Dholavira had an advanced water conservation system and a signboard.',
      'No temples or palaces have been clearly identified.',
    ],
    mains: ['What does Harappan town planning tell us about its society and administration?'],
    traps: ['Iron was not known to the Harappans.', 'Lothal is the dockyard site; Kalibangan has the ploughed field.'],
  },

  'Vedic age': {
    overview: 'The Vedic period (c. 1500–600 BCE) is known mainly from the Vedas. It is split into the Early Vedic (Rig Vedic, c. 1500–1000 BCE) and Later Vedic (c. 1000–600 BCE) phases. Society moved from pastoral and tribal to agricultural and territorial.',
    sections: [
      ['Vedic literature', [
        '**Four Vedas:** Rig (hymns; 10 mandalas; Gayatri Mantra in Book III), Sama (chants; origin of Indian music), Yajur (sacrificial formulas; Shukla and Krishna), Atharva (charms, spells, folk medicine).',
        'Each Veda has Brahmanas (rituals), Aranyakas (forest texts) and Upanishads (philosophy).',
        '“Satyameva Jayate” is from the Mundaka Upanishad.',
      ]],
      ['Early Vedic (Rig Vedic)', [
        'Area: “Sapta Sindhu” (land of seven rivers). Saraswati the most sacred river.',
        'Pastoral economy; cattle was wealth (gavishti meant search for cows, i.e. war).',
        'Tribal polity: rajan, with the assemblies **sabha** and **samiti** (women attended the sabha), vidatha.',
        'Battle of Ten Kings (Dasarajna): Sudas of the Bharata tribe won on the Parushni (Ravi).',
        'Gods: Indra (most important), Agni, Varuna (rita, the cosmic order).',
        'Varna mentioned in the Purusha Sukta (Book X), a later addition; the system was not rigid.',
      ]],
      ['Later Vedic', [
        'Shift to the Ganga plains; iron (krishna ayas) and Painted Grey Ware.',
        'Agriculture became primary. Kingdoms (janapadas) emerged; the king’s power grew; rituals like Rajasuya, Ashvamedha, Vajapeya.',
        'Varna became more rigid; position of women declined. The four ashramas took shape.',
        'Prajapati, Vishnu and Rudra rose in importance.',
      ]],
    ],
    prelims: [
      'The Rig Veda is the oldest. The Boghazkoi inscription (Turkey, c. 1400 BCE) names Vedic gods.',
      'Bali was a voluntary offering in the Rig Vedic period, later a regular tax.',
      'Upanishads: around 108; they discuss Brahman and Atman; foundation of Vedanta.',
    ],
    mains: ['Compare the polity, economy and society of the Early and Later Vedic periods.'],
    traps: ['Iron came in the Later Vedic period, not the Rig Vedic.', 'Women attended the sabha in the Rig Vedic period; this declined later.'],
  },

  'Buddhism & Jainism': {
    overview: 'In the 6th century BCE, many heterodox sects challenged Vedic ritualism and Brahmin dominance. Buddhism and Jainism were the most influential, backed by the new trading class and rulers of the Mahajanapadas.',
    sections: [
      ['Buddhism', [
        'Gautama Buddha (c. 563–483 BCE), born at Lumbini, Sakya clan. Enlightenment at Bodh Gaya, first sermon at Sarnath (Dharmachakra Pravartana), death (mahaparinirvana) at Kushinagar.',
        '**Four Noble Truths** and the **Eightfold Path**; the Middle Way.',
        '**Tripitaka** (in Pali): Vinaya (rules), Sutta (teachings), Abhidhamma (philosophy).',
        '**Councils:** 1st Rajagriha (Ajatashatru, Mahakashyapa), 2nd Vaishali (Kalashoka), 3rd Pataliputra (Ashoka, Moggaliputta Tissa), 4th Kashmir (Kanishka, Vasumitra; split into Mahayana and Hinayana).',
        'Schools: Hinayana/Theravada (Buddha as teacher, Pali), Mahayana (Buddha as god, Bodhisattvas, Sanskrit), Vajrayana (Tantric).',
      ]],
      ['Jainism', [
        '24 Tirthankaras; Rishabhanatha the first, Parshvanatha the 23rd, **Mahavira** the 24th.',
        'Mahavira born at Kundagrama (near Vaishali); attained kaivalya; died at Pava.',
        '**Five vows:** ahimsa, satya, asteya, aparigraha and brahmacharya (the fifth added by Mahavira).',
        '**Triratna:** right faith, right knowledge, right conduct.',
        '**Anekantavada** and **Syadvada:** truth has many sides.',
        'Split: Digambaras (sky-clad; Bhadrabahu, moved south) and Svetambaras (white-clad; Sthulabhadra).',
        'Councils: Pataliputra (c. 300 BCE) and Vallabhi (5th century CE, canon finalised in Prakrit).',
      ]],
    ],
    prelims: [
      'Both used Prakrit/Pali (people’s language) instead of Sanskrit.',
      'Chandragupta Maurya adopted Jainism and died at Shravanabelagola (Karnataka).',
      'Gomateshwara (Bahubali) statue at Shravanabelagola built by Chamundaraya (10th century).',
    ],
    mains: ['Why did Buddhism decline in India while Jainism survived?'],
    traps: ['Brahmacharya was added by Mahavira, not Parshvanatha.', 'The 4th Buddhist Council was held in Kashmir under Kanishka, not in Pataliputra.'],
  },

  'Mauryan empire': {
    overview: 'The Mauryan empire (c. 321–185 BCE) was India’s first large empire. Chandragupta Maurya founded it with Kautilya’s help after defeating the Nandas. Ashoka extended it and is famed for his policy of Dhamma.',
    sections: [
      ['Rulers', [
        '**Chandragupta Maurya:** defeated Seleucus Nikator (305 BCE), who sent Megasthenes as ambassador. Embraced Jainism.',
        '**Bindusara:** called “Amitraghata” (slayer of foes). Had contact with the Ajivikas.',
        '**Ashoka (c. 268–232 BCE):** Kalinga war (c. 261 BCE) changed him. Turned to Buddhism under Upagupta. Brihadratha, the last Mauryan, was killed by Pushyamitra Shunga (185 BCE).',
      ]],
      ['Administration (Arthashastra and Indica)', [
        'Centralised: king, mantriparishad, a large bureaucracy. Provinces under princes (kumaras).',
        'Officials: samaharta (revenue collection), sannidhata (treasury), and spies.',
        'Megasthenes described seven castes and Pataliputra’s municipal administration (six committees of five members each).',
      ]],
      ['Ashoka’s Dhamma and edicts', [
        'Dhamma: a moral code (tolerance, non-violence, respect for elders, welfare of animals), not a religion.',
        'Dhamma Mahamattas appointed to spread it.',
        '**Major Rock Edict XIII:** describes the Kalinga war.',
        'Most edicts are in Prakrit and Brahmi; Kharosthi in the north-west; Greek and Aramaic in Afghanistan.',
        'Ashoka is called “Devanampiya Piyadasi”; the name “Ashoka” appears in the Maski and Gujarra edicts.',
        '**Sarnath Lion Capital:** India’s national emblem.',
      ]],
    ],
    prelims: [
      'The 3rd Buddhist Council was held under Ashoka; missionaries were sent to Sri Lanka (Mahinda and Sanghamitra).',
      'Mauryan polished pillars are monolithic and made of Chunar sandstone.',
    ],
    mains: ['Was Ashoka’s Dhamma a political tool or a moral vision? Discuss.'],
    traps: ['Arthashastra is by Kautilya; Indica is by Megasthenes, now known only from quotations by later writers.'],
  },

  'Gupta & post-Gupta period': {
    overview: 'The Gupta age (c. 320–550 CE) is often called the “classical age” for its achievements in literature, science and art. After it, regional powers such as the Vardhanas (Harsha), Chalukyas, Pallavas and Rashtrakutas emerged.',
    sections: [
      ['Gupta rulers', [
        '**Chandragupta I:** began the Gupta era (319–320 CE); married the Lichchhavi princess Kumaradevi.',
        '**Samudragupta:** the Allahabad Pillar inscription (Prayag Prashasti) by Harisena; V.A. Smith called him the “Napoleon of India”; shown playing the veena on coins.',
        '**Chandragupta II (Vikramaditya):** defeated the Shakas; Fa-Hien visited; navaratnas including Kalidasa; the Mehrauli iron pillar.',
        '**Kumaragupta I:** Nalanda University founded. **Skandagupta:** resisted the Hunas.',
      ]],
      ['Gupta culture and science', [
        'Literature: Kalidasa (Abhijnanashakuntalam, Meghaduta), Vishakhadatta (Mudrarakshasa), Shudraka (Mrichchhakatika).',
        'Science: Aryabhata (Aryabhatiya; earth rotates on its axis; place value), Varahamihira (Brihat Samhita), Brahmagupta (later, 7th century).',
        'Art: Ajanta paintings (some caves), Deogarh Dashavatara temple (early Nagara temple), Udayagiri caves.',
        'Gold coins (dinars) in large numbers; land grants to Brahmins increased (feudal trends).',
      ]],
      ['Post-Gupta', [
        '**Harsha (606–647 CE):** capital Kannauj; Hiuen Tsang visited; held assemblies at Kannauj and Prayag; Banabhatta wrote Harshacharita. Defeated by Pulakeshin II on the Narmada.',
        '**Chalukyas of Badami:** Pulakeshin II; Aihole inscription by Ravikirti.',
        '**Pallavas (Kanchi):** Mahendravarman I, Narasimhavarman I (Mamallapuram rathas).',
      ]],
    ],
    prelims: [
      'Fa-Hien came during Chandragupta II’s reign; Hiuen Tsang during Harsha’s.',
      'Kalidasa was among the navaratnas of Chandragupta II (traditionally).',
    ],
    mains: ['Was the Gupta period a “golden age”? Present a balanced view.'],
    traps: ['Harsha wrote Ratnavali, Nagananda and Priyadarshika; Banabhatta wrote Harshacharita.'],
  },

  'Delhi Sultanate': {
    overview: 'The Delhi Sultanate (1206–1526) was ruled by five dynasties: Mamluk (Slave), Khalji, Tughlaq, Sayyid and Lodi. It began after Muhammad Ghori’s death and ended when Babur defeated Ibrahim Lodi at Panipat (1526).',
    sections: [
      ['Dynasties and rulers', [
        '**Mamluk:** Qutbuddin Aibak (began the Qutub Minar), Iltutmish (consolidated, iqta system, silver tanka and copper jital, Chahalgani), Razia Sultan (first woman ruler), Balban (theory of kingship, sijda and paibos).',
        '**Khalji:** Alauddin Khalji: market reforms, branding of horses (dagh), descriptive rolls (huliya), defeated Mongol raids, Malik Kafur’s campaigns to the south.',
        '**Tughlaq:** Muhammad bin Tughlaq: capital shifted to Daulatabad, token currency, taxation in the doab. Firoz Shah Tughlaq: canals, jizya on Brahmins, new towns.',
        '**Sayyid** and **Lodi:** Bahlol, Sikandar (founded Agra; gaz-i-Sikandari measure), Ibrahim.',
      ]],
      ['Administration', [
        '**Iqta:** revenue assignment in place of salary.',
        'Ministers: wazir (finance), diwan-i-arz (military), diwan-i-risalat (religious affairs), diwan-i-insha (correspondence).',
        'Revenue: kharaj (land), jizya, khams (war booty), zakat.',
      ]],
      ['Culture', [
        'Indo-Islamic architecture: true arch and dome (Alai Darwaza, first true arch). Qutub Minar completed by Iltutmish.',
        'Amir Khusrau (“parrot of India”), associated with the tabla, sitar and qawwali (by tradition).',
        'Ziauddin Barani (Tarikh-i-Firoz Shahi), Minhaj-us-Siraj (Tabaqat-i-Nasiri).',
      ]],
    ],
    prelims: [
      'Ibn Battuta visited during Muhammad bin Tughlaq’s reign (Rihla).',
      'Timur invaded Delhi in 1398 during the Tughlaq period.',
    ],
    mains: ['Assess Alauddin Khalji’s market reforms and the reasons behind them.'],
    traps: ['Alai Darwaza (Alauddin Khalji) has the first true arch; Qutub Minar was begun by Aibak and completed by Iltutmish.'],
  },

  'Mughal empire': {
    overview: 'The Mughal empire (1526–1857) was founded by Babur after the First Battle of Panipat. It reached its peak under Akbar and Aurangzeb and declined in the 18th century.',
    sections: [
      ['Rulers and battles', [
        '**Babur:** Panipat I (1526, vs Ibrahim Lodi), Khanwa (1527, vs Rana Sanga), Ghaghra (1529). Wrote Tuzuk-i-Baburi in Turkish.',
        '**Humayun:** lost to Sher Shah Suri at Chausa (1539) and Kannauj (1540); regained Delhi in 1555.',
        '**Sher Shah Suri:** rupiya silver coin, the Grand Trunk Road revived, land measurement, sarais.',
        '**Akbar:** Panipat II (1556, vs Hemu), mansabdari, Din-i-Ilahi (1582), Ibadat Khana at Fatehpur Sikri, sulh-i-kul, abolished jizya.',
        '**Jahangir:** chain of justice; Sir Thomas Roe visited. **Shah Jahan:** Taj Mahal, Red Fort, Jama Masjid. **Aurangzeb:** reimposed jizya (1679); Deccan wars.',
      ]],
      ['Administration', [
        '**Mansabdari:** ranks with zat (personal rank) and sawar (horsemen).',
        '**Jagirdari:** revenue assignment. **Zabti / dahsala:** Raja Todar Mal’s land revenue system based on average yields over ten years.',
        'Subas (provinces) under subedars.',
      ]],
      ['Culture', [
        'Abul Fazl: Akbarnama and Ain-i-Akbari. Translation bureau: Mahabharata into Persian as Razmnama.',
        'Mughal painting peaked under Jahangir (Ustad Mansur, animal and bird studies).',
        'Architecture: Humayun’s Tomb (first garden tomb, Persian charbagh), Buland Darwaza, Taj Mahal (pietra dura).',
      ]],
    ],
    prelims: [
      'Aurangzeb’s death in 1707 marks the start of the decline. Nadir Shah invaded in 1739 and took the Peacock Throne.',
      'Third Battle of Panipat (1761): Ahmad Shah Abdali defeated the Marathas.',
    ],
    mains: ['Explain the causes of the decline of the Mughal empire in the 18th century.'],
    traps: ['Rupiya was introduced by Sher Shah Suri, not Akbar.', 'Panipat II was Akbar (Bairam Khan) vs Hemu; Panipat III was Marathas vs Abdali.'],
  },

  'Bhakti & Sufi movements': {
    overview: 'The Bhakti movement stressed personal devotion to God over ritual and caste. It began with the Alvars and Nayanars in Tamil Nadu (6th–9th century) and spread north. Sufism was the mystical side of Islam that came with the Sultanate.',
    sections: [
      ['Bhakti in the south', [
        '**Alvars** (12, devotees of Vishnu): their hymns form the Nalayira Divya Prabandham. Andal was a woman Alvar.',
        '**Nayanars** (63, devotees of Shiva): hymns compiled in the Tirumurai. Karaikkal Ammaiyar was a woman Nayanar.',
        'Philosophers: Shankaracharya (Advaita), Ramanuja (Vishishtadvaita), Madhva (Dvaita), Nimbarka (Dvaitadvaita), Vallabha (Shuddhadvaita).',
        'Basavanna (12th century, Karnataka): Lingayat / Virashaiva movement; vachanas.',
      ]],
      ['Bhakti in the north', [
        '**Nirguna (formless God):** Kabir (dohas; in the Guru Granth Sahib), Guru Nanak (founded Sikhism), Ravidas.',
        '**Saguna (God with form):** Tulsidas (Ramcharitmanas), Surdas (Krishna), Mirabai (Rajasthan).',
        'Maharashtra (Warkari sect): Jnaneshwar (Jnaneshwari), Namdev, Eknath, Tukaram (abhangas).',
        'Bengal: Chaitanya Mahaprabhu (Gaudiya Vaishnavism, kirtan). Assam: Sankaradeva (Ekasarana Dharma, sattras, namghars).',
      ]],
      ['Sufism', [
        'Silsilas (orders): **Chishti** (Moinuddin Chishti at Ajmer; Nizamuddin Auliya in Delhi; kept away from the court; sama, i.e. music), **Suhrawardi** (accepted State patronage), **Naqshbandi** (orthodox; Sheikh Ahmad Sirhindi), **Qadiri**.',
        'Concepts: khanqah (hospice), pir/murid (master/disciple), dargah, wahdat-ul-wujud (unity of being).',
      ]],
    ],
    prelims: [
      'Kabir’s and Ravidas’s verses are included in the Guru Granth Sahib.',
      'Sankaradeva’s sattras and namghars are in Assam; Majuli has many sattras.',
    ],
    mains: ['How did the Bhakti and Sufi movements shape India’s composite culture?'],
    traps: ['Kabir was a nirguna saint, while Tulsidas and Surdas were saguna.', 'Naqshbandi was the orthodox order; Chishtis avoided the court.'],
  },

  'Advent of Europeans': {
    overview: 'After Vasco da Gama reached Calicut in 1498, the Portuguese, Dutch, English, Danes and French competed for Indian trade. The English East India Company emerged supreme after defeating the French and winning Plassey and Buxar.',
    sections: [
      ['The Portuguese', [
        'Vasco da Gama reached Calicut (1498); welcomed by the Zamorin.',
        'Francisco de Almeida: “blue water policy”. Alfonso de Albuquerque captured Goa from Bijapur (1510).',
        'Introduced the cartaz system, tobacco, and the printing press in Goa (1556).',
      ]],
      ['The Dutch, English, Danes and French', [
        '**Dutch:** VOC (1602); Masulipatnam factory; defeated by the English at Bedara/Chinsura (1759).',
        '**English:** East India Company chartered 31 December 1600. First factory at Surat (1613). Got Bombay as dowry (1661). Farman of 1717 from Farrukhsiyar (“Magna Carta” of the company).',
        '**Danes:** Tranquebar (1620), Serampore.',
        '**French:** Compagnie des Indes (1664), Pondicherry. Dupleix vs Clive in the **Carnatic Wars** (1746–63); Battle of Wandiwash (1760) ended French ambitions.',
      ]],
      ['British conquest of Bengal', [
        '**Battle of Plassey (1757):** Clive defeated Siraj-ud-Daulah through Mir Jafar’s betrayal.',
        '**Battle of Buxar (1764):** the English beat Mir Qasim, Shuja-ud-Daulah (Awadh) and Shah Alam II.',
        '**Treaty of Allahabad (1765):** the Company got the Diwani (revenue rights) of Bengal, Bihar and Orissa. Dual government in Bengal (1765–72).',
      ]],
    ],
    prelims: [
      'The Portuguese were the first to come and the last to leave (Goa, 1961).',
      'Order of arrival: Portuguese, Dutch, English, Danes, French.',
    ],
    mains: ['Why did the English succeed where other European powers failed in India?'],
    traps: ['Buxar, not Plassey, gave the English the Diwani and established their real power.'],
  },

  'Revolt of 1857': {
    overview: 'The Revolt of 1857 began at Meerut on 10 May 1857 when sepoys rose against the Company. It spread across north and central India. Although suppressed, it ended Company rule: the Government of India Act, 1858 transferred power to the Crown.',
    sections: [
      ['Causes', [
        '**Political:** Doctrine of Lapse (Dalhousie: Satara, Jhansi, Nagpur), annexation of Awadh (1856) on charges of misgovernment.',
        '**Economic:** heavy land revenue, ruin of artisans, drain of wealth.',
        '**Socio-religious:** fear of conversion, social reforms seen as interference (widow remarriage act, 1856).',
        '**Military:** General Service Enlistment Act (1856); low pay; the **Enfield rifle** cartridges said to be greased with cow and pig fat (immediate cause). Mangal Pandey (Barrackpore, March 1857).',
      ]],
      ['Centres and leaders', [
        'Delhi: Bahadur Shah Zafar (nominal leader), Bakht Khan.',
        'Kanpur: Nana Saheb, Tantia Tope. Lucknow: Begum Hazrat Mahal. Jhansi: Rani Lakshmibai.',
        'Bihar (Jagdishpur): Kunwar Singh. Bareilly: Khan Bahadur Khan. Faizabad: Maulvi Ahmadullah.',
      ]],
      ['Nature and consequences', [
        'Views: V.D. Savarkar called it the “First War of Independence”. Others call it a sepoy mutiny or a feudal reaction.',
        'Reasons for failure: limited spread (south, Punjab, Bengal largely quiet), lack of unity and plan, poor arms, support of many princes for the British.',
        '**Queen’s Proclamation (1 November 1858):** end of annexations, religious tolerance, Secretary of State for India and the Viceroy.',
        'Army reorganised: more Europeans, “divide and rule” in recruitment.',
      ]],
    ],
    prelims: ['Lord Canning was Governor-General during the revolt and became the first Viceroy.'],
    mains: ['Was the 1857 revolt a war of independence? Argue with evidence.'],
    traps: ['The revolt broke out at Meerut on 10 May 1857; Mangal Pandey’s act at Barrackpore was earlier, in March.'],
  },

  'Socio-religious reform movements': {
    overview: 'The 19th-century reform movements sought to modernise Indian society using reason and humanism. They fought sati, child marriage, caste discrimination and the denial of women’s education, and revived pride in Indian traditions.',
    sections: [
      ['Reformist movements', [
        '**Raja Ram Mohan Roy:** Atmiya Sabha (1815), **Brahmo Samaj** (1828). Campaign led to the abolition of sati (Regulation XVII, 1829, by Lord William Bentinck).',
        '**Ishwar Chandra Vidyasagar:** Hindu Widows’ Remarriage Act, 1856; girls’ education.',
        '**Prarthana Samaj (1867, Bombay):** Atmaram Pandurang, M.G. Ranade.',
        '**Jyotiba Phule:** Satyashodhak Samaj (1873); Gulamgiri; school for girls with Savitribai Phule (1848, Pune).',
        '**Aligarh Movement:** Sir Syed Ahmad Khan, Muhammadan Anglo-Oriental College (1875).',
      ]],
      ['Revivalist movements', [
        '**Arya Samaj (1875):** Swami Dayananda Saraswati; “Back to the Vedas”; Satyarth Prakash; shuddhi movement.',
        '**Ramakrishna Mission (1897):** Swami Vivekananda; social service; Chicago Parliament of Religions (1893).',
        '**Theosophical Society:** founded in New York (1875); headquarters at Adyar (1882); Annie Besant.',
        '**Deoband movement (1866):** orthodox Muslim scholars; opposed British rule.',
      ]],
      ['In the south and among other communities', [
        'Sree Narayana Guru (Kerala): SNDP Yogam; “one caste, one religion, one God”.',
        'E.V. Ramasamy “Periyar”: Self-Respect Movement (1925).',
        'Parsi: Rahnumai Mazdayasnan Sabha. Sikh: Singh Sabha movement, Akali movement (Gurdwara Act, 1925).',
      ]],
    ],
    prelims: ['Sharda Act (Child Marriage Restraint Act), 1929: age of marriage 14 for girls and 18 for boys.'],
    mains: ['Discuss the limitations of 19th-century reform movements (urban, upper-caste base).'],
    traps: ['Sati was abolished in 1829; the widow remarriage law came in 1856.'],
  },

  'Gandhian phase of the freedom struggle': {
    overview: 'From 1917 to 1947, Gandhi turned the national movement into a mass struggle using satyagraha (truth-force) and non-violence. The main mass movements were Non-Cooperation, Civil Disobedience and Quit India.',
    sections: [
      ['Early satyagrahas', [
        '**Champaran (1917):** against the tinkathia system (indigo cultivation).',
        '**Ahmedabad mill strike (1918):** first hunger strike.',
        '**Kheda (1918):** revenue remission after crop failure (with Sardar Patel).',
        '**Rowlatt Satyagraha (1919)**, followed by the Jallianwala Bagh massacre (13 April 1919).',
      ]],
      ['Mass movements', [
        '**Non-Cooperation Movement (1920–22):** linked with the Khilafat issue; boycott of councils, courts, schools and foreign cloth. Withdrawn after Chauri Chaura (February 1922).',
        '**Civil Disobedience Movement (1930–34):** Purna Swaraj resolution at Lahore (1929); Dandi March (12 March to 6 April 1930); Gandhi–Irwin Pact (1931); Second Round Table Conference; Poona Pact (1932) with Ambedkar.',
        '**Quit India Movement (1942):** “Do or die” (Gowalia Tank, Bombay, 8 August 1942); parallel governments at Ballia, Tamluk and Satara.',
      ]],
      ['Towards independence', [
        'Cripps Mission (1942), Wavell Plan and Shimla Conference (1945), Cabinet Mission (1946), Direct Action Day (16 August 1946).',
        'Mountbatten Plan (3 June 1947) and Indian Independence Act, 1947.',
        'Parallel strands: revolutionaries (Bhagat Singh, HSRA), Subhas Chandra Bose and the INA, Royal Indian Navy mutiny (1946).',
      ]],
    ],
    prelims: [
      'Gandhi returned from South Africa on 9 January 1915 (now Pravasi Bharatiya Divas).',
      'Gandhi attended only the Second Round Table Conference (1931).',
    ],
    mains: ['Explain how Gandhi made the national movement a mass movement.'],
    traps: ['Purna Swaraj was declared at Lahore (1929) under Nehru; 26 January 1930 was celebrated as Independence Day.'],
  },

  'Constitutional developments 1773–1947': {
    overview: 'Between 1773 and 1947, British Acts gradually built India’s administrative and constitutional framework: from control of the Company, to representation of Indians, to provincial autonomy and finally independence.',
    sections: [
      ['Under Company rule', [
        '**Regulating Act, 1773:** Governor of Bengal became Governor-General of Bengal (Warren Hastings); Supreme Court at Calcutta (1774).',
        '**Pitt’s India Act, 1784:** Board of Control; dual government by the Company and Crown.',
        '**Charter Act, 1813:** ended the Company’s trade monopoly (except tea and China); ₹1 lakh for education.',
        '**Charter Act, 1833:** Governor-General of India (Lord William Bentinck); the Company became purely administrative.',
        '**Charter Act, 1853:** open competition for the civil services.',
      ]],
      ['Under the Crown', [
        '**Government of India Act, 1858:** Secretary of State and a Council of India; Viceroy.',
        '**Indian Councils Acts 1861, 1892, 1909:** 1861 began the portfolio system; 1892 indirect elections; 1909 (Morley–Minto) separate electorates for Muslims.',
        '**Government of India Act, 1919 (Montagu–Chelmsford):** dyarchy in provinces (reserved and transferred subjects); bicameral central legislature.',
        '**Government of India Act, 1935:** provincial autonomy; dyarchy at the centre (never implemented); All-India Federation (not formed); Federal Court (1937); RBI.',
        '**Indian Independence Act, 1947:** ended British rule; two dominions; Constituent Assembly became the legislature.',
      ]],
    ],
    prelims: [
      'The Government of India Act, 1935 is the largest single source of the Indian Constitution.',
      'Simon Commission (1927) had no Indian members, hence “Simon go back”.',
    ],
    mains: ['How did the 1935 Act shape the structure of the Indian Constitution?'],
    traps: ['Separate electorates came in 1909, not 1919.', 'Dyarchy was in provinces in 1919 and proposed at the centre in 1935.'],
  },

  'Post-independence consolidation': {
    overview: 'After 1947, India had to integrate princely States, reorganise States, build democratic institutions, plan the economy and frame a foreign policy. Bipan Chandra’s “India Since Independence” is the standard source.',
    sections: [
      ['Integration of princely States', [
        'About 560 princely States. Sardar Patel and V.P. Menon used the Instrument of Accession and Standstill Agreements.',
        'Holdouts: Junagadh (plebiscite, 1948), Hyderabad (Operation Polo, 1948), Kashmir (accession in October 1947).',
        'French areas (Pondicherry) were transferred by 1954; Goa liberated in 1961 (Operation Vijay).',
      ]],
      ['Reorganisation of States', [
        'Dhar Commission (1948) and the JVP Committee (Jawaharlal, Vallabhbhai, Pattabhi) were against linguistic States.',
        'Potti Sriramulu’s fast-unto-death led to Andhra State (1953).',
        'Fazl Ali Commission (States Reorganisation Commission) led to the States Reorganisation Act, 1956 (14 States, 6 UTs).',
        'Later: Maharashtra and Gujarat (1960), Nagaland (1963), Punjab and Haryana (1966).',
      ]],
      ['Nation building', [
        'First general elections 1951–52. Five-Year Plans from 1951. Land reforms (zamindari abolition).',
        'Non-Alignment; Panchsheel with China (1954); 1962 war.',
        'Green Revolution in the late 1960s.',
      ]],
    ],
    prelims: ['Sikkim became a full State by the 36th Amendment (1975).'],
    mains: ['Evaluate the challenges India faced in the first two decades after independence.'],
    traps: ['Andhra State (1953) was the first linguistic State, before the 1956 Act.'],
  },

  'World history: revolutions & world wars': {
    overview: 'GS-I covers world history from the 18th century: industrial revolution, world wars, redrawing of national boundaries, colonisation, decolonisation, and ideologies such as communism, capitalism and socialism.',
    sections: [
      ['Revolutions', [
        '**American Revolution (1775–83):** “no taxation without representation”; Declaration of Independence (4 July 1776).',
        '**French Revolution (1789):** storming of the Bastille; liberty, equality, fraternity; Declaration of the Rights of Man.',
        '**Industrial Revolution:** began in Britain in the late 18th century (textiles, steam power).',
        '**Russian Revolution (1917):** February and October; Bolsheviks under Lenin.',
      ]],
      ['World War I (1914–18)', [
        'Causes: militarism, alliances (Triple Entente vs Triple Alliance), imperialism, nationalism. Immediate cause: assassination of Archduke Franz Ferdinand at Sarajevo.',
        'Treaty of Versailles (1919); League of Nations.',
      ]],
      ['Between the wars and World War II (1939–45)', [
        'Great Depression (1929); rise of fascism (Mussolini) and Nazism (Hitler).',
        'Germany invaded Poland (1 September 1939). Pearl Harbor (December 1941) brought the US in.',
        'Ended with the atomic bombings of Hiroshima and Nagasaki (August 1945). United Nations formed (24 October 1945).',
        'After it: Cold War, decolonisation in Asia and Africa, NATO (1949) and the Warsaw Pact (1955).',
      ]],
    ],
    prelims: ['Bretton Woods (1944) created the IMF and the World Bank.'],
    mains: ['How did the World Wars accelerate decolonisation?'],
    traps: ['The League of Nations came out of World War I; the UN out of World War II.'],
  },
};
