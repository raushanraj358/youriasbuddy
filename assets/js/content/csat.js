// Offline key notes: CSAT (Paper II). Keys must match SYLLABUS.csat in data.js exactly.
// CSAT is qualifying (33%, i.e. 66.67 of 200 marks). 80 questions, 2.5 marks each, one-third negative marking.
export const CONTENT = {
  'Reading comprehension': {
    overview: 'Reading comprehension (RC) usually carries the largest share of CSAT questions. Passages come from economics, environment, ethics, governance and science. Accuracy matters more than speed because of negative marking.',
    sections: [
      ['Question types', [
        '**Main idea / central theme:** what the whole passage is about.',
        '**Inference:** what follows logically, but is not stated.',
        '**Assumption:** what the author takes for granted (unstated, must be true for the argument).',
        '**Corollary / implication**, **best title**, **author’s tone**, **factual detail**.',
      ]],
      ['Method', [
        'Read the question first for short passages; read the passage first for long ones.',
        'Stay within the passage. Do not use outside knowledge or personal opinion.',
        'Eliminate options that are too broad, too narrow, extreme (“always”, “never”, “only”) or outside the scope.',
        'For assumptions, use the negation test: if negating the option breaks the argument, it is an assumption.',
      ]],
      ['Practice plan', [
        'Solve previous years’ CSAT papers (2011 onwards) and analyse every wrong answer.',
        'Read editorials daily to improve speed and vocabulary.',
      ]],
    ],
    prelims: ['Each wrong answer costs one-third of the question’s marks (0.83 of 2.5).'],
    traps: ['An option can be true in the real world but still wrong because the passage does not support it.'],
  },

  'Logical reasoning': {
    overview: 'Logical reasoning covers arrangements, blood relations, direction sense, coding-decoding, series, clocks and calendars, and puzzles. These are scoring if you practise systematically.',
    sections: [
      ['Topics and approach', [
        '**Seating arrangements:** draw a diagram; place definite information first.',
        '**Blood relations:** use symbols (+ male, − female) and draw a family tree.',
        '**Direction sense:** draw on paper; right turn from north is east.',
        '**Coding–decoding:** look for letter shifts, reversals, positions (A = 1 … Z = 26).',
        '**Number and letter series:** check differences, squares, cubes, primes, alternating patterns.',
      ]],
      ['Clocks and calendars', [
        'Angle between hands = |30H − 5.5M| degrees.',
        'Hands overlap 11 times in 12 hours (22 times in a day).',
        'Odd days: an ordinary year has 1, a leap year 2. A century year is a leap year only if divisible by 400.',
      ]],
    ],
    prelims: ['Previous years’ papers show puzzles of moderate difficulty; practise 10 a day.'],
    traps: ['1900 was not a leap year, but 2000 was.'],
  },

  'Analytical ability': {
    overview: 'Analytical ability tests decision-making with given information: data sufficiency, statements and arguments, cause and effect, and course of action.',
    sections: [
      ['Formats', [
        '**Data sufficiency:** decide whether the given statements are enough to answer; do not actually solve fully.',
        '**Statement and arguments:** strong arguments are relevant, logical and important; weak ones are trivial or emotional.',
        '**Statement and course of action:** choose practical, legal steps that solve or reduce the problem.',
        '**Cause and effect**, **statement and assumption**.',
      ]],
      ['Method', [
        'Read precisely; watch words like “some”, “all”, “only”, “at least”.',
        'Avoid bringing in your own opinions.',
      ]],
    ],
    prelims: ['These questions overlap with reading comprehension logic; practise both together.'],
    traps: ['In data sufficiency, “both statements together” is right only if neither alone is enough.'],
  },

  'Number system': {
    overview: 'Number system is a basic building block for CSAT maths: divisibility, factors, HCF and LCM, remainders and unit digits.',
    sections: [
      ['Key rules', [
        '**Divisibility:** 3 or 9 (sum of digits), 4 (last two digits), 8 (last three digits), 11 (difference between sums of alternate digits is 0 or a multiple of 11).',
        '**HCF × LCM = product of two numbers.**',
        '**Number of factors** of N = p^a × q^b … is (a + 1)(b + 1)….',
        '**Unit digit cycles:** 2, 3, 7, 8 repeat every 4 powers; 4 and 9 every 2; 0, 1, 5, 6 stay the same.',
        'Sum of first n natural numbers = n(n + 1)/2. Sum of squares = n(n + 1)(2n + 1)/6.',
      ]],
      ['Types of numbers', [
        'Prime (exactly two factors; 2 is the only even prime; 1 is not prime), composite, co-prime (HCF = 1).',
        'There are 25 primes below 100.',
      ]],
    ],
    prelims: ['Questions on unit digits and remainders are quick wins if you know the cycles.'],
    traps: ['1 is neither prime nor composite.'],
  },

  'Percentages, ratio & proportion': {
    overview: 'Percentages and ratios underlie profit and loss, interest, mixtures and data interpretation. Fraction–percentage equivalents save time.',
    sections: [
      ['Percentages', [
        'Fraction equivalents: 1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%.',
        'Successive change of a% and b%: net change = a + b + ab/100.',
        'If A is r% more than B, B is r/(100 + r) × 100% less than A.',
      ]],
      ['Profit, loss and interest', [
        'Profit % = profit ÷ cost price × 100. Discount is on the marked price.',
        'Simple interest = P × R × T ÷ 100. Compound amount = P(1 + R/100)^T.',
      ]],
      ['Ratio and mixtures', [
        'Ratios can be combined by making the common term equal.',
        '**Alligation:** (dearer − mean) : (mean − cheaper) = quantity of cheaper : quantity of dearer.',
      ]],
    ],
    prelims: ['Approximation and fraction equivalents save time in calculations.'],
    traps: ['A 20% increase followed by a 20% decrease gives a net 4% decrease, not zero.'],
  },

  'Time, speed & distance': {
    overview: 'Time, speed and distance questions include relative speed, trains, boats and streams and races. All depend on distance = speed × time.',
    sections: [
      ['Formulas', [
        'Distance = speed × time. To convert km/h to m/s multiply by 5/18.',
        '**Average speed** for equal distances at speeds x and y = 2xy/(x + y).',
        '**Relative speed:** add speeds for opposite directions, subtract for the same direction.',
        '**Trains:** crossing a pole: distance = train’s length; crossing a platform or another train: add the lengths.',
        '**Boats:** downstream = boat + stream; upstream = boat − stream. Boat speed = (down + up)/2; stream = (down − up)/2.',
      ]],
    ],
    prelims: ['Draw a quick diagram for meeting and overtaking problems.'],
    traps: ['Average speed is not the simple average of speeds when distances are equal.'],
  },

  'Time & work': {
    overview: 'Time and work problems (including pipes and cisterns) use the idea of work done per unit time.',
    sections: [
      ['Method', [
        'If A does a job in a days, A does 1/a of it per day.',
        'A and B together: 1/a + 1/b per day; time = ab/(a + b).',
        '**LCM method:** take total work as the LCM of the days; find each person’s daily units. This avoids fractions.',
        '**Pipes and cisterns:** inlet pipes add, outlet pipes (leaks) subtract.',
        'Man-days: M1 × D1 × H1 ÷ W1 = M2 × D2 × H2 ÷ W2.',
      ]],
    ],
    prelims: ['The LCM method is the fastest for most CSAT problems.'],
    traps: ['When a worker leaves midway, calculate work done before and after separately.'],
  },

  'Data interpretation': {
    overview: 'Data interpretation (DI) gives data in tables, bar graphs, line graphs or pie charts and asks for percentages, ratios, averages and growth.',
    sections: [
      ['Approach', [
        'Read titles, units and footnotes first.',
        'Approximate where options are far apart.',
        'Percentage change = (new − old) ÷ old × 100.',
        'Pie chart: share in degrees ÷ 360 × 100 = percentage.',
        'Compare growth rates, not just absolute changes.',
      ]],
    ],
    prelims: ['DI questions in CSAT are usually small sets; attempt them after easy RC.'],
    traps: ['Check whether the data is in absolute numbers or percentages before comparing.'],
  },

  'Permutations & probability': {
    overview: 'Permutations count arrangements (order matters); combinations count selections (order doesn’t matter). Probability = favourable outcomes ÷ total outcomes.',
    sections: [
      ['Formulas', [
        'nPr = n! ÷ (n − r)!. nCr = n! ÷ [r!(n − r)!].',
        'Fundamental counting principle: multiply choices for independent steps (AND); add for alternatives (OR).',
        'Circular arrangements of n distinct objects: (n − 1)!.',
        'Arrangements of a word with repeated letters: n! ÷ (p! q! …).',
        'Probability of an event + probability of its complement = 1.',
        'Two dice: 36 outcomes. A deck of cards: 52 cards, 4 suits, 12 face cards.',
      ]],
    ],
    prelims: ['Use the complement for “at least one” questions: 1 − P(none).'],
    traps: ['Selection of a committee is a combination; arranging people in a row is a permutation.'],
  },

  'Syllogisms & statement–conclusion': {
    overview: 'Syllogism questions give statements and ask which conclusions follow. Venn diagrams are the most reliable method.',
    sections: [
      ['Method', [
        'Draw the minimum possible overlap consistent with each statement.',
        'A conclusion follows only if it is true in every possible diagram.',
        '“All A are B” does not mean “All B are A”. “Some A are B” means “Some B are A”.',
        '“No A is B” means “No B is A”.',
        '**Either–or cases:** when two conclusions are complementary and neither follows alone.',
      ]],
      ['Statement and conclusion', [
        'A conclusion must follow directly from the statement. Do not add assumptions.',
        'Watch for extreme words like “only”, “all”, “definitely”.',
      ]],
    ],
    prelims: ['Practise five syllogism questions daily with Venn diagrams.'],
    traps: ['“Some A are not B” does not mean “Some B are not A”.'],
  },
};
