// Temporary Data for Dropdowns
export const structureOptions = [
  { label: 'Central Command'},
  { label: 'Factory'},
];
  
export const iconOptions = [
  { label: 'Time', value: 'time' },
  { label: 'Supply', value: 'supply' },
  { label: 'Luminite', value: 'luminite' },
  { label: 'Therium', value: 'therium' },
  { label: 'None', value: 'none' },
];

export const unitOptions = [
  { label: 'Marine'},
  { label: 'Marauder'},
];

export const actionOptions = [
  { label: 'Creep'},
  { label: 'Attack'},
  { label: 'Pressure'},
  { label: 'Other'},
  { label: 'None'},
]

export interface BuildListProps {
  builds: Build[];
  title: string;
  currentPage: number;
  totalPages: number;
}

export interface Build {
  id: string;
  slug: string;
  title: string;
  author: string;
  faction: string;
  enemyFaction: string;
  rating: number;
  dateCreated: string;
}
