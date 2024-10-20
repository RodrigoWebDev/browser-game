import { ValidComponent } from "solid-js";
import {
  Cave,
  Chest,
  Dungeon,
  FemalePerson0,
  Forest,
  Goblin,
  MalePerson0,
  Spider,
  Tavern,
  Troll,
  Village,
  Wolf,
} from "../components/Icons";

export const MIN_THINGS_NUMBER = 3;
export const MAX_THINGS_NUMBER = 11;

export type TGender = "Male" | "Female";
export const GENDERS: TGender[] = ["Male", "Female"];

export const NPC_NAMES = {
  Male: [
    "James",
    "Robert",
    "Johh",
    "Liam",
    "Noah",
    "Oliver",
    "James",
    "Elijah",
    "William",
    "Henry",
    "Lucas",
    "Benjamin",
    "Theodore",
  ],
  Female: [
    "Mary",
    "Patricia",
    "Jennifer",
    "Stellar",
    "Olivia",
    "Emma",
    "Charlotte",
    "Amelia",
    "Sophia",
    "Isabella",
    "Ava",
    "Mia",
    "Evelyn",
    "Luna",
  ],
};

export interface IEntity {
  id: number;
  hp: number;
  maxHp: number;
  description: string;
  drops: string[];
  img: ValidComponent;
  type: string;
}

export interface IItem2 extends IEntity {
  name?: string;
  weight?: number;
  color?: string;
  price?: number;
  canEquip?: boolean;
  consumableEffects?: {
    heal?: number | null;
  } | null;
}

export interface IThingTwo {
  type: string;
  subtype: string;
}

export interface IPlaceTwo {
  type: string;
  names: string[];
  images: string[];
  things: IThingTwo[];
}

export type TPlaceTypes = "Cavern";

