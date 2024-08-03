import { Inter } from "next/font/google";
import BuildList from "@/components/ui/buildlist";

const inter = Inter({ subsets: ["latin"] });

const placeholderBuilds = [
  {
    id: '1',
    slug: 'aggressive-zerg-rush',
    title: 'Aggressive Zerg Rush',
    author: 'Gamer123',
    faction: 'Human Vanguard',
    enemyFaction: 'Infernal Host',
    rating: 23,
    dateCreated: '2024-07-01',
  },
  {
    id: '2',
    slug: 'defensive-terran-build',
    title: 'Defensive Terran Build',
    author: 'ProGamer',
    faction: 'Celestial Armada',
    enemyFaction: 'Human Vanguard',
    rating: 17,
    dateCreated: '2024-07-02',
  },
  {
    id: '3',
    slug: 'protoss-all-in-strategy',
    title: 'Protoss All-in Strategy',
    author: 'StarMaster',
    faction: 'Infernal Host',
    enemyFaction: 'Celestial Armada',
    rating: 10,
    dateCreated: '2024-07-03',
  },
  {
    id: '4',
    slug: 'zerg-eco-focus',
    title: 'Zerg Eco Focus',
    author: 'BuildMaster',
    faction: 'Human Vanguard',
    enemyFaction: 'Celestial Armada',
    rating: 35,
    dateCreated: '2024-06-15',
  },
  {
    id: '5',
    slug: 'rush-defense',
    title: 'Rush Defense',
    author: 'DefenseLord',
    faction: 'Celestial Armada',
    enemyFaction: 'Infernal Host',
    rating: 8,
    dateCreated: '2024-06-20',
  },
];

export default function Builds() {
  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 `}>
      <BuildList builds={placeholderBuilds} title={"Builds"}/>
    </main>
  );
}
