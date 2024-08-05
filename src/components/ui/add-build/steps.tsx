
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/shared/sortable-item';
import { PlusIcon } from '@heroicons/react/24/solid';
import { BuildStep } from '@/constants/interfaces';

interface StepProps {
    sensors: any;
    steps: any;
    faction: string;
    handleDragEnd: (value: any) => void;
    handleStepChange: <K extends keyof BuildStep>(index: number, field: K, value: BuildStep[K])=> void;
    removeStep: (index: number) => void;
    addStep: () => void;
}

export default function Steps({sensors, handleDragEnd, steps, handleStepChange, removeStep, faction, addStep}: StepProps) {
    return (
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
                items={steps.map((step: any) => step.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                {steps.map((step: any, index: number) => (
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
            className="mt-4 w-full bg-violet-700 hover:bg-violet-900 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
            >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Step
            </button>
      </div>
    )
}