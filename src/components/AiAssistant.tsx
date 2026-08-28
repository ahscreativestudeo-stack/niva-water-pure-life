import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Mic, Send, Volume2, VolumeX, X } from "lucide-react";
import { nivaChat } from "@/lib/niva-chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "السلام علیکم! NIVA Drinking Water میں خوش آمدید 💧 میں آپ کی کس طرح مدد کر سکتا ہوں؟\n\n(Hello! Welcome to NIVA Drinking Water. How can I help you today?)";

// Browser SpeechRecognition typing
type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognizer(): SpeechRecognitionType | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  const Ctor = (w["SpeechRecognition"] ?? w["webkitSpeechRecognition"]) as
    | (new () => SpeechRecognitionType)
    | undefined;
  return Ctor ? new Ctor() : null;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const speak = (text: string) => {
    if (!voiceOn || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[💧*#()]/g, "").slice(0, 400);
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = /[\u0600-\u06FF]/.test(text) ? "ur-PK" : "en-US";
    window.speechSynthesis.speak(u);
  };

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const { reply } = await nivaChat({ data: { messages: next.slice(-20) } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "معذرت، ابھی جواب نہیں دے سکا۔ براہ کرم دوبارہ کوشش کریں یا WhatsApp پر رابطہ کریں: 0346-2044095\n(Sorry, I couldn't respond. Please try again or WhatsApp us at 0346-2044095.)",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }
    const recog = getRecognizer();
    if (!recog) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }
    recog.lang = "ur-PK";
    recog.interimResults = false;
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setListening(false);
      void send(transcript);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    recogRef.current = recog;
    setListening(true);
    recog.start();
  };

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
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-brand px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <Bot size={20} />
                <div className="leading-tight">
                  <div className="font-display text-sm font-semibold">NIVA AI Assistant</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80">
                    Chat &amp; Voice · اردو / English
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setVoiceOn((v) => !v);
                    window.speechSynthesis?.cancel();
                  }}
                  aria-label={voiceOn ? "Mute voice replies" : "Enable voice replies"}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
                >
                  {voiceOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button
                  onClick={() => {
                    window.speechSynthesis?.cancel();
                    setOpen(false);
                  }}
                  aria-label="Close assistant"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    dir="auto"
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-brand text-white"
                        : "bg-card text-foreground shadow-card"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-card">
                    <Loader2 size={16} className="animate-spin" /> Typing…
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-border bg-card p-3">
              <button
                onClick={toggleMic}
                aria-label={listening ? "Stop voice input" : "Speak your message"}
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${
                  listening
                    ? "animate-pulse bg-destructive text-white"
                    : "bg-secondary text-brand-deep hover:bg-secondary/70"
                }`}
              >
                <Mic size={20} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void send()}
                placeholder={listening ? "Listening… بولیں" : "Type your message…"}
                dir="auto"
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={() => void send()}
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform hover:scale-105 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
