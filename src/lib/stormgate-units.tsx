import { Cog6ToothIcon, ClockIcon } from '@heroicons/react/24/solid';


// Temporary Data for Dropdowns
export const structureOptions = [
  { label: 'Central Command', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Factory', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
];
  
export const iconOptions = [
  { label: 'Time', icon: <ClockIcon className="h-5 w-5 inline-block mr-1" />, value: 'time' },
  { label: 'Supply', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" />, value: 'supply' },
  { label: 'Luminite', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" />, value: 'luminite' },
  { label: 'Therium', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" />, value: 'therium' },
  { label: 'None', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" />, value: 'none' },
];

export const unitOptions = [
  { label: 'Marine', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Marauder', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
];

export const actionOptions = [
  { label: 'Creep', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Attack', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Pressure', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Other', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
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
