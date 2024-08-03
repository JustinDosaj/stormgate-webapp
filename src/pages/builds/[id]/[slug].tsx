import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

const build = {
    id: 'build-001',
    name: 'Zergling Rush',
    summary: 'A fast-paced Zergling rush aimed at overwhelming your opponent quickly.',
    race: 'Zerg',
    enemyRace: 'Terran',
    gameMode: '1v1',
    youtubeLink: 'https://www.youtube.com/watch?v=example',
    twitchLink: 'https://www.twitch.tv/example',
    additionalInfo: 'This build is perfect for aggressive players looking to catch opponents off guard early in the game.',
    createdBy: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    buildSteps: [
      {
        id: 'step-1',
        minutes: '00',
        seconds: '20',
        supply: '10',
        resource: { amount: '200', type: 'minerals' },
        action: { type: 'structure', value: 'Spawning Pool' },
        structure: 'Spawning Pool',
        unit: '',
        amount: 1,
      },
      {
        id: 'step-2',
        minutes: '01',
        seconds: '00',
        supply: '14',
        resource: { amount: '100', type: 'minerals' },
        action: { type: 'unit', value: 'Overlord' },
        structure: '',
        unit: 'Overlord',
        amount: 1,
      },
      {
        id: 'step-3',
        minutes: '01',
        seconds: '30',
        supply: '30',
        resource: { amount: '200', type: 'minerals' },
        action: { type: 'unit', value: 'Zerglings' },
        structure: '',
        unit: 'Zerglings',
        amount: 6,
      },
      {
        id: 'step-4',
        minutes: '02',
        seconds: '00',
        supply: '36',
        resource: { amount: '300', type: 'minerals' },
        action: { type: 'structure', value: 'Hatchery' },
        structure: 'Hatchery',
        unit: '',
        amount: 1,
      },
      {
        id: 'step-5',
        minutes: '03',
        seconds: '00',
        supply: '45',
        resource: { amount: '150', type: 'minerals' },
        action: { type: 'unit', value: 'Queen' },
        structure: '',
        unit: 'Queen',
        amount: 1,
      },
    ],
  };

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { query } = context
    const id = query.id as string
    const slug = query.slug as string

    return {
        props: {
            id, slug
        }
    }
}

const Build: React.FC = ({id, slug}: any) => {

    return (
        <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="p-6 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
                {/* General Build Information */}
                <h1 className="text-3xl font-bold mb-4">{build.name}</h1>
                <p className="mb-4">{build.summary}</p>
                <div className="flex justify-between mb-4">
                    <span>Race: {build.race}</span>
                    <span>Enemy Race: {build.enemyRace}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span>Game Mode: {build.gameMode}</span>
                    <span>Created by: {build.createdBy}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span>Created At: {new Date(build.createdAt).toLocaleDateString()}</span>
                    <span>Updated At: {new Date(build.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-4">
                    <a href={build.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    Watch on YouTube
                    </a>
                    {' | '}
                    <a href={build.twitchLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
                    Watch on Twitch
                    </a>
                </div>
                <div className="mb-8">
                    <p className="font-semibold">Additional Information:</p>
                    <p>{build.additionalInfo}</p>
                </div>

                {/* Build Steps */}
                <h2 className="text-2xl font-semibold mb-4">Build Order Steps</h2>
                <ol className="list-decimal list-inside space-y-4">
                    {build.buildSteps.map((step) => (
                    <li key={step.id} className="flex items-center bg-gray-700 p-4 rounded-md shadow-md">
                        <div className="w-16">{step.minutes}:{step.seconds}</div>
                        <div className="w-24">{step.supply}</div>
                        <div className="w-36">{step.resource.amount} {step.resource.type}</div>
                        <div className="flex-grow">
                        {step.action.type === 'structure' ? step.structure : step.unit} x{step.amount}
                        </div>
                    </li>
                    ))}
                </ol>
                </div>
        </main>
    )
}

export default Build;