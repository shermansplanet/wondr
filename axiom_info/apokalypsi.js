import React from 'react';
import ScannerTypes from '../flavor_specific/scanner_types.js';

export const directScanTypes = {
  "Physical": "Science",
  "Biological": "Medicine",
  "Metanormal": "Occult",
  "Dimensional": "Occult",
  "Super-Science": "Science",
  "Night Vision": "Science",
  "Binoculars": "Science",
  "Microphone": "Science",
}

export const areaScanTypes = {
  "Physical Objects": "Science",
  "Energy": "Science",
  "Computer Activity": "Computer",
  "Living Things": "Medicine",
  "Metanormal Things": "Occult",
  "Super-Science": "Science",
  "Scrying": "Science",
}

export const possibilityScanTypes = {
  "Data Extrapolation": "Computer",
  "Telephone Game": "Computer",
  "Probability Analysis": "Computer",
}

export const everythingScanTypes = {
  "Omniscience": "Computer",
  "Temporal Link": "Computer",
}

export const quirks = [
  /*{
    name: "Goggles",
    description: "Goggles fit over the eyes, allowing for a constant flow of data while the wearer views his environment, rather than forcing the user to split his attention between the scanner screen and his immediate surroundings. They offer the advantage of a heads-up display, but cannot see anything outside of the genius' immediate field of vision.",
    prereq: {
      flavor: ["Scanner/Communicator", "Direct Scanner", "Mind Reader"]
    },
  },*/
  {
    name: "Active Scanner",
    description: "Normal scanners passively absorb information. This variable lets a scanner send out active pulses that are analyzed when they bounce back. This increases the scanner's range by three steps. However, active scans are noticed automatically by any Science-based scanning device, and can draw unwanted attention.",
    options: [{
      "Active Only" : -1,
      "Active or Passive" : -2,
    }],
  },{
    name: "One-Medium Communicator",
    description: "The communicator only transmits one type of data.",
    modifier: +1,
    options: [{
      "Audio" : 0,
      "Still Pictures" : 0,
      "Text Data" : 0,
      "Video" : 0,
    }],
    prereq: {flavor: ["Scanner / Communicator", "Telepathy Device", "Extradimensional Communicator"]},
  },{
    name: "Land Line",
    description: "The Apokalypsi device needs to be plugged in to a communication line to function. It cannot be moved while active. Extension cords can be no longer than 10 feet per dot of Inspiration",
    options: [{
      "Immobile" : 2,
      "Extension Cord" : 1,
    }],
  },{
    name: "Narrow Focus",
    description: "Specific foci within a scanner type (shape or speed only, species identification only) grants a bonus in addition to the +1 bonus from having only one scanner type. A scanner that scans with only one sense (vision only, sound only, electromagnetic fields only) or a device that only works with a specific kind of target (only organisms over sixteen years old, only cake, etc.) grants a bonus as well.",
    modifier: 1,
    customInput: (setOptionCallback, val) => <div>
      What is this wonder limited to detecting?<input value = {val} onChange = {(e) => setOptionCallback(e.target.value)}/>
    </div>,
    defaultcustomValue: "",
  },{
    name: "Onboard Storage",
    description: "By default, communicators and scanners lack memory: what you see on the screen is what the device is picking up at that very moment. But with any ranks in Automata, an Apokalypsi wonder can have onboard storage. Onboard storage can record an arbitrarily large amount of information, including sound, pictures, movies, and data. Included in this option is a mundane way of getting the data from the scanner or communicator to a regular computer, such as a disk drive that the wonder can burn data to or a USB hub.",
  }
];

export const getRequiredSkills = (bi,qi) => {
  var skills = ["Computer"];
  if(bi.flavor == "Mind Reader" || bi.flavor == "Area Mental Scanner" || bi.flavor == "Universal Translator" || bi.flavor == "Telepathy Device" && !bi.flavorOptions){
    return ["Academics"];
  }
  if(bi.flavor == "Direct Scanner"){
    for(var n in bi.flavorOptions){
      if(bi.flavorOptions[n] == true && !skills.includes(directScanTypes[n])){
        skills.push(directScanTypes[n]);
      }
    }
  }
  if(bi.flavor == "Area Scanner" || bi.flavor == "Extradimensional Scanner"){
    for(var n in bi.flavorOptions){
      if(bi.flavorOptions[n] == true && !skills.includes(areaScanTypes[n])){
        skills.push(areaScanTypes[n]);
      }
    }
  }
  return skills;
}

