import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { BuildStep } from '@/pages/builds/add';
import { unitOptions, structureOptions, iconOptions, actionOptions } from '@/lib/stormgate-units';

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

  // Define a function to get the placeholder text based on the selected type
  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'time':
        return '00:00';
      case 'supply':
        return '9';
      case 'luminite':
      case 'therium':
        return '0-9999';
      case 'none':
        return '';
      default:
        return '';
    }
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
        className="h-7 w-7 text-white cursor-grab"
        {...listeners} // Attach drag listeners to the icon
      />

      {/* Icon DropDown for Timing Type */}
      <select
        className="p-1 bg-gray-600 text-white rounded-md flex-shrink-0"
        value={step.timing.type} // Bind the value to the current timing type
        onChange={(e) => {
          handleStepChange(index, 'timing', {
            ...step.timing,
            type: e.target.value,
            value: '', // Reset the value when the type changes
          });
        }}
      >
        {iconOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Timing Input */}
      <input
        type="text"
        className="w-16 p-1 bg-gray-600 text-white rounded-md text-center"
        placeholder={getPlaceholder(step.timing.type)} // Dynamic placeholder
        value={step.timing.value} // Use timing.value for the input field
        onChange={(e) => handleStepChange(index, 'timing', {
          ...step.timing,
          value: e.target.value, // Update the timing value
        })}
        maxLength={step.timing.type === 'time' ? 5 : 4} // Adjust maxLength based on type
        disabled={step.timing.type === 'none'} // Disable the input for 'none' type
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
          <optgroup label="Actions">
            {actionOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </optgroup>
        </select>
        <input
          type="text"
          placeholder="Description"
          className="p-1 bg-gray-600 text-white rounded-md w-full"
          value={step.description}
          onChange={(e) => handleStepChange(index, 'description', e.target.value)}
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
