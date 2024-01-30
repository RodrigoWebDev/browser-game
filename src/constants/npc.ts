//people
import malePerson0 from "../components/svgIcons/malePerson0";
import femalePerson0 from "../components/svgIcons/femalePerson0";

export const NPC_GREETINGS = [
  "O dia está lindo hoje!",
  "Olá, posso ajuda-lo?",
  "O clima esta ótimo para dar um passeio.",
];

export const NPC = {
  VILLAGER: {
    MALE: {
      IMAGES: [
        malePerson0,
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        femalePerson0,
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
        malePerson0,
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        femalePerson0,
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
      IMAGES: [malePerson0],
    },
    FEMALE: {
      IMAGES: [femalePerson0],
    },
  },
};

export type TNPC_TYPES = keyof typeof NPC;
export const NPC_TYPES = Object.keys(NPC) as TNPC_TYPES[];
