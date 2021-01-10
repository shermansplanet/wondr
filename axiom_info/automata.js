import React from 'react';
import Factory from '../flavor_specific/factory.js';

export const quirks = [
  {
    name: "Biological",
    description: "Primarily organic Automata, as opposed to primarily mechanical Automata"
  }
];

function isSelected(n, quirkInfo) {
  return quirkInfo[n] && quirkInfo[n].selected;
}

export const getRequiredSkills = (bi, qi) => {
  var skills = isSelected("Biological", qi) ? (
    ["Medicine"]
  ) : (
      (["Limb", "Factory"].includes(bi.flavor)) ? ["Crafts"] : ["Computer"]
    );
  return skills;
}

const factoryManiaCosts = {
  "One Product Only": 1,
  "Moderate Dynamism": 2,
  "Considerable Dynamism": 3,
  "Full Dynamism": 4
}

function factoryMania(basicInfo) {
  return factoryManiaCosts[basicInfo.flavorOptions[0]];
}

export const quirkBlacklist = {
  "Factory": [
    "Basilisk Effect",
    "Mania Cost"
  ],
}

export const flavors = {
  1: {
    "Triggered Device": {
      description: "Can engage in simple behavior, activating other wonders or transferring mania when a condition is met. Possesses one command per dot of creator's Inspiration, and that command cannot be changed dynamically.BREAKCan hold an amount of Mania equal to the creator's Inspiration + Automata in order to trigger other wonders and activate itself.BREAKEffective skill level: Creator's Automata + the relevant skill CORE",
      mania: 1,
    },
    "Computer": {
      description: "Performs like regular computers in most ways. Grants an Equipment bonus to all normal computer actions equal to Inspiration + Automata CORE.",
      mania: 1,
      maniaText: "Uses MANIA per day."
    },
    "Factory": {
      description: "",
      flavorOptions: (info, setOptions) => <Factory
        selected={info.flavorOptions}
        setOptions={setOptions}
      />,
      defaultFlavorOptions: ["One Product Only", ""],
      customMania: factoryMania,
      maniaText: "Given necessary raw materials, can produce one Size point per minute, with every ten full Size points costing MANIA. Can also produce one Size point per turn, at MANIA per turn."
    },
    "Limb": {
      description: "Strength: InspirationCORE+OPTBREAKDexterity: InspirationCORE-OPT",
      flavorOptions: (info, setOptions) => {
        return <div style={{ margin: "0px 8px" }}>
          Strength-Dexterity balance factor: <input type="number" value={info.flavorOptions} onChange={(e) => setOptions(parseInt(e.target.value))} />
        </div>
      },
      defaultFlavorOptions: 0,
    },
  },
  2: {
    "Automaton": {
      description: "",
    },
    "Factory" : {
      description: "",
      flavorOptions: (info, setOptions) => <Factory
        selected={info.flavorOptions}
        setOptions={setOptions}
      />,
      defaultFlavorOptions: ["One Product Only", ""],
      customMania: factoryMania,
      maniaText: "Given necessary raw materials, can produce one Size point per hour, with every ten full Size points costing MANIA. Can also produce one Size point per minute at MANIA per minute or one Size point per turn at 1+MANIA per turn."
    },
  },
  3: {
    "Factory": {
      description: "",
      flavorOptions: (info, setOptions) => <Factory
        selected={info.flavorOptions}
        setOptions={setOptions}
      />,
      defaultFlavorOptions: ["One Product Only", ""],
      customMania: factoryMania,
      maniaText: "Given necessary raw materials, can produce one Size point per day, with every ten full Size points costing MANIA. Can also produce one Size point per hour at MANIA per hour, one Size point per minute at 1+MANIA per minute, or one Size point per turn at 2+MANIA per turn."
    },
  },
  4: {
    "Factory": {
      description: "",
      flavorOptions: (info, setOptions) => <Factory
        selected={info.flavorOptions}
        setOptions={setOptions}
      />,
      defaultFlavorOptions: ["One Product Only", ""],
      customMania: factoryMania,
      maniaText: "Given necessary raw materials, can produce one Size point per week, with every human costing MANIA. Can also produce one human per day for 4+MANIA points per human, one human per hour for 9+MANIA per human, one human per minute for 19+MANIA per human, and one human per turn for 99+MANIA per human."
    },
  },
  5: {
    "Factory": {
      description: "",
      flavorOptions: (info, setOptions) => <Factory
        selected={info.flavorOptions}
        setOptions={setOptions}
      />,
      defaultFlavorOptions: ["One Product Only", ""],
      customMania: factoryMania,
      maniaText: "Given necessary raw materials, can produce one Size point worth of wonders per hour for MANIA per rank of the finished wonder, one Size point per minute for 1+MANIA per rank of the finished wonder, or one Size point per turn for 2+MANIA per rank of the finished wonder."
    },
  }
}