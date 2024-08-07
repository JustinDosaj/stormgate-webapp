// pages/builds/[id]/edit.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/shared/container';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import AddBuildInfo from '@/components/ui/add-build/info';
import { collection } from 'firebase/firestore';
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
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateSlug } from '@/utils/generateSlug';
import SubmitButtons from '@/components/ui/add-build/submit';
import { Notify } from '@/components/shared/notify';
import Steps from '@/components/ui/add-build/steps';
import { BuildStep } from '@/constants/interfaces';
import { UpdateBuildInFirebase } from '@/pages/api/firebase/functions';
import Head from 'next/head';

export default function EditBuild() {

  const [buildName, setBuildName] = useState('');
  const [summary, setSummary] = useState('');
  const [gameMode, setGameMode] = useState('1v1');
  const [faction, setFaction] = useState('vanguard');
  const [enemyFaction, setEnemyFaction] = useState('any');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [twitchLink, setTwitchLink] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<BuildStep[]>([]);
  const [ createdAt, setCreatedAt ] = useState(); 
  const [ updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query; // Get the build ID from the URL

  const auth = useRequireAuth();

  // Fetch existing build data
  useEffect(() => {
    const fetchBuildData = async () => {
      if (!id) return;

      try {
        const buildDocRef = doc(db, 'builds', String(id));
        const buildDoc = await getDoc(buildDocRef);

        if (buildDoc.exists()) {
            const buildData = buildDoc.data();

            if (buildData.owner.id !== user?.uid) {router.push('/')}

            setBuildName(buildData.buildName || '');
            setSummary(buildData.summary || '');
            setGameMode(buildData.gameMode || '1v1');
            setFaction(buildData.faction || 'vanguard');
            setEnemyFaction(buildData.enemyFaction || 'any');
            setYoutubeLink(buildData.youtubeLink || '');
            setTwitchLink(buildData.twitchLink || '');
            setDescription(buildData.description || '');
            setSteps(buildData.steps || []);
            setCreatedAt(buildData.data.createdAt);
            const date = new Date().toISOString();
            setUpdatedAt(date);

        } else {
          console.error("Build not found.");
        }
      } catch (error) {
        console.error("Error fetching build data:", error);
      }
    };

    fetchBuildData();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);

    if (buildName === '' || !buildName) {
      Notify('Build name is required')
      setLoading(false)
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

        const slug = await generateSlug(buildName || '');
        const build = { id, buildName, summary, gameMode, faction, enemyFaction, youtubeLink, twitchLink, description, steps, data: { slug, createdAt, updatedAt } };
        const temp = await UpdateBuildInFirebase({build, user})

        router.push(`/builds/${id}/${slug}`); // Redirect to the updated build page

    } catch (error) {
      console.error('Error updating build:', error);
    } finally {
      setLoading(false);
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
        <title>Stormgate Tactics | Edit Build</title>
        <meta name='robots' content='noindex' />
      </Head>
      <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-center p-24 text-white">
        <Container className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-white">Edit Build</h1>
          <div className="flex flex-col space-y-6">
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

          {/* Submit Button */}
          
          <SubmitButtons handleSubmit={handleSubmit} loading={loading}/>

        </Container>
      </main>
    </>
  );
}
