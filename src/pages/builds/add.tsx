// pages/builds/add.tsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '../../lib/firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { Container } from '@/components/shared/container';
import { useRequireAuth } from '@/hooks/useRequireAuth';
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
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/solid';

// Define the type for a BuildStep
export interface BuildStep {
  id: string;
  timing: string;
  supply: string;
  resource: {
    amount: string;
    type: string;
  };
  action: {
    type: string;
    value: string;
  };
  amount: number;
}

// Initial Data for Build Order Steps
const initialSteps: BuildStep[] = [
  {
    id: 'step-1',
    timing: '00:00',
    supply: '300',
    resource: { amount: '0', type: 'luminite' },
    action: { type: 'structure', value: '' },
    amount: 0,
  },
];

// Temporary Data for Dropdowns
export const structureOptions = [
  { label: 'Central Command', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Factory', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
];

export const unitOptions = [
  { label: 'Marine', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
  { label: 'Marauder', icon: <Cog6ToothIcon className="h-5 w-5 inline-block mr-1" /> },
];

export default function AddBuild() {

  const [buildName, setBuildName] = useState('Test');
  const [summary, setSummary] = useState('TEst2');
  const [gameMode, setGameMode] = useState('1v1');
  const [faction, setFaction] = useState('Vanguard');
  const [enemyFaction, setEnemyFaction] = useState('Any');
  const [youtubeLink, setYoutubeLink] = useState('https://www.youtube.com');
  const [twitchLink, setTwitchLink] = useState('https://twitch.tv');
  const [additionalInfo, setAdditionalInfo] = useState('info');
  const [steps, setSteps] = useState<BuildStep[]>(initialSteps);
  const [ loading, setLoading ] = useState(false);
  const { user } = useAuth();

  const auth = useRequireAuth();

  const handleSubmit = async () => {
    setLoading(true);
  
    if (!user) {
      console.error("User not authenticated.");
      setLoading(false);
      return;
    }
  
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const buildsCollectionRef = collection(db, 'builds');
      const date = new Date();
      // Add the build to the "builds" collection
      const buildDocRef = await addDoc(buildsCollectionRef, {
        buildName,
        summary,
        gameMode,
        faction,
        enemyFaction,
        youtubeLink,
        twitchLink,
        additionalInfo,
        steps,
        owner: {
          id: user.uid,
          username: user.email || 'Temp Username',
          ref: userDocRef,
        },
        createdAt: date, // Store the creation date
        updatedAt: date, 
      });
  
      // Reference the user's document and "my-builds" subcollection
      const myBuildsCollectionRef = collection(userDocRef, 'my-builds');
  
      // Add a reference to the build in the user's "my-builds" subcollection
      await setDoc(doc(myBuildsCollectionRef, buildDocRef.id), {
        buildId: buildDocRef.id,
        ref: buildDocRef,
        buildName, // Optional: Store additional build details if needed
      });
  
      // Reset form
      setBuildName('');
      setSummary('');
      setGameMode('1v1');
      setFaction('Vanguard');
      setEnemyFaction('Any');
      setYoutubeLink('');
      setTwitchLink('');
      setAdditionalInfo('');
      setSteps(initialSteps);
  
      console.log('Build successfully added.');
    } catch (error) {
      console.error('Error adding build:', error);
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
      timing: '00:00',
      supply: '0',
      resource: { amount: '0', type: 'luminite' },
      action: { type: 'structure', value: '' },
      amount: 0,
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
        <h1 className="text-3xl font-bold mb-8 text-white">Add New Build</h1>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Side: Build Information */}
          <div className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">General Build Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="buildName" className="block font-semibold mb-2">Build Name (max 65 chars):</label>
                <input
                  type="text"
                  id="buildName"
                  maxLength={65}
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="summary" className="block font-semibold mb-2">Summary (max 165 chars):</label>
                <input
                  type="text"
                  id="summary"
                  maxLength={165}
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gameMode" className="block font-semibold mb-2">Game Mode:</label>
                <select
                  id="gameMode"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                >
                  <option>1v1</option>
                  <option>3vE</option>
                </select>
              </div>
              <div>
                <label htmlFor="faction" className="block font-semibold mb-2">Faction Selection:</label>
                <select
                  id="faction"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={faction}
                  onChange={(e) => setFaction(e.target.value)}
                >
                  <option>Vanguard</option>
                  <option>Infernal</option>
                  <option>Celestial</option>
                </select>
              </div>
              <div>
                <label htmlFor="enemyFaction" className="block font-semibold mb-2">Enemy Faction:</label>
                <select
                  id="enemyFaction"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={enemyFaction}
                  onChange={(e) => setEnemyFaction(e.target.value)}
                >
                  <option>Any</option>
                  <option>Vanguard</option>
                  <option>Infernal</option>
                  <option>Celestial</option>
                </select>
              </div>
              <div>
                <label htmlFor="youtubeLink" className="block font-semibold mb-2">YouTube Link:</label>
                <input
                  type="text"
                  id="youtubeLink"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="twitchLink" className="block font-semibold mb-2">Twitch Link:</label>
                <input
                  type="text"
                  id="twitchLink"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={twitchLink}
                  onChange={(e) => setTwitchLink(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block font-semibold mb-2">Additional Information:</label>
                <textarea
                  id="additionalInfo"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Build Order Steps */}
          <div className="bg-gray-800 p-6 rounded-lg w-full md:w-3/4">
            <h2 className="text-xl font-semibold">Add Build Order Steps</h2>
            <p className="text-base mb-4">Add build steps using time, resources or supply as a tracking mechanism</p>
            
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
        <button
          className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md"
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Submit Build"}
        </button>
      </Container>
    </main>
  );
}