export const flavors = {
  1 : {
    "Scanner / Communicator" : {
      description : "Roll Intelligence + Computer CORE to find or read data without permission.BREAKRange: RANGE."
    }
  }, 2 : {
    "Direct Scanner" : {
      description : "Roll Wits + Computer CORE to scan an unwilling target.BREAKTarget must be in line-of-sight within RANGE, or detected by a different Apokalypsi attempt.",
      flavorOptions : (info, setOptions) => {
        return <ScannerTypes
          selections = {info.flavorOptions}
          setSelections = {x => setOptions(x)}
          scanTypes = {directScanTypes}
          title = "Scanner Capabilities"
        />
      },
      defaultFlavorOptions : {"Physical" : true},
    }, "Mind Reader" : {
      description : "Roll Wits + Academics CORE vs. Resolve + Metanormal Advantage to get surface thoughts. On an exceptional success, roll again to get a deep scan.BREAKTarget must be in line-of-sight within RANGE, or detected by a different Apokalypsi attempt."
    }, "Telepathy Device" : {
      description : "Roll Wits + Academics CORE to project into the mind of an unwilling subject.BREAKTarget must be in line-of-sight within RANGE, or detected by a different Apokalypsi attempt.",
      flavorOptions : (info, setOptions) => {
        return<div>
          <button
            className = {info.flavorOptions ? "full" : "empty"}
            onClick = {(e) => setOptions(!info.flavorOptions)}
          />
          Computer Telepathy
        </div>
      },
      defaultFlavorOptions : false
    }, "Universal Translator" : {
      description : "Once activated, all selected subjects within RANGE hear all spoken communication in a language in which they are fluent."
    }
  }, 3 : {
    "Area Scanner" : {
      description : "Roll Wits + Computer CORE to find targets. This roll is further modified by the size of the target and the search radius.BREAKMaxium search radius: RANGE",
      flavorOptions : (info, setOptions) => {
        return<ScannerTypes
          selections = {info.flavorOptions}
          setSelections = {x => setOptions(x)}
          scanTypes = {areaScanTypes}
          title = "Detectable things"
        />
      },
      defaultFlavorOptions : {"Physical Objects" : true},
    }, "Area Mental Scanner" : {
      description : "Roll Wits + Computer CORE to find targets. This roll is further modified by search radius.BREAKMaxium search radius: RANGE"
    }
  }, 4 : {
    "Possibility / Probability" : {
      description: 'IFData ExtrapolationSpend one minute of work (or a turn at -2) and roll Intelligence + Investigation CORE to extrapolate current data.BREAKENDIFIFTelephone GameRoll Manipulation + Politics CORE for "telephone game" communication.BREAKENDIFIFProbability AnalysisRoll Intelligence + Science CORE to determine the odds of something happening.ENDIF',
      flavorOptions : (info, setOptions) => {
        return <ScannerTypes
          selections = {info.flavorOptions}
          setSelections = {x => setOptions(x)}
          scanTypes = {possibilityScanTypes}
          title = "Device Capabilities"
        />
      },
      defaultFlavorOptions : {"Data Extrapolation": true,
                              "Telephone Game": true,
                              "Probability Analysis": true,},
    },
    "Extradimensional Scanner" : {
      description : "Roll Wits + Occult CORE to find targets. This roll is further modified by the size of the target and the search radius.BREAKMaxium search radius: RANGE",
      flavorOptions : (info, setOptions) => {
        return<ScannerTypes
          selections = {info.flavorOptions}
          setSelections = {x => setOptions(x)}
          scanTypes = {areaScanTypes}
          title = "Detectable things"
        />
      },
      defaultFlavorOptions : {"Physical Objects" : true},
    },
    "Extradimensional Communicator" : {
      description : "Roll Wits + Occult CORE to access another reality. Roll Intelligence + Computer CORE to find or read data without permission.BREAKRange: RANGE."
    }
  }, 5 : {
    "Everything Detector" : {
      description: "Roll Intelligence + Investigation CORE to answer a question about anything within range.BREAKMake an extended Wits + Academics CORE check to scan into another time.BREAKRange: RANGE",
      flavorOptions : (info, setOptions) => {
        return <ScannerTypes
          selections = {info.flavorOptions}
          setSelections = {x => setOptions(x)}
          scanTypes = {everythingScanTypes}
          title = "Device Capabilities"
        />
      },
      defaultFlavorOptions : {"Omniscience": true,
                              "Temporal Link": true,}
    }
  }
}

const ranges = {
  "-3" : "touch",
  "-2" : "1 foot",
  "-1" : "10 feet",
  "0" : "100 feet",
  "1" : "1 mile",
  "2" : "10 miles",
  "3" : "1,000 miles / Low Earth Orbit",
  "4" : "10,000 miles / Anywhere on Earth",
  "5" : "1 million miles / Out to Lunar Orbit",
  "6" : "anywhere in the solar system",
  "7" : "anywhere"
}

export const flavorModules = {
  "RANGE" : (cm, qirkInfo) => {
    var num = parseInt(cm) || 0;
    if(qirkInfo["Active Scanner"] && qirkInfo["Active Scanner"].selected){
      num += 3;
    }
    return ranges[Math.min(Math.max(num,-3),7)];
  }
}