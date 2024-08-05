import { structureOptions2, researchOptions, advancedResearchOptions, timingOptions, abilitiesOptions, unitOptions2 } from '@/constants/stormgate-units';

export const getDropdownOptions = (faction: string) => {
    switch (faction.toLowerCase()) {
      case 'vanguard':
        return {
          structures: structureOptions2.vanguard,
          units: unitOptions2.vanguard,
          research: researchOptions.vanguard,
          advancedResearch: advancedResearchOptions.vanguard,
          abilities: abilitiesOptions.vanguard,
          timing: timingOptions.vanguard,
        };
      case 'celestial':
        return {
          structures: structureOptions2.celestials,
          units: unitOptions2.celestials,
          research: researchOptions.celestials,
          advancedResearch: advancedResearchOptions.celestials,
          abilities: abilitiesOptions.celestials,
          timing: timingOptions.celestials,
        };
      case 'infernal':
        return {
          structures: structureOptions2.infernals,
          units: unitOptions2.infernals,
          research: researchOptions.infernals,
          advancedResearch: advancedResearchOptions.infernals,
          abilities: abilitiesOptions.infernals,
          timing: timingOptions.infernals,
        };
      default:
        return {
          structures: [],
          units: [],
          research: [],
          advancedResearch: [],
          abilities: [],
          timing: [],
        };
    }
  };