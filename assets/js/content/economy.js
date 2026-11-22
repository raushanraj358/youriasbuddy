// Offline key notes: Indian Economy. Keys must match SYLLABUS.economy in data.js exactly.
// Standard sources: NCERT Class XI–XII Economics, Ramesh Singh “Indian Economy”, Economic Survey, Union Budget, RBI publications.
export const CONTENT = {
  'National income & GDP': {
    overview: 'National income accounting measures the value of goods and services produced in an economy. In India, the National Statistics Office (NSO, under MoSPI) estimates GDP. The base year is 2011–12; a revision to a newer base year is under way, so check the latest.',
    sections: [
      ['Key concepts', [
        '**GDP:** value of final goods and services produced within the country’s borders in a year.',
        '**GNP = GDP + net factor income from abroad (NFIA).**',
        '**NDP = GDP − depreciation.** **NNP at factor cost = National Income.**',
        '**GVA at basic prices + product taxes − product subsidies = GDP.**',
        'Nominal GDP uses current prices; real GDP uses constant (base-year) prices. GDP deflator = nominal GDP ÷ real GDP × 100.',
      ]],
      ['Methods of measurement', [
        '**Production (value added) method**, **income method** (wages + rent + interest + profit) and **expenditure method** (C + I + G + (X − M)).',
        'India mainly uses the production method for sector estimates, cross-checked with expenditure.',
      ]],
      ['Limits of GDP', [
        'Ignores the informal and household (unpaid care) economy, environmental damage, inequality and well-being.',
        'Alternatives: Human Development Index (UNDP), Green GDP, Gross National Happiness (Bhutan), the Multidimensional Poverty Index.',
      ]],
    ],
    prelims: [
      'Per capita income = national income ÷ population.',
      'Purchasing power parity (PPP) compares living standards across countries; India is the third-largest economy in PPP terms.',
    ],
    mains: ['Is GDP an adequate measure of development? Discuss with alternatives.'],
    traps: ['GDP counts production within borders by anyone; GNP counts production by a country’s residents anywhere.'],
  },

  'Inflation & monetary policy': {
    overview: 'Inflation is a sustained rise in the general price level. The RBI follows flexible inflation targeting: CPI inflation of 4% with a band of ±2%, set by the government under the amended RBI Act, 1934. The Monetary Policy Committee (MPC) sets the policy repo rate.',
    sections: [
      ['Types and measures', [
        '**Demand-pull** (too much demand) and **cost-push** (rising input costs). Others: structural inflation, imported inflation.',
        '**Headline inflation** includes all items; **core inflation** excludes food and fuel.',
        '**CPI (Combined):** by the NSO; the target measure. **WPI:** by the Office of the Economic Adviser (DPIIT); no services.',
        'Deflation is a fall in prices; disinflation is a fall in the rate of inflation; stagflation is high inflation with low growth.',
      ]],
      ['Monetary Policy Committee', [
        'Six members: RBI Governor (chair, casting vote), Deputy Governor, an RBI officer, and three external members appointed by the Centre.',
        'Created by the 2016 amendment to the RBI Act. Meets at least four times a year.',
        'If inflation stays outside the band for three consecutive quarters, the RBI must explain to the government.',
      ]],
      ['Tools of monetary policy', [
        '**Quantitative:** repo rate, Standing Deposit Facility (the floor of the corridor since 2022), Marginal Standing Facility (the ceiling), CRR, SLR, open market operations.',
        '**Qualitative:** margin requirements, moral suasion, credit rationing, direct action.',
        'Raising the repo rate tightens money supply and cools inflation.',
      ]],
    ],
    prelims: [
      'CRR is kept with the RBI as cash and earns no interest; SLR is kept by banks themselves as cash, gold or approved securities.',
      'The base year for CPI is 2012 (a revision is under way); for WPI it is 2011–12.',
    ],
    mains: ['Evaluate India’s inflation-targeting framework since 2016.'],
    traps: ['WPI does not include services; CPI does.', 'Reverse repo is no longer the floor rate; the Standing Deposit Facility is.'],
  },

  'Banking, RBI & NPAs': {
    overview: 'The RBI (set up on 1 April 1935, nationalised in 1949) is India’s central bank. It is the banker to the government and to banks, regulates banks and controls the currency. Non-performing assets (NPAs) are loans on which interest or principal is overdue for more than 90 days.',
    sections: [
      ['Banking structure', [
        'Scheduled banks (in the Second Schedule of the RBI Act): public sector, private sector, foreign, regional rural banks, small finance banks, payments banks, co-operative banks.',
        'Bank nationalisation: 14 banks in 1969 and 6 in 1980.',
        '**Payments banks:** can take deposits (up to ₹2 lakh per customer), cannot lend.',
        '**Small finance banks:** serve small businesses and unbanked people; 75% of credit to priority sectors.',
      ]],
      ['NPAs and resolution', [
        'Standard → sub-standard (NPA up to 12 months) → doubtful → loss assets.',
        'Twin balance sheet problem (stressed companies and stressed banks).',
        'Tools: SARFAESI Act (2002), Insolvency and Bankruptcy Code (2016), asset reconstruction companies, NARCL (“bad bank”, 2021), the 4R strategy (recognition, resolution, recapitalisation, reforms).',
        'Prompt Corrective Action (PCA) framework for weak banks.',
      ]],
      ['Basel norms and capital', [
        'Basel III: capital adequacy, liquidity coverage ratio, leverage ratio.',
        'The RBI requires a CRAR of 9% for scheduled commercial banks (higher than Basel’s 8%), plus a capital conservation buffer.',
      ]],
    ],
    prelims: [
      'The RBI was set up on the Hilton Young Commission’s recommendation.',
      'Deposit insurance by DICGC covers up to ₹5 lakh per depositor per bank.',
    ],
    mains: ['Discuss the causes of the NPA crisis and evaluate the IBC’s role in resolution.'],
    traps: ['Payments banks cannot lend or issue credit cards.'],
  },

  'Fiscal policy, budget & FRBM': {
    overview: 'Fiscal policy is the government’s use of taxation, spending and borrowing to influence the economy. The Union Budget (the “Annual Financial Statement”, Art. 112) is presented every year. The FRBM Act, 2003 sets deficit targets.',
    sections: [
      ['Budget basics', [
        'Revenue budget (revenue receipts and revenue expenditure) and capital budget (capital receipts and expenditure).',
        'Revenue receipts: taxes and non-tax (dividends, fees). Capital receipts: borrowings, loan recoveries, disinvestment.',
        'Capital expenditure creates assets or reduces liabilities.',
      ]],
      ['Deficits', [
        '**Revenue deficit** = revenue expenditure − revenue receipts.',
        '**Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts). It equals the government’s borrowing.',
        '**Primary deficit** = fiscal deficit − interest payments.',
        '**Effective revenue deficit** = revenue deficit − grants for the creation of capital assets.',
      ]],
      ['FRBM and fiscal rules', [
        'FRBM Act, 2003; N.K. Singh Committee (2017) recommended debt as the main anchor (60% of GDP general government debt: 40% Centre, 20% States).',
        'The Centre plans to shift from fiscal deficit targets to a declining debt-to-GDP path. Check the latest Budget for figures.',
        'Gender budgeting (since 2005–06) and outcome budgets.',
      ]],
    ],
    prelims: [
      'The Consolidated Fund (Art. 266) needs Parliament’s approval for withdrawals; the Contingency Fund (Art. 267) is at the President’s disposal.',
      'Charged expenditure (e.g. salaries of SC judges, President) is not voted on.',
    ],
    mains: ['Discuss the trade-off between fiscal consolidation and public investment for growth.'],
    traps: ['Fiscal deficit includes borrowing for both revenue and capital spending; revenue deficit only shows the revenue gap.'],
  },

  'Taxation & GST': {
    overview: 'Taxes are direct (income tax, corporate tax: the burden cannot be shifted) or indirect (GST, customs: passed on to consumers). GST, launched on 1 July 2017 by the 101st Amendment, unified many indirect taxes.',
    sections: [
      ['Direct taxes', [
        'Personal income tax (new regime is now the default), corporate tax (cut in 2019), securities transaction tax.',
        'Progressive taxation: rate increases with income.',
        'Income Tax Act, 2025 replaces the 1961 Act from April 2026; check its key changes.',
      ]],
      ['GST structure', [
        'Destination-based consumption tax. CGST, SGST/UTGST on intra-State supply; IGST on inter-State supply and imports.',
        'GST Council (Art. 279A): Union Finance Minister (chair) and State Finance Ministers. Decisions need a three-fourths majority of weighted votes (Centre one-third, States two-thirds).',
        'Outside GST: alcohol for human consumption; petroleum products (crude, diesel, petrol, ATF, natural gas) until the Council decides.',
        'Rate rationalisation in 2025 (“GST 2.0”) moved to mainly two slabs (5% and 18%) plus a high rate for sin and luxury goods. Check the latest rates.',
        'Compensation to States for five years (to June 2022) through the compensation cess.',
      ]],
      ['Concepts', [
        'Input tax credit avoids the cascading (“tax on tax”) effect.',
        'Tax buoyancy: how tax revenue responds to GDP growth. Tax-to-GDP ratio: India’s is around 17–18% (Centre + States).',
        'Laffer curve: beyond a point, higher rates reduce revenue.',
      ]],
    ],
    prelims: [
      'The GST Council is a constitutional body (Art. 279A).',
      'Mohit Saraf v Union (2022): GST Council recommendations are persuasive, not binding.',
    ],
    mains: ['Evaluate GST’s performance on cooperative federalism and ease of doing business.'],
    traps: ['Alcohol for human consumption is permanently outside GST; petroleum is outside until the Council recommends.'],
  },

  'External sector, BoP & currency': {
    overview: 'The balance of payments (BoP) records all transactions between India and the rest of the world: the current account and the capital account. The rupee’s exchange rate is market-determined with RBI intervention to smooth volatility (managed float).',
    sections: [
      ['Balance of payments', [
        '**Current account:** trade in goods (the trade balance) and services (India runs a large services surplus, mainly IT), income, and transfers (remittances; India is the largest recipient).',
        '**Capital account:** FDI, FPI, external commercial borrowings, NRI deposits.',
        'BoP always balances overall; changes in forex reserves close the gap.',
        'Current account deficit (CAD) above 3% of GDP is generally seen as a concern.',
      ]],
      ['Exchange rate', [
        'Depreciation: the rupee falls in a market regime. Devaluation: the government deliberately lowers its value (1966, 1991).',
        'Real Effective Exchange Rate (REER) adjusts for inflation.',
        'The rupee is fully convertible on the current account (since 1994) but partly on the capital account.',
      ]],
      ['Trade and foreign investment', [
        'FDI routes: automatic and government approval. FDI is long-term; FPI is volatile (“hot money”).',
        'Liberalised Remittance Scheme (LRS): residents can send up to US$250,000 a year.',
        '1991 BoP crisis: India pledged gold; led to the LPG (liberalisation, privatisation, globalisation) reforms.',
      ]],
    ],
    prelims: ['Special Drawing Rights (SDR) is an IMF reserve asset based on five currencies (USD, EUR, CNY, JPY, GBP).'],
    mains: ['Discuss measures to internationalise the rupee and the risks involved.'],
    traps: ['Depreciation is market-driven; devaluation is a deliberate policy decision under a fixed regime.'],
  },

  'Agriculture, MSP & food security': {
    overview: 'Agriculture provides livelihood to nearly half the workforce but a much smaller share of GVA. Minimum Support Prices (MSP) and public procurement support farmers; the National Food Security Act, 2013 provides subsidised grain.',
    sections: [
      ['MSP', [
        'Announced for 22 mandated crops (plus a fair and remunerative price for sugarcane) on the recommendation of the **Commission for Agricultural Costs and Prices (CACP)**, approved by the Cabinet Committee on Economic Affairs.',
        'Cost concepts: A2 (paid-out costs), A2+FL (plus family labour), C2 (comprehensive, including land rent and interest).',
        'Since 2018–19, MSP is at least 1.5 times the A2+FL cost.',
        'Procurement is mainly of rice and wheat, in a few States.',
      ]],
      ['Food security', [
        '**NFSA, 2013:** covers up to 75% of rural and 50% of urban population; 5 kg of grain per person per month; Antyodaya households get 35 kg.',
        'PM Garib Kalyan Anna Yojana: free grain under NFSA, extended for five years from January 2024.',
        'One Nation One Ration Card for portability.',
        'Food Corporation of India (1965) handles procurement and storage.',
      ]],
      ['Reforms and issues', [
        'Agricultural marketing: APMC mandis, e-NAM (2016). The three farm laws of 2020 were repealed in 2021.',
        'PM-KISAN: ₹6,000 a year to farmer families. PM Fasal Bima Yojana: crop insurance.',
        'Issues: fragmented holdings, groundwater depletion, low productivity, post-harvest losses.',
      ]],
    ],
    prelims: ['Buffer stock norms are set by the Centre for 1 April, 1 July, 1 October and 1 January.'],
    mains: ['Should MSP be given legal backing? Examine the arguments.'],
    traps: ['MSP is not statutory (it is administrative), but the sugarcane FRP is backed by the Essential Commodities Act.'],
  },

  'Industrial policy & MSMEs': {
    overview: 'India’s industrial policy moved from State-led planning and licensing (1948, 1956 resolutions) to liberalisation in 1991. Today the focus is on manufacturing (Make in India, PLI schemes) and on MSMEs, which employ a large share of workers.',
    sections: [
      ['Evolution', [
        '**Industrial Policy Resolution 1956:** “commanding heights” for the public sector; Schedule A, B, C industries.',
        '**New Industrial Policy 1991:** ended licensing for most industries, opened sectors to private firms and FDI, reduced public sector reservation.',
        'MRTP Act replaced by the Competition Act, 2002 (Competition Commission of India).',
      ]],
      ['MSMEs', [
        'Classification (since 2020, revised in 2025) uses both investment in plant and machinery and turnover. Check the latest thresholds.',
        'Udyam registration portal. MSMEs contribute about 30% of GDP and about 45% of exports.',
        'Problems: credit access, delayed payments, informality. Support: Credit Guarantee Fund (CGTMSE), TReDS platform, the 45-day payment rule.',
      ]],
      ['Recent initiatives', [
        'Production Linked Incentive (PLI) schemes for 14 sectors; semiconductor mission; National Industrial Corridor programme.',
        'Index of Industrial Production (IIP, by NSO; base 2011–12): eight core industries make up about 40% of it.',
      ]],
    ],
    prelims: ['The eight core industries: coal, crude oil, natural gas, refinery products, fertilisers, steel, cement, electricity (largest weight: refinery products).'],
    mains: ['Why has India’s manufacturing share of GDP stayed stagnant? Suggest remedies.'],
    traps: ['Refinery products, not electricity, have the highest weight among the eight core industries.'],
  },

  'Infrastructure & investment models': {
    overview: 'Infrastructure (roads, railways, ports, airports, power, digital) drives growth. Governments use public investment and public–private partnership (PPP) models to finance it.',
    sections: [
      ['PPP models', [
        '**BOT (Build–Operate–Transfer):** the private player builds, runs for a period, then hands over.',
        '**EPC:** the government pays a contractor to build; the government owns and runs it.',
        '**Hybrid Annuity Model (HAM):** the government pays 40% during construction and the rest as annuities; used in highways.',
        '**TOT (Toll–Operate–Transfer)** and **InvITs** (infrastructure investment trusts) for asset monetisation.',
        'Kelkar Committee (2015) on reviving PPPs.',
      ]],
      ['Major programmes', [
        'PM Gati Shakti National Master Plan (2021): multi-modal connectivity.',
        'Bharatmala (roads), Sagarmala (ports), UDAN (regional air), dedicated freight corridors.',
        'National Infrastructure Pipeline and the National Monetisation Pipeline.',
        'NaBFID (2021): development finance institution for infrastructure.',
      ]],
    ],
    prelims: ['InvITs are regulated by SEBI.'],
    mains: ['Discuss the reasons for the slowdown of PPPs in India and the remedies.'],
    traps: ['Under HAM, the government bears 40% of construction cost, so private risk is lower than in BOT.'],
  },

  'Capital markets & SEBI': {
    overview: 'Capital markets raise long-term funds through shares and bonds. The primary market issues new securities; the secondary market trades existing ones. SEBI (statutory since 1992) regulates them.',
    sections: [
      ['Market structure', [
        'Stock exchanges: BSE (Sensex, 30 stocks), NSE (Nifty 50).',
        'Primary market: IPO (first public issue), FPO, rights issue, private placement.',
        'Money market (short term, up to one year): treasury bills, commercial paper, certificates of deposit. Regulated by the RBI.',
      ]],
      ['Instruments', [
        'Equity shares, debentures and bonds, mutual funds, ETFs, derivatives (futures and options).',
        'REITs and InvITs. Green bonds and sovereign gold bonds.',
        'Participatory notes (P-notes): issued by foreign portfolio investors for investors not registered in India.',
      ]],
      ['SEBI', [
        'Set up in 1988 as non-statutory, given statutory powers by the SEBI Act, 1992.',
        'Protects investors, prevents insider trading, regulates intermediaries.',
        'Appeals against SEBI orders go to the Securities Appellate Tribunal (SAT).',
      ]],
    ],
    prelims: ['Commodity derivatives regulation moved to SEBI after the Forward Markets Commission merged with it in 2015.'],
    mains: ['Discuss the rise of retail investors in Indian markets and the regulatory challenges.'],
    traps: ['The money market is regulated by the RBI, the capital market by SEBI.'],
  },

  'Poverty, unemployment & inclusive growth': {
    overview: 'Poverty in India has been measured by consumption-based poverty lines and, more recently, multidimensional indices. Unemployment includes open, disguised, seasonal and structural forms. Inclusive growth means growth that reaches all sections.',
    sections: [
      ['Measuring poverty', [
        'Committees: Lakdawala (1993), Tendulkar (2009; poverty in 2011–12 at 21.9%), Rangarajan (2014).',
        '**NITI Aayog’s Multidimensional Poverty Index** (based on NFHS; health, education, living standards; 12 indicators).',
        'The World Bank’s international poverty line was revised to US$3 a day (2021 PPP) in 2025.',
      ]],
      ['Unemployment', [
        'Measured by the **Periodic Labour Force Survey (PLFS)** of the NSO (now monthly and quarterly estimates).',
        'Concepts: labour force participation rate, worker population ratio, unemployment rate. Usual status vs current weekly status.',
        '**Disguised unemployment:** more people than needed (common in farming). **Structural:** skills do not match jobs. **Frictional:** between jobs.',
      ]],
      ['Schemes', [
        'MGNREGA (2005): 100 days of wage employment per rural household; demand-driven.',
        'DAY-NRLM (self-help groups), PMKVY (skills), PM Mudra Yojana, Stand-Up India.',
      ]],
    ],
    prelims: ['MGNREGA is a legal right to work; wages are linked to CPI-AL.'],
    mains: ['Jobless growth: discuss its causes in India and suggest a strategy for employment-rich growth.'],
    traps: ['Disguised unemployment means zero marginal productivity of extra workers, not idleness.'],
  },
};
