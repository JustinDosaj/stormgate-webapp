// components/shared/SortableItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisVerticalIcon, Cog6ToothIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import { BuildStep } from '@/pages/builds/add';
import { unitOptions, structureOptions } from '@/pages/builds/add';


interface SortableItemProps {
  id: string;
  step: BuildStep;
  index: number;
  handleStepChange: <K extends keyof BuildStep>(index: number, field: K, value: BuildStep[K]) => void;
  removeStep: (index: number) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  step,
  index,
  handleStepChange,
  removeStep,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatTime = (input: string): string => {
    // Remove non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Pad with zeros if necessary
    const paddedDigits = digits.padStart(4, '0');
    
    // Extract minutes and seconds
    const minutes = paddedDigits.slice(0, -2);
    const seconds = paddedDigits.slice(-2);
    
    // Format as mm:ss
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-gray-700 p-4 rounded-md flex items-center space-x-4"
    >
      {/* Drag Handle */}
      <EllipsisVerticalIcon
        className="h-7 w-7 text-gray-500 cursor-grab"
        {...listeners} // Attach drag listeners to the icon
      />

        {/* Timing */}

            <input
                type="text"
                className="w-16 p-1 bg-gray-600 text-white rounded-md text-center"
                placeholder="mm"
                value={step.timing}
                onChange={(e) => handleStepChange(index, 'timing', e.target.value)} // Use the custom handler
                maxLength={4} // Restrict the max length to prevent overflow
            />

      {/* Action */}
      <div className="flex items-center space-x-4 flex-grow">
        <select
          className="p-1 bg-gray-600 text-white rounded-md flex-grow"
          value={step.action.value}
          onChange={(e) =>
            handleStepChange(index, 'action', {
              ...step.action,
              value: e.target.value,
            })
          }
        >
          <optgroup label="Structure">
            {structureOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Units">
            {unitOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </optgroup>
        </select>
        <input
          type="text"
          placeholder="Action Details"
          className="p-1 bg-gray-600 text-white rounded-md w-full"
          value={step.action.value}
          onChange={(e) =>
            handleStepChange(index, 'action', {
              ...step.action,
              value: e.target.value,
            })
          }
        />
      </div>

      {/* Amount */}
      <div className="flex items-center">
        <input
          type="number"
          min="0"
          max="99"
          className="w-12 p-1 bg-gray-600 text-white rounded-md text-center"
          value={step.amount}
          onChange={(e) => handleStepChange(index, 'amount', parseInt(e.target.value))}
        />
      </div>

      {/* Remove Step */}
      <button onClick={() => removeStep(index)}>
        <XMarkIcon className="h-6 w-6 text-red-600 hover:text-red-300" />
      </button>
    </div>
  );
};
