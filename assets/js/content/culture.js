// Offline key notes: Art & Culture. Keys must match SYLLABUS.culture in data.js exactly.
// Standard sources: NCERT “An Introduction to Indian Art” (Class XI), Nitin Singhania “Indian Art and Culture”, CCRT material, Ministry of Culture.
export const CONTENT = {
  'Temple architecture': {
    overview: 'Hindu temple architecture developed from the Gupta period. The Shilpa Shastras describe three main styles: **Nagara** (north), **Dravida** (south) and **Vesara** (a mix, in the Deccan).',
    sections: [
      ['Parts of a temple', [
        '**Garbhagriha:** sanctum with the main deity. **Mandapa:** pillared hall for devotees.',
        '**Shikhara** (north, curvilinear tower) / **Vimana** (south, pyramidal tower). **Amalaka:** stone disc on top of a Nagara shikhara; **Kalasha:** the pot-shaped finial.',
        '**Antarala:** vestibule between sanctum and mandapa. **Pradakshina path:** circumambulation path.',
      ]],
      ['Nagara style', [
        'No elaborate boundary walls; temples on a raised platform (jagati).',
        'Sub-schools: **Odisha** (deul; Lingaraja at Bhubaneswar, Jagannath at Puri, Sun Temple at Konark, a UNESCO site), **Khajuraho** (Chandelas; Kandariya Mahadeva; UNESCO site), **Solanki** (Gujarat; Modhera Sun Temple with stepped tank).',
        'Early example: Dashavatara temple, Deogarh (Gupta period).',
      ]],
      ['Dravida style', [
        'High boundary walls with **gopurams** (gateways; became larger than the vimana in later periods); water tank inside.',
        'Pallavas: Mamallapuram shore temple and rathas (rock-cut), Kailasanatha temple at Kanchipuram.',
        'Cholas: Brihadeshwara temple, Thanjavur (Rajaraja I; part of the UNESCO “Great Living Chola Temples”), Gangaikonda Cholapuram.',
        'Vijayanagara: Hampi (Vitthala temple, stone chariot); Nayakas: Madurai Meenakshi temple (huge gopurams).',
        'Dwarapalas (guardian figures) at entrances in place of river goddesses.',
      ]],
      ['Vesara style', [
        'Later Chalukyas, Hoysalas. Hoysala temples at Belur, Halebidu and Somanathapura: star-shaped (stellate) plan, soapstone, intricate carving. UNESCO “Sacred Ensembles of the Hoysalas” (2023).',
        'Badami Chalukyas experimented with both styles at Aihole, Badami and Pattadakal (UNESCO).',
      ]],
    ],
    prelims: [
      'Kailasa temple at Ellora (Cave 16) was carved from a single rock by the Rashtrakuta king Krishna I.',
      'Aihole is called the “cradle of Indian temple architecture”.',
    ],
    mains: ['Compare the Nagara and Dravida styles with examples.'],
    traps: ['In Dravida temples the gopuram (gate) often dwarfs the vimana, unlike the Nagara shikhara which is the tallest element.'],
  },

  'Buddhist & Jain architecture': {
    overview: 'Buddhist architecture includes stupas, chaityas (prayer halls) and viharas (monasteries). Jain architecture includes rock-cut caves and marble temples. Ashoka gave a strong push to stupa-building.',
    sections: [
      ['Stupas', [
        'Mound-like structure over relics. Parts: anda (dome), harmika (railed platform on top), chhatra (umbrella), vedika (railing), toranas (gateways).',
        '**Sanchi (MP):** begun by Ashoka; toranas with Jataka carvings added in the Satavahana period; UNESCO site.',
        'Bharhut (MP), Amaravati (Andhra), Sarnath (Dhamek stupa), Kesariya (Bihar).',
      ]],
      ['Caves', [
        '**Barabar and Nagarjuni caves (Bihar):** earliest rock-cut caves, given by Ashoka and Dasharatha to the Ajivikas; Lomas Rishi cave with an ornate entrance.',
        '**Karla and Bhaja (Maharashtra):** early chaityas. **Ajanta** (Buddhist only; paintings; UNESCO) and **Ellora** (Buddhist, Hindu and Jain; UNESCO).',
        '**Udayagiri and Khandagiri (Odisha):** Jain caves; Hathigumpha inscription of Kharavela.',
      ]],
      ['Jain temples', [
        'Dilwara temples, Mount Abu (white marble; Vastupala–Tejapala).',
        'Ranakpur (Rajasthan; 1,444 carved pillars), Palitana (Gujarat; Shatrunjaya hill; hundreds of temples).',
        'Shravanabelagola (Karnataka): Gommateshwara (Bahubali) statue; Mahamastakabhisheka every 12 years.',
      ]],
    ],
    prelims: ['Ajanta caves contain only Buddhist caves; Ellora has Buddhist, Hindu and Jain caves.'],
    mains: ['Trace how Buddhist architecture evolved from Ashoka to the Gupta period.'],
    traps: ['The Barabar caves were for the Ajivikas, not Buddhists.'],
  },

  'Indo-Islamic architecture': {
    overview: 'Indo-Islamic architecture blended Persian, Central Asian and Indian styles from the 12th century. It brought the true arch, dome, minarets, calligraphy and arabesque, using lime mortar.',
    sections: [
      ['Delhi Sultanate', [
        'Quwwat-ul-Islam mosque and Qutub Minar (Aibak, completed by Iltutmish), Alai Darwaza (Alauddin Khalji; first true arch and dome).',
        'Tughlaq style: sloping (battered) walls; Tughlaqabad, Firoz Shah Kotla.',
        'Lodi style: double domes; octagonal tombs (Lodi Gardens).',
      ]],
      ['Provincial styles', [
        'Bengal: Adina Mosque (Pandua); “Bangla roof”. Jaunpur: Atala Masjid.',
        'Malwa (Mandu): Jahaz Mahal, Hindola Mahal.',
        'Deccan: Gol Gumbaz, Bijapur (one of the largest domes; whispering gallery); Charminar, Hyderabad (Qutb Shahi).',
        'Gujarat: Sidi Saiyyed mosque (jali work), Ahmedabad (UNESCO World Heritage City).',
      ]],
      ['Mughal architecture', [
        'Humayun’s Tomb (first garden tomb, charbagh, red sandstone and marble; UNESCO).',
        'Akbar: Fatehpur Sikri (Buland Darwaza, Panch Mahal; UNESCO), Agra Fort.',
        'Shah Jahan: Taj Mahal (white marble, pietra dura), Red Fort (Delhi), Jama Masjid.',
        'Aurangzeb: Bibi ka Maqbara (Aurangabad), Badshahi Mosque (Lahore).',
      ]],
    ],
    prelims: ['Pietra dura is inlay of semi-precious stones in marble; it is prominent in the Taj Mahal and Itimad-ud-Daulah’s tomb.'],
    mains: ['How did Indo-Islamic architecture synthesise Indian and Persian traditions?'],
    traps: ['Gol Gumbaz is in Bijapur (Adil Shahi), not Golconda.'],
  },

  'Indian paintings': {
    overview: 'Indian painting ranges from prehistoric rock art (Bhimbetka) through wall murals (Ajanta) and miniatures (Mughal, Rajput, Pahari, Deccani) to folk traditions. Many folk forms have GI tags.',
    sections: [
      ['Murals', [
        '**Ajanta (Maharashtra):** 2nd century BCE to 6th century CE; Jataka tales; Padmapani and Vajrapani Bodhisattvas.',
        'Bagh caves (MP), Sittanavasal (TN, Jain), Lepakshi (Andhra, Vijayanagara), Kerala murals.',
      ]],
      ['Miniatures', [
        '**Pala school** (eastern India): palm-leaf Buddhist manuscripts. **Western Indian / Jain** style: Kalpasutra.',
        '**Mughal:** Persian influence; peaked under Jahangir (Ustad Mansur: nature studies; Abul Hasan).',
        '**Rajasthani:** Mewar, Bundi, Kota, Kishangarh (Bani Thani, “Indian Mona Lisa”), Marwar.',
        '**Pahari:** Basohli (bold colours), Guler, Kangra (lyrical; Gita Govinda themes).',
        '**Deccani:** Bijapur, Golconda, Ahmadnagar.',
      ]],
      ['Folk and tribal paintings (State)', [
        'Madhubani/Mithila (Bihar), Warli (Maharashtra; geometric figures), Pattachitra (Odisha and Bengal), Kalamkari (Andhra; pen-drawn), Gond (MP), Pithora (Gujarat, MP), Phad (Rajasthan; scroll of folk deities), Kalighat (Bengal), Cheriyal scrolls (Telangana), Saura (Odisha), Thangka (Sikkim, Ladakh).',
      ]],
    ],
    prelims: ['Bani Thani is from the Kishangarh school.'],
    mains: ['Discuss how folk art can be preserved while giving artists sustainable livelihoods.'],
    traps: ['Warli is from Maharashtra; Pithora is from Gujarat/MP; do not mix them up.'],
  },

  'Classical dances': {
    overview: 'The Sangeet Natak Akademi recognises eight classical dances (the Ministry of Culture also includes Chhau). Their roots lie in Bharata’s Natya Shastra, which describes rasa and bhava.',
    sections: [
      ['The eight classical dances', [
        '**Bharatanatyam (Tamil Nadu):** “fire dance”; from the devadasi Sadir tradition; revived by Rukmini Devi Arundale.',
        '**Kathakali (Kerala):** dance-drama; elaborate make-up; Ramayana/Mahabharata stories; male performers traditionally.',
        '**Mohiniyattam (Kerala):** graceful solo by women; “dance of the enchantress”.',
        '**Kuchipudi (Andhra Pradesh):** dancing on the rim of a brass plate (tarangam).',
        '**Odissi (Odisha):** tribhanga posture; Gita Govinda; temple origins (maharis).',
        '**Kathak (north India):** storytelling; chakkars (spins); Lucknow, Jaipur and Benares gharanas.',
        '**Manipuri (Manipur):** Raas Leela; soft movements; no ankle bells.',
        '**Sattriya (Assam):** introduced by Sankaradeva in the sattras; recognised in 2000.',
      ]],
      ['Key terms', [
        'Nritta (pure dance), nritya (expressive), natya (dramatic).',
        'Tandava (vigorous) and lasya (graceful). Mudras (hand gestures).',
        'Nine rasas, including shringara (love), veera (heroism), karuna (compassion), shanta (peace, added later).',
      ]],
    ],
    prelims: ['Sattriya was the last dance to be recognised as classical (2000).'],
    mains: ['How have classical dances preserved and transmitted India’s religious and literary heritage?'],
    traps: ['Mohiniyattam and Kathakali are both from Kerala.', 'Manipuri dancers do not wear ghungroo (ankle bells).'],
  },

  'Indian music traditions': {
    overview: 'Indian classical music has two traditions: **Hindustani** (north; influenced by Persian music) and **Carnatic** (south; more devotional, composition-based). Both are based on raga (melody) and tala (rhythm).',
    sections: [
      ['Hindustani music', [
        'Forms: **Dhrupad** (oldest; Dagar family), **Khayal**, **Thumri**, **Tappa**, **Tarana**, Dadra, Ghazal.',
        'Gharanas: Gwalior (oldest khayal gharana), Agra, Kirana, Jaipur–Atrauli, Patiala.',
        'Instruments: sitar, sarod, tabla, shehnai (Bismillah Khan), santoor, sarangi.',
      ]],
      ['Carnatic music', [
        'Trinity: **Tyagaraja, Muthuswami Dikshitar, Syama Sastri** (18th–19th centuries).',
        'Purandara Dasa is called the “father of Carnatic music”.',
        'Forms: varnam, kriti, kirtanam, tillana, javali. Melakarta system: 72 parent ragas.',
        'Instruments: veena, mridangam, ghatam, nadaswaram, violin.',
      ]],
      ['Folk and devotional', [
        'Baul (Bengal), Lavani (Maharashtra), Bihu songs (Assam), Pandavani (Chhattisgarh; Teejan Bai), Qawwali (Sufi), Sufiana Kalam (Kashmir).',
      ]],
    ],
    prelims: ['Sama Veda is considered the root of Indian music.'],
    mains: ['Compare Hindustani and Carnatic music in origin, structure and practice.'],
    traps: ['Purandara Dasa is the father of Carnatic music; he is not one of the Trinity.'],
  },

  'Bhakti literature & languages': {
    overview: 'Indian literature spans Sanskrit, Prakrit, Pali, Tamil and many modern languages. The Eighth Schedule lists 22 languages; six have classical status since 2004, increasing to eleven in 2024.',
    sections: [
      ['Classical languages', [
        'Tamil (2004), Sanskrit (2005), Kannada (2008), Telugu (2008), Malayalam (2013), Odia (2014).',
        'Added in October 2024: Marathi, Pali, Prakrit, Assamese, Bengali.',
        'Criteria include high antiquity (1,500–2,000 years of recorded history), a body of ancient literature valued as heritage, and distinctness from modern forms.',
      ]],
      ['Eighth Schedule', [
        'Originally 14 languages. Sindhi added in 1967 (21st Amendment); Konkani, Manipuri and Nepali in 1992 (71st); Bodo, Dogri, Maithili and Santhali in 2003 (92nd).',
      ]],
      ['Literary landmarks', [
        '**Sangam literature (Tamil):** Tolkappiyam (grammar), Ettuthokai, Pattuppattu; Tirukkural by Thiruvalluvar; epics Silappadikaram and Manimekalai.',
        '**Bhakti poetry:** Tulsidas (Ramcharitmanas in Awadhi), Surdas (Sursagar in Braj), Kabir (Bijak), Mirabai, Jnaneshwar (Marathi), Tukaram (abhangas), Kamban (Tamil Ramayana).',
        'Amir Khusrau (Hindavi). Kalidasa, Bhasa, Banabhatta (Sanskrit).',
      ]],
    ],
    prelims: ['Santhali uses the Ol Chiki script, devised by Pandit Raghunath Murmu.'],
    mains: ['How did Bhakti saints contribute to the growth of regional languages?'],
    traps: ['Classical languages are now eleven (after October 2024), not six.'],
  },

  'UNESCO heritage in India': {
    overview: 'UNESCO’s World Heritage Convention (1972) lists sites of “outstanding universal value” as cultural, natural or mixed. India also has elements on the list of Intangible Cultural Heritage (2003 Convention). Counts change every year; check the latest.',
    sections: [
      ['World Heritage Sites (selected)', [
        '**Cultural:** Taj Mahal, Agra Fort, Ajanta and Ellora (first Indian sites, 1983), Sun Temple Konark, Hampi, Khajuraho, Qutub Minar, Rani-ki-Vav, Dholavira, Ramappa temple (Telangana), Santiniketan, Hoysala temples, Moidams of Assam (2024), Maratha Military Landscapes (2025).',
        '**Natural:** Kaziranga, Keoladeo, Manas, Sundarbans, Nanda Devi and Valley of Flowers, Western Ghats, Great Himalayan National Park.',
        '**Mixed:** Khangchendzonga National Park (Sikkim), India’s only mixed site.',
        '**World Heritage Cities:** Jaipur, Ahmedabad. Mountain Railways of India (Darjeeling, Nilgiri, Kalka–Shimla).',
      ]],
      ['Intangible Cultural Heritage (selected)', [
        'Koodiyattam, Vedic chanting, Ramlila, Ramman (Garhwal), Kalbelia, Chhau, Mudiyettu, Buddhist chanting of Ladakh, Sankirtana (Manipur), Yoga, Kumbh Mela, Durga Puja in Kolkata, Garba of Gujarat (2023), Deepavali (2025).',
      ]],
    ],
    prelims: ['India hosted the 46th World Heritage Committee session in New Delhi (2024).'],
    mains: ['Discuss the benefits and responsibilities that come with UNESCO World Heritage status.'],
    traps: ['Khangchendzonga is India’s only mixed (natural + cultural) World Heritage Site.'],
  },

  'Festivals, fairs & GI tags': {
    overview: 'Festivals and fairs reflect regional culture, agriculture and religion. Geographical Indication (GI) tags protect products linked to a place, under the Geographical Indications of Goods (Registration and Protection) Act, 1999.',
    sections: [
      ['Harvest and regional festivals', [
        'Makar Sankranti / Pongal (TN) / Lohri (Punjab) / Magh Bihu (Assam): mid-January harvest festivals.',
        'Onam (Kerala), Baisakhi (Punjab), Nuakhai (Odisha), Hornbill festival (Nagaland), Losar (Tibetan new year; Ladakh, Sikkim), Hemis festival (Ladakh).',
        'Fairs: Kumbh Mela (Prayagraj, Haridwar, Ujjain, Nashik), Pushkar camel fair (Rajasthan), Sonepur cattle fair (Bihar).',
      ]],
      ['Geographical Indications', [
        'First Indian GI tag: Darjeeling tea (2004–05). Registry at Chennai (under DPIIT).',
        'A GI tag is valid for 10 years and can be renewed.',
        'Covered under the WTO TRIPS Agreement.',
        'Examples: Banarasi saree, Kanchipuram silk, Madhubani painting, Mysore silk, Alphonso mango, Basmati rice, Nagpur orange, Kashmir saffron.',
        'Uttar Pradesh has the most GI tags among States (check the latest).',
      ]],
    ],
    prelims: ['A GI is collective (for producers of a region), unlike a trademark, which belongs to one owner.'],
    mains: ['How can GI tags benefit artisans and farmers? Discuss the gaps in implementation.'],
    traps: ['GI registration is valid for 10 years, not permanently, but it can be renewed indefinitely.'],
  },
};
