//Female villager
import femaleVillager0 from "../assets/npcs/villagers/female/0.webp";
import femaleVillager1 from "../assets/npcs/villagers/female/1.png";
import femaleVillager2 from "../assets/npcs/villagers/female/2.png";
import femaleVillager3 from "../assets/npcs/villagers/female/3.png";
import femaleVillager4 from "../assets/npcs/villagers/female/4.png";
import femaleVillager5 from "../assets/npcs/villagers/female/5.png";

//Male villager
import maleVillager0 from "../assets/npcs/villagers/male/0.webp";
import maleVillager1 from "../assets/npcs/villagers/male/1.png";
import maleVillager2 from "../assets/npcs/villagers/male/2.png";
import maleVillager3 from "../assets/npcs/villagers/male/3.png";
import maleVillager4 from "../assets/npcs/villagers/male/4.png";
import maleVillager5 from "../assets/npcs/villagers/male/5.png";

export const NPC = {
  VILLAGER: {
    MALE: {
      IMAGES: [
        maleVillager0,
        maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5,
      ],
    },
    FEMALE: {
      IMAGES: [
        femaleVillager0,
        femaleVillager1,
        femaleVillager2,
        femaleVillager3,
        femaleVillager4,
        femaleVillager5,
      ],
    },
  },
  TRAVELLER: {
    MALE: {
      IMAGES: [
        maleVillager0,
        maleVillager1,
        maleVillager2,
        maleVillager3,
        maleVillager4,
        maleVillager5,
      ],
    },
    FEMALE: {
      IMAGES: [
        femaleVillager0,
        femaleVillager1,
        femaleVillager2,
        femaleVillager3,
        femaleVillager4,
        femaleVillager5,
      ],
    },
  },
};

export type TNPC_TYPES = keyof typeof NPC;
export const NPC_TYPES = Object.keys(NPC) as TNPC_TYPES[];
