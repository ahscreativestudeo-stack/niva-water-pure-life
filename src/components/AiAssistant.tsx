import { useState } from "react";
import { Bot, X } from "lucide-react";

const AGENT_URL = "https://niva-bot-urdu.lovable.app";

export function AiAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open NIVA AI Assistant"
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
      >
        <Bot size={22} />
        <span className="hidden sm:inline">AI Assistant</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/50 p-0 backdrop-blur-sm sm:p-6">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-none bg-card shadow-glow sm:h-[80vh] sm:max-h-[720px] sm:w-[420px] sm:rounded-2xl">
            <div className="flex items-center justify-between bg-gradient-brand px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <Bot size={20} />
                <div className="leading-tight">
                  <div className="font-display text-sm font-semibold">NIVA AI Assistant</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80">Chat &amp; Voice</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={AGENT_URL}
              title="NIVA AI Assistant"
              className="h-full w-full flex-1 border-0 bg-background"
              allow="microphone; autoplay; clipboard-write"
            />
          </div>
        </div>
      )}
    </>
  );
}
