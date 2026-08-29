import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export const nivaChat = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ messages: z.array(messageSchema).min(1).max(40) }).parse(data),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return {
        reply:
          "معذرت، AI سروس ابھی دستیاب نہیں۔ براہ کرم WhatsApp پر رابطہ کریں: 0346-2044095",
        ok: false as const,
      };
    }


    const systemPrompt = `You are the NIVA Drinking Water AI customer support assistant for HA Enterprises, Karachi, Pakistan.

LANGUAGE: Detect the customer's language and reply in the SAME language — Urdu (اردو), Roman Urdu, or English. Default greeting is in Urdu.

ABOUT NIVA:
- NIVA by HA Enterprises delivers premium, purified drinking water across Karachi.
- Every bottle passes through a 16-step purification process (underground storage, sand/carbon filtration, micron filters, reverse osmosis, UV sterilization, ozonation, mineral balancing, shrink seal, and more).
- Products: 330ml, 500ml bottles, 1.5 Litre (family & office), 6 Litre (home kitchen), 19 Litre bulk dispenser bottle (homes, offices, corporate).
- Delivery areas include: Muhammad Ali Blood Bank, NICVD, and societies across Karachi (Bahadurabad, Gulshan-e-Iqbal, DHA, Clifton, PECHS, North Nazimabad, and many more).

ORDERS & CONTACT:
- Phone: 0300-1196110
- WhatsApp: 0346-2044095 (https://wa.me/923462044095)
- To place an order, collect: customer name, delivery address/area, product & quantity, and preferred delivery time — then confirm the order and tell them the NIVA team will contact them on WhatsApp/phone to confirm.
- Never invent prices. If asked for exact pricing, say the team will confirm current rates on WhatsApp.

STYLE: Warm, polite, concise (2-4 sentences unless detail is needed). Use a respectful Pakistani tone. Never discuss competitors, politics, or topics unrelated to NIVA water service.`;

    const call = async () =>
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Lovable-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3.7-flash",
          messages: [{ role: "system", content: systemPrompt }, ...data.messages],
        }),
      });

    let res = await call();
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1200));
      res = await call();
    }

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      console.error("NIVA AI gateway error", res.status, detail);
      const reply =
        res.status === 429
          ? "ابھی رش زیادہ ہے، براہ کرم چند لمحوں بعد دوبارہ کوشش کریں۔\n(High traffic right now — please try again in a moment.)"
          : res.status === 402 || res.status === 403
            ? "معذرت، AI سروس عارضی طور پر بند ہے۔ فوری مدد کے لیے WhatsApp: 0346-2044095\n(AI service is temporarily unavailable. For help, WhatsApp 0346-2044095.)"
            : "معذرت، ابھی جواب نہیں بن سکا۔ دوبارہ کوشش کریں۔\n(Sorry, I couldn't generate a reply. Please try again.)";
      return { reply, ok: false as const };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return {
        reply:
          "معذرت، جواب خالی آیا۔ براہ کرم اپنا سوال دوبارہ لکھیں۔\n(Empty reply — please rephrase your question.)",
        ok: false as const,
      };
    }
    return { reply, ok: true as const };
  });

