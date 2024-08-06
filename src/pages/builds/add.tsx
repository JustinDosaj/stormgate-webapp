// pages/builds/add.tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/shared/container';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { AddBuildToFirebase } from '../api/firebase/functions';
import AddBuildInfo from '@/components/ui/add-build/info';
import Steps from '@/components/ui/add-build/steps';
import SubmitButtons from '@/components/ui/add-build/submit';
import { Notify } from '@/components/shared/notify';
import { useRouter } from 'next/router';
import Head from 'next/head';


export interface BuildStep {
  id: string;
  timing: {
    type: string;
    value: string; 
  };
  action: {
    type: string;
    value: string;
  };
  description: string; 
  amount: number;
}
// Initial Data for Build Order Steps
const initialSteps: BuildStep[] = [
  {
    id: 'step-1',
    timing: {
      type: 'time',
      value: '00:00'
    },
    action: { type: 'structure', value: '' },
    amount: 0,
    description: '',
  },
];

export default function AddBuild() {

  const [buildName, setBuildName] = useState('');
  const [summary, setSummary] = useState('');
  const [gameMode, setGameMode] = useState('1v1');
  const [faction, setFaction] = useState('vanguard'); // Changed to lowercase for matching
  const [enemyFaction, setEnemyFaction] = useState('any');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [twitchLink, setTwitchLink] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<BuildStep[]>(initialSteps);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const auth = useRequireAuth();

  const handleSubmit = async () => {
    setLoading(true);

    if (buildName === '' || !buildName) {
      Notify('Build name is required')
      setLoading(false)
      return;
    }

    if (youtubeLink !== '') {
      if(!youtubeLink.includes('youtube.com')){
        Notify("Invalid Youtube Link");
        setLoading(false)
        return;
      }
    }

    if (twitchLink !== '') {   
      if(!twitchLink.includes('twitch.tv')){
        setLoading(false)
        Notify("Invalid Twitch Link");
        return;
      }
    }
  
    if (!user) {
      console.error("User not authenticated.");
      setLoading(false);
      return;
    }
  
    try {
      const build = { buildName, summary, gameMode, faction, enemyFaction, youtubeLink, twitchLink, description, steps };

      const routerPath = await AddBuildToFirebase({ build, user });
    
      
      router.push(`/builds/${routerPath.id}/${routerPath.slug}`)
      // Reset form
      setBuildName('');
      setSummary('');
      setGameMode('1v1');
      setFaction('vanguard');
      setEnemyFaction('any');
      setYoutubeLink('');
      setTwitchLink('');
      setDescription('');
      setSteps(initialSteps);
      setLoading(false);

    } catch (error) {
      console.error('Error adding build:', error);
    }
  };

  // Drag and Drop Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Updated function to handle step changes with proper typing
  const handleStepChange = <K extends keyof BuildStep>(
    index: number,
    field: K,
    value: BuildStep[K]
  ) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    const newStep: BuildStep = {
      id: `step-${steps.length + 1}`,
      timing: {
        type: 'time',
        value: '00:00'
      },
      action: { type: 'structure', value: '' },
      amount: 0,
      description: '',
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  return (
    <>
      <Head>
        <title>Stormgate Tactics | Add Build</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-center p-24 text-white">
        <Container className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-white">Add New Build</h1>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Side: Build Information */}
            <AddBuildInfo
              buildName={buildName}
              setBuildName={setBuildName}
              summary={summary}
              setSummary={setSummary}
              gameMode={gameMode}
              setGameMode={setGameMode}
              faction={faction}
              setFaction={setFaction}
              enemyFaction={enemyFaction}
              setEnemyFaction={setEnemyFaction}
              youtubeLink={youtubeLink}
              setYoutubeLink={setYoutubeLink}
              twitchLink={twitchLink}
              setTwitchLink={setTwitchLink}
              description={description}
              setDescription={setDescription}
            />

            {/* Right Side: Build Order Steps */}
            <Steps 
              sensors={sensors} 
              steps={steps} 
              faction={faction} 
              handleDragEnd={handleDragEnd}
              handleStepChange={handleStepChange}
              removeStep={removeStep}
              addStep={addStep}
              />
          </div>
          
          <SubmitButtons handleSubmit={handleSubmit} loading={loading}/>

        </Container>
      </main>
    </>
  );
}
