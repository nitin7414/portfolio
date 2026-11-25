import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}

function buildSystemPrompt(): string {
  const { hero, about, experience, projects, compactProjects, education, skillGroups, contact } =
    portfolioData;

  const experienceSummary = experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.dates}, ${e.location}): ${e.description} Skills: ${e.skills.join(", ")}.`
    )
    .join("\n");

  const projectsSummary = [...projects, ...compactProjects]
    .map(
      (p) =>
        `- ${p.title} (${p.type}): ${p.description} Stack: ${p.tags.join(", ")}.${p.codeUrl ? ` Repo: ${p.codeUrl}` : ""}`
    )
    .join("\n");

  const educationSummary = education
    .map(
      (ed) =>
        `- ${ed.degree} at ${ed.institution} (${ed.years}, ${ed.location}) — ${ed.grade}. Coursework: ${ed.coursework.join(", ")}.`
    )
    .join("\n");

  const skillsSummary = skillGroups
    .map((sg) => `- ${sg.category}: ${sg.skills.join(", ")}`)
    .join("\n");

  const socialsSummary = contact.socials
    .map((s) => `- ${s.platform}: ${s.url}`)
    .join("\n");

  return `You are Nitin Mishra's interactive portfolio representative, speaking on Nitin's behalf to recruiters, hiring managers, engineers, and collaborators.

Rules:
- Answer concisely, professionally, and accurately using ONLY the verified facts below. Never invent companies, metrics, degrees, or links.
- Format responses cleanly using **bold** for emphasis and "• " for bullet points (no markdown headers like ###, no code fences unless asked).
- When relevant, mention Nitin's availability and direct contact channels.

Profile:
- Name: ${hero.name}
- Title: ${hero.title}
- Status: ${hero.status}
- Location: ${hero.location}
- Email: ${hero.email}
- Phone: ${hero.phone}
- Summary: ${hero.intro} ${hero.subIntro}
- Spoken Languages: ${about.spokenLanguages.map((l) => `${l.language} (${l.proficiency})`).join(", ")}

Experience:
${experienceSummary}

Projects:
${projectsSummary}

Education:
${educationSummary}

Technical Skills:
${skillsSummary}

Links & Contact:
${socialsSummary}`;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim().replace(/^["']|["']$/g, "");
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessageInput[] };
  try {
    body = (await request.json()) as { messages?: ChatMessageInput[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  if (history.length === 0) {
    return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": portfolioData.meta.siteUrl,
        "X-Title": `${portfolioData.hero.name} Portfolio Assistant`,
      },
      body: JSON.stringify({
        // Primary best free model with automatic OpenRouter free-router fallback
        model: "google/gemma-4-31b-it:free",
        models: [
          "google/gemma-4-31b-it:free",
          "qwen/qwen3.8-27b:free",
          "openrouter/free",
        ],
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...history.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.4,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `OpenRouter error (${response.status})`, details: errText },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      model?: string;
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "Empty response from OpenRouter." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      model: data.model ?? "openrouter/free",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach OpenRouter.", details: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
