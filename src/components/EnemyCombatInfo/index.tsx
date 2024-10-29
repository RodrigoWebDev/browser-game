import { Dynamic } from "solid-js/web";
import Button from "../Button";

const EnemyCombatInfo = ({ thing, actions }: any) => {
  console.log("🚀 ~ EnemyCombatInfo ~ thing:", thing)
  return (
    <div class="my-8">
      <div class="flex gap-2">
        <div class={`${thing.damageEffect ? "opacity-5" : ""} w-[30%]`}>
          <Dynamic component={thing.img} fill={thing.fill} />
        </div>
        <div class="grow">
          <h2 class="mb-2">Name: {thing.name}</h2>

          <div class="flex items-center">
            <span class="mr-2">HP:</span>
            <progress
              class="progress progress-error"
              value={thing.stats.hp}
              max={10}
            ></progress>
          </div>
        </div>
      </div>

      <div class="mt-4">
        {actions
          .map((item: any) => {
            return (
              <Button
                className="mr-2"
                onClick={() => {
                  item.onClick();
                }}
              >
                {item.name}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default EnemyCombatInfo;
