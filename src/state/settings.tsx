import { createSignal } from "solid-js";
import { ISettings } from "../interfaces";
import { modalState } from "./modal";
import Menu from "../components/Menu";

export const settingsState = createSignal<ISettings>({
  isNightMode: false,
});

export const settingsController = () => {
  const [settings, setSettings] = settingsState;
  const [, setModal] = modalState;

  const openMenu = () => {
    setModal({
      title: "Menu",
      isOpen: true,
      children: <Menu settings={settings()} setSettings={setSettings} />,
    });
  };

  const loadSettings = () => {
    const settingsFromLocalStorage = window.localStorage.getItem("settings");

    if (settingsFromLocalStorage) {
      const jsonSettings = JSON.parse(settingsFromLocalStorage) as ISettings;
      setSettings(jsonSettings);
    }
  };

  const updateSettings = () => {
    window.localStorage.setItem("settings", JSON.stringify(settings()));
    const theme = settings().isNightMode ? "dark" : "light";

    document.querySelector("html")?.setAttribute("data-theme", theme);
  };

  return {
    openMenu,
    loadSettings,
    updateSettings,
  };
};