export const Game = {
  Enemy: {
    Troll: {
      img: Troll,
      description: "Troll",
      hp: 100,
      maxHp: 100,
      drops: ["Bone", "Fang"],
      type: "enemy",
    },
    Spider: {
      img: Spider,
      description: "Spider",
      hp: 100,
      maxHp: 100,
      drops: ["Poison"],
      type: "enemy",
    },
    Goblin: {
      img: Goblin,
      description: "Goblin",
      hp: 100,
      maxHp: 100,
      drops: ["Poison"],
      type: "enemy",
    },
    Wolf: {
      img: Wolf,
      description: "Wolf",
      hp: 100,
      maxHp: 100,
      drops: ["Bone", "Fang"],
      type: "enemy",
    },
  },
  Places: {
    Cavern: {
      type: "Cavern",
      names: ["Mistery", "Shadow", "Death", "Fear"],
      images: [Cave],
      things: [
        {
          type: "Enemy",
          subtype: "Spider",
        },
      ],
    },
    Dungeon: {
      type: "Dungeon",
      names: ["Mistery", "Shadow", "Death", "Fear"],
      images: [Dungeon],
      things: [
        // {
        //   type: "Enemy",
        //   subtype: "Spider",
        // },
        {
          type: "Enemy",
          subtype: "Goblin",
        },
        {
          type: "Enemy",
          subtype: "Troll",
        },
      ],
    },
    Village: {
      type: "Village",
      names: [
        "Aurora Village",
        "Shadow City",
        "Moonlight Hamlet",
        "Twilight Village",
        "Dragon's Port",
        "Forgotten Valley",
        "Dark Mountain",
        "Mysteries Forest",
        "Serpent Tower",
        "Windswept Rock",
        "Fantasy Isle",
        "Despair Swamp",
        "Moon Camp",
        "Storm Peak",
        "Castle Haven",
        "Enchanted Hollow",
        "Eagle's Nest",
        "Mystic Haven",
        "Silvermere",
        "Emerald Grove",
        "Whispering Pines",
        "Silent Harbor",
        "Lost Haven",
        "Dragon's Roost",
        "Golden Sands",
        "Starlight Refuge",
        "Crimson Citadel",
        "Mystic Hollow",
        "Ebon Keep",
        "Duskwood",
        "Frostfall",
        "Raven's Perch",
        "Sunset Ridge",
        "Everfrost Village",
        "Thunderpeak",
        "Ironhold",
        "Shrouded Haven",
        "Moonshadow Vale",
        "Whitestone Village",
        "Wildwood",
        "Winter's Edge",
        "Stormwatch",
        "Silvermoon",
        "Frostholm",
        "Whisperwind",
        "Sable Point",
        "Harmony Hollow",
      ],
      images: [Village],
      things: [
        {
          type: "Npc",
          subtype: "Villager",
        },
        {
          type: "Npc",
          subtype: "Merchant",
        },
        {
          type: "InnerPlace",
          subtype: "Tavern",
        },
      ],
    },
    Forest: {
      type: "Village",
      names: [
        "Whispering Woods",
        "Eternal Grove",
        "Sylvan Shadows",
        "Enchanted Canopy",
        "Mystic Thicket",
        "Verdant Vale",
        "Moonlit Arboretum",
        "Silent Woodland",
        "Eldritch Forest",
        "Ancient Foliage",
        "Twilight Glade",
        "Emerald Sanctuary",
        "Mossy Glade",
        "Haunted Copse",
        "Serene Sylvan",
        "Celestial Canopy",
        "Shrouded Grove",
        "Whisperwind Woods",
        "Feywood",
        "Starlight Grove",
        "Shadowed Thicket",
        "Ethereal Timberland",
        "Hallowed Wood",
        "Gloomwood",
        "Willowshade Forest",
        "Luminous Grove",
        "Glen of Whispers",
        "Ebonwood",
        "Elysian Canopy",
        "Glistening Glade",
        "Lost Woods",
        "Frostbark Forest",
        "Silvershade Woods",
        "Moonshadow Copse",
        "Crystal Clearing",
        "Witchwood",
        "Obsidian Grove",
        "Autumnal Canopy",
        "Sunfire Wood",
        "Dragonwood",
        "Whispering Pines",
        "Duskwood",
        "Wildwood",
        "Abyssal Thicket",
        "Frostfall Forest",
        "Willowisp Woodland",
        "Lunarwood",
        "Briarheart Grove",
      ],
      images: [Forest],
      things: [
        {
          type: "Npc",
          subtype: "Traveller",
        },
        {
          type: "Enemy",
          subtype: "Goblin",
        },
        {
          type: "Enemy",
          subtype: "Spider",
        },
        {
          type: "Enemy",
          subtype: "Wolf",
        },
        {
          type: "Container",
          subtype: "Chest",
        },
      ],
    },
  },
  Containers: {
    Chest: {
      img: Chest,
      description: "Chest",
      hp: 100,
      maxHp: 100,
      drops: ["Bone", "Fang"],
      type: "container",
    },
  },
  Npc: {
    Villager: {
      Male: {
        Images: [MalePerson0],
      },
      Female: {
        Images: [FemalePerson0],
      },
    },
    Traveller: {
      Male: {
        Images: [MalePerson0],
      },
      Female: {
        Images: [FemalePerson0],
      },
    },
    Merchant: {
      Male: {
        Images: [MalePerson0],
      },
      Female: {
        Images: [FemalePerson0],
      },
    },
  },
  InnerPlace: {
    Tavern: {
      type: "Tavern",
      Names: [
        "The Curious Flame",
        "The Nostalgic Wood Elf",
        "The Excited Hand",
        "The Ivory Cliff",
        "The Simple Pepper",
        "The Boar Hat",
        "The Obedient",
        "The Old Crocodile",
        "The Bloody Barricade",
        "The Terrific Mice",
        "The Next Best Whisper",
      ],
      img: Tavern,
    },
  },
};

export type TEnemyTypes = keyof typeof Game.Enemy;
export type TContainerTypes = keyof typeof Game.Containers;
export type TNpcTypes = keyof typeof Game.Npc;
export type TInnerPlaceTypes = keyof typeof Game.InnerPlace;
