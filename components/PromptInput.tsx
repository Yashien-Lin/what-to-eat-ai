"use client";
import { useLanguage } from "@/context/LanguageContext";

type PromptInputProps = {
  loading: boolean;
  value: string;
  onChange: (string: string) => void;
};

export default function PromptInput({
  loading,
  value,
  onChange,
}: PromptInputProps) {
  const { messages } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-xl border border-purple-300 bg-blue-50 p-4 sm:p-6 mb-6">
        <h2>{messages.promptInput.title}</h2>
        <textarea
          value={value}
          disabled={loading}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder={messages.promptInput.placeholder}
          className="w-full resize-none rounded-lg border bg-gray-100 border-purple-300 p-3
						text-sm focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    </div>
  );
}
