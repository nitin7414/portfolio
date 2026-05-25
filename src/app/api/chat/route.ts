import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

// Allow responses up to 30 seconds
export const maxDuration = 30;

// Initialize the Groq provider. It will automatically look for GROQ_API_KEY in your .env
const groq = createGroq();

export async function POST(req: Request) {
  // Extract the messages from the frontend request
  const { messages } = await req.json();

  const systemPrompt = `
    You are the personal AI assistant embedded in my portfolio website. 
    Your job is to represent me professionally to recruiters and clients.
    
    My Data:
    - Name: Nitin Mishra
    - Profession: Data Science and Machine Learning Enthusiast with Full-Stack Development Skills
    - Core Skills: Next.js, React, Tailwind CSS, Prisma, PostgreSQL, Python, TensorFlow.
    - Education: M.SC. Data Science and Analytics, [Sharda University], 2025-present.
    - Contact: [mlnitin7414@gmail.com](mailto:mlnitin7414@gmail.com)
    
    Guidelines:
    - Keep answers concise, friendly, and highly professional.
    - If a user asks about projects, tell them to check out the "Featured Projects" section on the page.
    - Do not invent facts about me. If you don't know, say you are not sure but they can email me.
  `;

  // Call the Groq model
  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    system: systemPrompt,
    messages,
  });

  // Return the stream back to the useChat hook on the frontend
  return result.toDataStreamResponse();
}