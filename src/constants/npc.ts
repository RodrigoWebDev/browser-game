export const NPC_GREETINGS = [
  "O dia está lindo hoje!",
  "Olá, posso ajuda-lo?",
  "O clima esta ótimo para dar um passeio.",
];

export const NPC = {
  FIREMAN: {
    NAME: "Fireman",
    IMAGE: "🧑‍🚒️",
    DESCRIPTION: "",
    HP: 100,
    MAX_HP: 100,
  },
  PERSON: {
    NAME: "Person",
    IMAGE: "🧑",
    DESCRIPTION: "",
    HP: 100,
    MAX_HP: 100,
  },
};

export type TNPC_TYPES = keyof typeof NPC;
export const NPC_TYPES = Object.keys(NPC) as TNPC_TYPES[];
