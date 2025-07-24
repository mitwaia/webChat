// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const userKey = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!userKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const { messages, systemPrompt } = await req.json();

  const openai = new OpenAI({ apiKey: userKey });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt || "You are a helpful assistant." },
        ...messages,
      ],
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (err) {
    return NextResponse.json({ error: "OpenAI error" }, { status: 500 });
  }
}
