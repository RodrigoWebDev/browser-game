import { Setter } from "solid-js";
import { ISettings } from "../../interfaces";

interface IMenu {
  settings: ISettings;
  setSettings: Setter<ISettings>;
}

const Menu = (props: IMenu) => {
  return (
    <div>
      <h3 class="text-[18px] font-medium mt-4 mb-2">Interface</h3>
      <div class="flex items-center">
        <span class="mr-4">Dark mode:</span>{" "}
        <input
          type="checkbox"
          class="toggle"
          checked={props.settings.isNightMode}
          onChange={() => {
            props.settings.isNightMode = !props.settings.isNightMode;
            props.setSettings({ ...props.settings });
            /* setSettings((val) => {
              const _isNightMode = !val.isNightMode;

              document
                .querySelector("html")
                ?.setAttribute("data-theme", _isNightMode ? "dark" : "light");
              return {
                ...val,
                isNightMode: _isNightMode,
              };
            }); */
          }}
        />
      </div>
    </div>
  );
};

export default Menu;
