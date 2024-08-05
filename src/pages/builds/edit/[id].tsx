// pages/builds/[id]/edit.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/shared/container';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import AddBuildInfo from '@/components/ui/add-build/info';
import { collection } from 'firebase/firestore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/shared/sortable-item';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateSlug } from '@/utils/generateSlug';
import SubmitButtons from '@/components/ui/add-build/submit';
import { Notify } from '@/components/shared/notify';

// Importing this buildstep may cause the adding build to break
import { BuildStep } from '@/constants/interfaces';

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
    }

    if (!user) {
      console.error("User not authenticated.");
      setLoading(false);
      return;
    }

    try {

        const slug = await generateSlug(buildName || '');
        const build = { buildName, summary, gameMode, faction, enemyFaction, youtubeLink, twitchLink, description, steps, data: { slug, createdAt, updatedAt } };

        // Update the build in Firebase
        const buildDocRef = doc(db, 'builds', String(id));
        await updateDoc(buildDocRef, build);

        const userDocRef = doc(db, 'users', user.uid);
        const myBuildsCollectionRef = collection(userDocRef, 'my-builds');

        // Add a reference to the build in the user's "my-builds" subcollection
        await updateDoc(doc(myBuildsCollectionRef, buildDocRef.id), {
            buildId: buildDocRef.id,
            ref: buildDocRef,
            buildName, // Optional: Store additional build details if needed
            slug,
        });

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
    <main className="bg-gray-900 flex min-h-screen flex-col items-center justify-center p-24 text-white">
      <Container className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-white">Edit Build</h1>
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
          <div className="bg-gray-800 p-6 rounded-lg w-full md:w-3/4">
            <h2 className="text-xl font-semibold">Edit Build Order Steps</h2>
            <p className="text-base mb-4">Edit build steps using time, resources, or supply as a tracking mechanism</p>
            
            {/* Column Headers */}
            <div className="flex justify-start pl-16 mb-2 text-sm font-semibold text-gray-400">
              <div className="text-center">Timing</div>
              <div className="col-span-2 text-center pl-16">Unit/Building</div>
              <div className="col-span-1 text-center pl-52">Amount</div>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={steps.map((step) => step.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <SortableItem
                      key={step.id}
                      id={step.id}
                      step={step}
                      index={index}
                      handleStepChange={handleStepChange}
                      removeStep={removeStep}
                      faction={faction} // Pass the faction to SortableItem
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Add Step Button */}
            <button
              onClick={addStep}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Step
            </button>
          </div>
        </div>

        {/* Submit Button */}
        
        <SubmitButtons handleSubmit={handleSubmit} loading={loading}/>

      </Container>
    </main>
  );
}
