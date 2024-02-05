export const NPC_GREETINGS = [
  "O dia está lindo hoje!",
  "Olá, posso ajuda-lo?",
  "O clima esta ótimo para dar um passeio.",
];

export const NPC = {
  VILLAGER: {
    MALE: {
      IMAGES: [
        "🧑",
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        "👩",
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
        "🧑",
        /* maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5, */
      ],
    },
    FEMALE: {
      IMAGES: [
        "👩‍🦰",
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
      IMAGES: ["🧑"],
    },
    FEMALE: {
      IMAGES: ["👩‍🦰"],
    },
  },
};

export type TNPC_TYPES = keyof typeof NPC;
export const NPC_TYPES = Object.keys(NPC) as TNPC_TYPES[];
