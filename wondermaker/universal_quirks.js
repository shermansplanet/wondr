import React from 'react';
import SizeSlider from '../size.js';

export const universalQuirks = [
  {
    name: "Basilisk Effect",
    description: <div>The wonder only affects a creature that can see and that look at the wonder when it is used. Blindness or closing one's eyes renders one immune to the wonder's effects.<br/><br/>
The target of a basilisk attack can make a Wits + Composure check to look away as a reflexive action immediately before the wonder activates; any successes on this roll subtract from the wonder's roll to influence, affect, or harm the target.<br/><br/>
A character who has been partially blinded, such as by that variable of Katastrofi, gains one automatic Success to this Wits + Composure roll equal to her penalty to see.<br/><br/>
A character can try to fight and act "head down." This grants a +3 bonus to the Wits + Composure roll, but a -3 penalty to all other actions performed that turn, and a -6 penalty to any actions directed at the basilisk wonder or its controller. Anyone fighting "head down" loses his Defense.<br/><br/>
A character cannot make this reflexive roll, or act "head down," if she is not yet aware that the basilisk method of attack applies to the wonder. (Witnessing the wonder in operation, or being targeted by its attack, is enough to understand how it works and to act to protect oneself from it.)<br/><br/>
In combat, situational awareness dictates that anyone may look in the direction of the basilisk; outside of combat (such as when a genius is sneaking up on a guard), the Storyteller should indicate their facing. People facing away from the basilisk cannot be affected by it, though the wonder's user can try to draw their attention. Outside of combat, the Storyteller's discretion is usually paramount; within a fight, the Storyteller should use the rules outlined above and not listen to the ridiculously convoluted explanations players concoct for why they should receive no penalty when acting "head down."<br/><br/>
Unless the genius specifies otherwise when creating the wonder, basilisk attacks are transmittable through glass, mirrors, and real-time video links. Particularly bad transmission media can incur penalties to using the basilisk, much like partial blindness does, at the Storyteller's discretion.<br/><br/>
The basilisk method is applied most often to wonders of Katastrofi; occasionally it is used with wonders of Epikrato or Metaptropi. Other uses are technically possible, but exceedingly rare.<br/><br/>
This variable grants a +2 bonus. Wonders of Katastrofi (including Epikrato rays, Skafoi rays, etc. using Katastrofi) gain a +4 bonus to hit when using this Variable, but neither Attribute nor Skill is added to the attack check.
</div>,
    modifier: 2,
  },
  {
    name: "Charge-up time",
    description: "The wonder requires time to charge before it functions. Once the wonder charges up, it must be used by the end of the scene or the charge is lost. Once charged up it remains active for the duration of the scene. If the charge-up is manual, the genius' full attention is required to charge up a wonder with this variable, and the genius cannot take breaks while charging the wonder or he must start the charging again.",
    options: [{
      "3 turns" : 1,
      "30 seconds" : 2,
      "5 minutes" : 3,
      "20 minutes" : 4,
      "1 hour" : 5,
      "6 hours" : 6,
      "1 day" : 7,
    }],
  },
  {
    name: "Collapsible",
    description: "The wonder can be shrunk when not in use. How much the wonder shrinks depends on the genius' rank in Metaptropi. Expanding the wonder costs one point of Mania and occurs reflexively. Collapsing it has no cost and requires one action. The wonder must be expanded before it can be used.",
    customInput: (setOptionCallback, val) => <div>
      Size when collapsed: <br/>
      <SizeSlider
          value = {val}
          onChange={setOptionCallback}
          max = {30}
        />
    </div>,
    defaultcustomValue: 3,
  },
  {
    name: "Concealed",
    description: <div>The wonder appears as something it is not: a lightning projector looks like a fire extinguisher, while a suit of Prostasia armor resembles a long coat. The wonder will probably still reveal itself when deployed (that lightning projector still vomits annihilating plasma rather than spitting out fire retardant gel), but to a cursory analysis (anything but opening the wonder up or trying to use it) it resembles something other than what it is.<br/><br/>
Even a genius is limited by the bounds of common sense here: a flying machine might be made to look like a sports car or a scanner to look like a pocket-watch, but not vice-versa.<br/><br/>
This concealment does make it more difficult for a genius to recognize the wonder as an artifact of mad science.</div>,
    modifier: -1
  },
  {
    name: "Fragile",
    description: <div>The wonder is extremely delicate. It has no Durability and any amount of damage destroys it. An attack against the wonder's bearer (a person carrying it, a vehicle in which it is located, etc.) that yields five or more successes also destroys the wonder. The destroyed wonder causes one die of Bashing damage per rank to its holder (if anyone) when destroyed. Wonders of Katastrofi cause two dice of damage per rank of the most dangerous damage type they can cause.<br/><br/>
Fragile wonders look fragile―glass beakers, delicate clockwork eggs, volatiles suspended in a magnetic field―unless the creating genius has one or more dots in Metaptropi and chooses to make it appear more robust.</div>,
    modifier: 1
  },
  {
    name: "Grafted",
    description: <div>A grafted wonder is an obvious and non-removable modification to the genius or another person, such as bestial claws or a weaponized mechanical arm. If this modification can be hidden under clothing or otherwise concealed, this grants a +1 bonus. If the modification cannot be hidden, it becomes a +2 bonus. (A wonder that looks entirely normal, such as with the "normal-looking" variable, grants no bonus.)<br/><br/>
Wonders can only be grafted onto people, or perhaps regular animals―they are usually inflicted on beholden. (Grafting a wonder to a mere mortal triggers Havoc.) A wonder cannot be "grafted" onto another wonder; instead use the "integral" Variable.</div>,
    modifier: 2,
    options: [{
      "Cannot be hidden" : 0,
      "Concealable" : -1,
    }],
    incompatible: ["Integral", "Internalized"]
  },
  {
    name: "In Pill Form",
    description: <div>A wonder in "pill form" is single-use, but it can be consumed or otherwise used by anyone at any time. The genius can spend the Mania early, placing it in the pill while specifying the intended purpose of the Mania, and after that the first person to use it gains the effect. If the wonder requires a roll, the roll is made when the wonder is consumed, using the genius' abilities at the time of construction.<br/><br/>
This variable allows others to use a wonder as a kind of "one-shot burst." Anyone can use a wonder in pill form, even mere mortals, and by the time they use it, it's already destroyed, meaning that its use cannot trigger Havoc. In general, wonders in pill form are immune to Havoc unless a mere mortal tries to tamper with or analyze one.</div>,
    incompatible: ["Limited Uses"]
  },
  {
    name: "Integral",
    description: <div>An integral wonder is a wonder contained within another wonder and that cannot be separated from it. A flying machine's flame gun, an environment suit's built-in communicator, or the acidic claws of a vat-grown automaton are all integral wonders.<br/><br/>
Integral wonders require bound Mania just like any other wonder.An integral wonder cannot be removed from the main wonder.<br/><br/>
A wonder cannot be integral to a wonder that already possesses this variable; one cannot produce "nested dolls" of integral wonders. If two or more wonders are merely attached to one-another and cannot be separated, the genius can select one primary wonder, and the rest are integral to that wonder.<br/><br/>
A genius can install an integral wonder in another genius' wonder.</div>,
    modifier: 1,
    incompatible: ["Grafted", "Internalized"]
  },
  {
    name: "Internalized",
    description: "An internalized wonder exists inside a person's or creature's body or mind. Deployable cat-like claws, eyes replaced with night-vision cameras (but still looking like normal eyes), or mental alterations that allow for telekinesis are all examples of internalized wonders. They offer no bonus, and they must be Size 0 in order to fit inside the human body. Internalized wonders often require assistance to place in a genius' body.",
    incompatible: ["Integral", "Grafted"]
  },
  {
    name: "Limited Uses",
    description: <div>Some wonders are designed to be used once, or at most a handful of times. Limited-use wonders grant a general bonus depending on how many uses they have. A "use" is defined as a single activation of the device for one turn.<br/><br/>
A limited-use wonder can be reloaded or recharged by taking one minute per use and spending a number of points of Mania per use equal to the wonder's activation cost (minimum one point of Mania). A short-term wonder cannot be reloaded or recharged and is destroyed completely when empty.</div>,
    incompatible: ["In Pill Form"],
    options: [{
      "Uses equal to Inspiration" : 1,
      "One use" : 2,
    },
    {
      "Can be reloaded/recharged" : 0,
      "Short-term" : 1,
    }],
  },
  {
    name: "Mania Cost",
    description: <div>
The cost for using wonders is listed in the individual Axiom descriptions. This amount can be modified up or down, to a minimum of no Mania. Every additional point of Mania required grants a +1 bonus. Every point of Mania cost removed incurs a -1 penalty.<br/><br/>
It's possible to give a wonder with no normal Mania cost (such as a scanning wonder of Apokalypsi) a Mania cost this way. Paying the Mania cost activates the wonder for one scene.<br/><br/>
An altered Mania cost affects the initial cost to activate the item and, if necessary, to "refuel" or "recharge" it. This includes the initial cost to activate vehicles, energy shields, and most weapons, a weapon's reloading cost (normally one point of Mania), and a vehicle's refueling cost for continual operation. This variable does not affect situations where the genius pays one or more points of Mania per level of Health, such as ablative armor and healing wonders of Exelixi, or where Mania points pay for points of transformation or enhancement, such as with many wonders of Metaptropi or Exelixi, or other situations where the genius converts Mania to points or perks selected from a list, such as most Epikrato-5 brain alteration. This variable also does not affect the Mania costs of general variable effects (such as "collapsible").</div>,
    customInput: (setOptionCallback, val) => <div>
      Mania Cost Adjustment: <input type="number" value = {val} onChange = {(e) => setOptionCallback(parseInt(e.target.value))}/>
    </div>,
    defaultcustomValue: 0,
    customManiaCost: val => val
  },
  {
    name: "Normal-Looking",
    description: <div>The wonder looks like a normal object of its type. Without this Variable, wonders have a distinct "mad science" look to them. Even a simple Katastrofic knife does not look like a regular bayonet: it might possess an unusual metallic hue, an unlikely shape, or have a big battery bolted onto the side. Vehicles look, at best, as normal as Doc Brown's DeLorean in Back to the Future, and usually look like nothing that should be driving down a suburban road. These items call out for poking and prodding, which may trigger Havoc.<br/><br/>
This variable makes a wonder look like a normal specimen of its genus: a Katastrofi-based ray gun might look pretty much like a modern automatic pistol, while a supersonic rocket-craft that can travel into other realities resembles a normal airliner, perhaps of slightly unusual make, but recognizable as "some kind of jet" rather than "some sort of whacked-out mad science invention." An Apokalypsi scanner looks like a digital thermometer or radar display rather than some crazy analysis unit covered in blinking lights that keeps shouting "Danger! Danger!"<br/><br/>
Wonders with no natural analog, such as Metaptropi transmuter, gain a more respectable and mundane look: an Epikrato controller or hologram machine might resemble some kind of metal detector or an unfamiliar wrist-mounted device, and can blend in well enough to be dismissed as some kind of gadget rather than something obviously weird.</div>,
  },
  {
    name: "Peculiar Requirement",
    description: <div>Some wonders have unusual, unique environmental requirements for their operation. A Moon Hook (Skafoi 2) works much like a jet pack, except it "hooks" onto the Moon, so the genius must be able to see the Moon to use it. The Dog Howl Comm (Apokalypsi 1) is useful for transmitting information, but the message is transmitted by the howls of dogs, which means that there must be a direct line-of-dog between the wonder's user and its target (easy in most metropolitan areas, tricky in the mid-Atlantic). Similar peculiar requirements are about as inconvenient as a fault.<br/><br/>
A narrow selection of acceptable targets is never a peculiar requirement.</div>,
    modifier: 1,
    customInput: (setOptionCallback, val) => <div>
      Describe peculiar requirement here:<input value = {val} onChange = {(e) => setOptionCallback(e.target.value)}/>
    </div>,
    defaultcustomValue: "",
  },
  {
    name: "Resilient",
    description: "Wonders that are intended to be used close to mere mortals often employ this variable. Every -1 penalty to the wonder's Core Modifier grants three extra dice to Havoc checks.",
    customInput: (setOptionCallback, val) => <div>
      Ranks in "Resilient": <input type="number" value = {val} onChange = {(e) => setOptionCallback(Math.max(1,parseInt(e.target.value)))}/>
    </div>,
    defaultcustomValue: 1,
    customManiaCost: val => -val
  },
  {
    name: "Slow Reload",
    description: 'Some wonders require time to recharge after being used again. Wonders that duplicate old-fashioned muskets or ones that require extensive recalibration with every use employ this variable. A single "use" lasts for up to one turn. The genius must spend her turn reloading the wonder; it does not reload automatically. One-use wonders cannot benefit from this variable.',
    options: [{
      "1 turn" : 1,
      "10 minus Inspiration turns, minimum 2" : 2,
      "30 seconds" : 3,
      "5 minutes" : 4,
      "20 minutes" : 5,
      "1 hour" : 6,
      "6 hours" : 7,
      "1 day" : 8,
    },{
      "Manual" : 0,
      "Automatic" : -1,
    }],
  }
];