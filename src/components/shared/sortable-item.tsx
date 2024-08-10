import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { BuildStep } from '@/pages/builds/add';
import { actionOptions } from '@/constants/stormgate-units';
import { getDropdownOptions } from '@/utils/getDropDownOptions';

interface SortableItemProps {
  id: string;
  step: BuildStep;
  index: number;
  handleStepChange: <K extends keyof BuildStep>(index: number, field: K, value: BuildStep[K]) => void;
  removeStep: (index: number) => void;
  faction: string; // Add faction prop to choose the right options
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  step,
  index,
  handleStepChange,
  removeStep,
  faction,
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
      case 'none':
        return '';
      default:
        return '';
    }
  };


  const { structures, units, research, advancedResearch, abilities, timing } = getDropdownOptions(faction);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-gray-700 p-4 rounded-md grid grid-cols-1 md:flex items-center space-x-4 text-sm lg:text-sm md:space-y-0 space-y-4"
    >
      {/* Drag Handle */}
      <div className="grid md:grid-cols-1 grid-cols-2 justify-between items-center">
        <EllipsisVerticalIcon
          className="h-7 w-7 text-white cursor-grab"
          {...listeners} // Attach drag listeners to the icon
        />
        {/* Remove Step */}
        <button onClick={() => removeStep(index)} className="md:hidden grid justify-end">
          <XMarkIcon className="h-6 w-6 text-red-600 hover:text-red-300" />
        </button>
      </div>

      

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
        {timing.map((option) => (
          <option key={option.value} value={option.value} className="">
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
      <div className="md:flex items-center md:space-x-4 md:flex-grow space-y-4 md:space-y-0">
        <select
          className="p-1 bg-gray-600 text-white rounded-md w-48" // Set fixed width for the select box
          style={{ whiteSpace: 'normal', overflowWrap: 'break-word', height: 'auto' }} // Added styles for fixed dropdown width and text wrapping
          value={step.action.value}
          onChange={(e) => {
            // Determine the selected type (Structure, Units, etc.)
            const selectedType = structures.some(option => option.label === e.target.value)
              ? 'structure'
              : step.action.type;

            handleStepChange(index, 'action', {
              ...step.action,
              value: e.target.value,
              type: selectedType, // Set the type appropriately
            });
          }}
        >
          <optgroup label="Default">
              <option key={"None"} value={"none"} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {"None"}
              </option>
          </optgroup>
          <optgroup label="Structure">
            {structures.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Units">
            {units.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Research">
            {research.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Advanced Research">
            {advancedResearch.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Abilities">
            {abilities.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Actions">
            {actionOptions.map((option) => (
              <option key={option.label} value={option.label} style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
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
      <button onClick={() => removeStep(index)} className="hidden md:block">
        <XMarkIcon className="h-6 w-6 text-red-600 hover:text-red-300" />
      </button>
    </div>
  );
};
