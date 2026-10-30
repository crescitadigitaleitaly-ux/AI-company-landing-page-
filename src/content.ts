export const navigation = [
  ['Platform', 'platform'],
  ['Technology', 'technology'],
  ['Applications', 'applications'],
  ['Vision', 'vision'],
] as const;
export const challenges = [
  {
    title: 'Data without a shared language.',
    description:
      'Telemetry, maintenance records and production systems each tell part of the story. The context lives in between.',
    label: '01 / CONNECT',
  },
  {
    title: 'A reaction is already too late.',
    description:
      'An alert tells you what happened. Operators need the context to decide what deserves attention next.',
    label: '02 / ANTICIPATE',
  },
  {
    title: 'Complex systems. Limited visibility.',
    description:
      'Seeing a single machine is useful. Understanding how an entire operation behaves is where progress begins.',
    label: '03 / UNDERSTAND',
  },
];
export const capabilities = [
  {
    title: 'Industrial intelligence',
    text: 'Bring signals and operating context together, so your team can move from readings to informed decisions.',
    tag: 'CONTEXT, CONNECTED',
  },
  {
    title: 'Predictive operations',
    text: 'Explore patterns in asset behavior and surface potential maintenance needs for human review.',
    tag: 'AHEAD OF DISRUPTION',
  },
  {
    title: 'Physical AI integration',
    text: 'A proposed bridge between intelligent software, robotic systems and the realities of the factory floor.',
    tag: 'SOFTWARE MEETS MACHINE',
  },
  {
    title: 'Digital twin visualization',
    text: 'Make asset relationships visible through a shared digital view of equipment and operational behavior.',
    tag: 'A CLEARER PICTURE',
  },
];
export const applications = [
  {
    name: 'Advanced manufacturing',
    category: '01 / PRODUCTION',
    description: 'Connect line-level signals with the bigger production picture.',
    image: '/manufacturing.webp',
    alt: 'Industrial production equipment in a manufacturing facility',
  },
  {
    name: 'Robotics & automation',
    category: '02 / MOVEMENT',
    description: 'Put machine behavior and operating context in the same view.',
    image: '/hero-mobile.webp',
    alt: 'Illustrative precision robotic arm in a dark industrial facility',
  },
  {
    name: 'Energy & infrastructure',
    category: '03 / RESILIENCE',
    description: 'Bring visibility to distributed equipment and critical assets.',
    image: '/energy.webp',
    alt: 'Wind turbines extending across an open landscape',
  },
];
export const assets = [
  {
    id: 'ARM-01',
    name: 'Assembly robot',
    location: 'Assembly line 01',
    status: 'Operational',
    health: 98,
    temperature: 42.6,
    vibration: 1.2,
    load: 76,
    note: 'Operating within the illustrative baseline. Continue routine monitoring.',
    values: [
      31, 36, 33, 43, 39, 45, 41, 42, 38, 49, 44, 47, 40, 43, 46, 42, 51, 47, 43, 46, 42, 45, 43,
      46,
    ],
  },
  {
    id: 'CNC-02',
    name: 'CNC spindle',
    location: 'Machining cell 02',
    status: 'Review suggested',
    health: 84,
    temperature: 61.8,
    vibration: 2.8,
    load: 88,
    note: 'Vibration is trending above the sample baseline. Review spindle bearings during the next planned stop.',
    values: [
      34, 31, 35, 36, 32, 38, 37, 39, 43, 41, 46, 44, 48, 46, 52, 51, 54, 53, 59, 58, 65, 63, 67,
      70,
    ],
  },
  {
    id: 'PMP-03',
    name: 'Cooling pump',
    location: 'Utility system 03',
    status: 'Operational',
    health: 96,
    temperature: 35.4,
    vibration: 0.8,
    load: 62,
    note: 'Flow and vibration remain stable in this sample. No immediate review suggested.',
    values: [
      29, 27, 31, 29, 30, 28, 32, 31, 29, 33, 30, 32, 31, 29, 32, 31, 30, 33, 32, 30, 31, 29, 31,
      30,
    ],
  },
];
