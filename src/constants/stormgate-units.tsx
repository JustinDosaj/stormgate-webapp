export const actionOptions = [
  { label: 'Creep'},
  { label: 'Attack'},
  { label: 'Pressure'},
  { label: 'Other'},
  { label: 'None'},
]

export const timingOptions = {
  vanguard: [
    { label: 'Time', value: 'time' },
    { label: 'Supply', value: 'supply' },
    { label: 'None', value: 'none' },
  ],
  celestials: [
    { label: 'Time', value: 'time' },
    { label: 'Supply', value: 'supply' },
    { label: 'None', value: 'none' },
  ],
  infernals: [
    { label: 'Time', value: 'time' },
    { label: 'Supply', value: 'supply' },
    { label: 'None', value: 'none' },
  ],
}

export const structureOptions2 = {
  vanguard: [
    { label: 'Command Post'},
    { label: 'Central Command'},
    { label: 'High Command'},
    { label: 'Habitat'},
    { label: 'Barracks'},
    { label: 'Mech Bay'},
    { label: 'Hangar Bay'},
    { label: 'Sentry Post'},
    { label: 'Scrapyard'},
    { label: 'Biokinetics Lab'},
    { label: 'Machine Lab'},
  ],
  celestials: [
    { label: 'Arcship'},
    { label: 'Arcstation'},
    { label: 'Arcfortress'},
    { label: 'Power Bank'},
    { label: 'Creation Chamber'},
    { label: 'Starforge'},
    { label: 'Legion Hall'},
    { label: 'Link Node'},
    { label: 'Therium Purifier'},
    { label: 'Guardian Nexus'},
    { label: 'Ascension Matrix'},
    { label: 'Collection Array'},
  ],
  infernals: [
    { label: 'Shrine'},
    { label: 'Greater Shrine'},
    { label: 'Elder Shrine'},
    { label: 'Meat Farm'},
    { label: 'Iron Vault'},
    { label: 'Conclave'},
    { label: 'Twilight Spire'},
    { label: 'Shroudstone'},
    { label: 'Hellforge'},
    { label: 'Ritual Chamber'},
    { label: 'Shadowcleft'},
  ],
}

export const unitOptions2 = {
  vanguard: [
    { label: 'B.O.B.'},
    { label: 'Lancer'},
    { label: 'S.C.O.U.T.'},
    { label: 'Exo'},
    { label: 'MedTech'},
    { label: 'Graven'},
    { label: 'Hedgehog'},
    { label: 'Vulcan'},
    { label: 'Atlas'},
    { label: 'Hornet'},
    { label: 'Evac'},
    { label: 'Sentinel'},
    { label: 'Helicarrier'},
  ],
  celestials: [
    { label: 'Prism'},
    { label: 'Morph Core'},
    { label: 'Argent'},
    { label: 'Kri'},
    { label: 'Scanner'},
    { label: 'Cabal'},
    { label: 'Vector'},
    { label: 'Scythe'},
    { label: 'Saber'},
    { label: 'Seraphim'},
    { label: 'Animancer'},
    { label: 'Archangel'},
  ],
  infernals: [
    { label: 'Imp'},
    { label: 'Brute'},
    { label: 'Magmadon'},
    { label: 'Hellborne'},
    { label: 'Gaunt'},
    { label: 'Hexen'},
    { label: 'Weaver'},
    { label: 'Shadowflyer'},
    { label: 'Harbinger'},
    { label: 'Spriggan'},
    { label: 'Flayed Dragon'},
  ],
}

export const researchOptions = {
  vanguard: [
    { label: 'Kinetic Redirection'},
    { label: 'Vorillium Claws'},
    { label: 'Quickdraw Hustle'},
    { label: 'MedTech Adept'},
    { label: 'Mass Infiltrate'},
    { label: 'Orbital Energy Opt.'},
    { label: 'Overcharge Amplifier'},
    { label: 'Mitigative Guard'},
    { label: 'Pounce'},
    { label: 'Survival Protocol'},
    { label: 'MedTech Master'},
    { label: 'Advanced OEO'},
  ],
  celestials: [
    { label: 'Celestial Hyperdrive'},
    { label: 'Photo-Restoration'},
    { label: 'Roll Out'},
    { label: 'Tag'},
    { label: 'Cabal Adept'},
    { label: 'Sovereign Fury'},
    { label: 'Longshot Module'},
    { label: 'Radiant Fury'},
    { label: 'Cabal Master'},
  ],
  infernals: [
    { label: 'Flame On'},
    { label: 'Soul Frenzy'},
    { label: 'Demonhoof Tremors'},
    { label: 'Molten Touch'},
    { label: 'Plague Axes'},
    { label: 'Hexen Adept'},
    { label: 'Soulforge Ascendance'},
    { label: 'Raging Tendons'},
    { label: 'Reaper Rush'},
    { label: 'Hexen Master'},
    { label: 'Soul Craze'},
  ],
}

export const advancedResearchOptions = {
  vanguard: [
    { label: 'Transonic Rockets'},
    { label: 'Impact Thrusters'},
    { label: 'Plasma Arc Infusion'},
    { label: 'Release Skymine'},
    { label: 'Skysprint Retrofit'},
    { label: 'Sentinel Adept'},
    { label: 'Covert Bombers'},
    { label: 'Peak Performance'},
    { label: 'Sentinel Master'},
  ],
  celestials: [
    { label: 'Recall'},
    { label: 'Retaliation Matrix'},
    { label: 'Core Ascendancy'},
    { label: 'Resolute Seal'},
    { label: 'Animancer Adept'},
    { label: 'Scorched Earth'},
    { label: 'Animancer Master'},
  ],
  infernals: [
    { label: 'Divebomb'},
    { label: 'Seismic Slam'},
    { label: 'Salivary Overflow'},
    { label: 'Inhale Poison'},
    { label: 'Darkness Spreads'},
  ],
}

export const abilitiesOptions = {
  vanguard: [
    { label: 'B.O.B. Overcharge'},
    { label: 'Sensor Drone'},
    { label: 'Shields Up!'},
    { label: 'Promote'},
  ],
  celestials: [
    { label: 'Power Surge'},
    { label: 'Sovereign Watch'},
    { label: 'Zenith Scan'},
    { label: 'Purify'},
    { label: 'Summon Aeon Gate'},
  ],
  infernals: [
    { label: 'Summon Effigy'},
    { label: 'Nightfall'},
    { label: 'Hellspawn'},
    { label: 'Shroudstone'},
    { label: 'Shadowfall'},
  ],
}
