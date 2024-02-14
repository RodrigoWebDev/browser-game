import { FemalePerson0, MalePerson0 } from "../components/Icons";

export const NPC_GREETINGS = [
  "O dia está lindo hoje!",
  "Olá, posso ajuda-lo?",
  "O clima esta ótimo para dar um passeio.",
];

export const NPC = {
  VILLAGER: {
    MALE: {
      IMAGES: [
        MalePerson0,
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        FemalePerson0,
        /*  femaleVillager1,
        femaleVillager2,
        femaleVillager3,
        femaleVillager4,
        femaleVillager5, */
      ],
    },
  },
  TRAVELLER: {
    MALE: {
      IMAGES: [
        MalePerson0,
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        FemalePerson0,
        /* femaleVillager1,
        femaleVillager2,
        femaleVillager3,
        femaleVillager4,
        femaleVillager5, */
      ],
    },
  },
  MERCHANT: {
    MALE: {
      IMAGES: [MalePerson0],
    },
    FEMALE: {
      IMAGES: [FemalePerson0],
    },
  },
};

export type TNPC_TYPES = keyof typeof NPC;
export const NPC_TYPES = Object.keys(NPC) as TNPC_TYPES[];
