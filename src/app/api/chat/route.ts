import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getChatbotSystemPrompt } from '@/lib/chatGroundedPrompt';

import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

function resolveApiKey(): string | undefined {
  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
  } catch {
    // Ignore and fallback to environment variable
  }
  return process.env.GEMINI_API_KEY;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = resolveApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured on the server.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'A valid message string is required.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = getChatbotSystemPrompt();

    // Format conversation history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.content || item.text || '') }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const streamResult = await ai.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'An internal server error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
