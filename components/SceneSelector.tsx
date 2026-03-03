import clsx from "clsx";
import { Scene } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface SceneSelectorProps {
  value: Scene;
  onChange: (scene: Scene) => void;
  loading: boolean;
}

const SCENE: Scene[] = ["home", "dine_out"];

export default function SceneSelector({
  value,
  onChange,
  loading,
}: SceneSelectorProps) {
  const { messages } = useLanguage();

  return (
    <div className="mb-6">
      <h2>{messages.scenes.title}</h2>
      <div className="flex gap-2 justify-center item-center">
        {SCENE.map((scene) => (
          <button
            key={scene}
            disabled={loading}
            onClick={() => onChange(scene)}
            className={clsx("btn", scene === value ? "btn--selected" : "")}
          >
            {messages.scenes[scene]}
          </button>
        ))}
      </div>
    </div>
  );
}
