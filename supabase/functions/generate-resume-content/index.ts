import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { type, context } = await req.json();

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "summary": {
        systemPrompt =
          "You are a professional resume writer. Generate a concise, impactful professional summary (2-3 sentences) for a resume. Focus on strengths, experience level, and career goals. Do not use first person. Output only the summary text, no quotes or labels.";
        userPrompt = `Generate a professional summary based on this information:\nName: ${context.fullName}\nSkills: ${context.skills?.join(", ") || "N/A"}\nExperience: ${context.experience || "N/A"}\nEducation: ${context.education || "N/A"}`;
        break;
      }
      case "experience": {
        systemPrompt =
          "You are a professional resume writer. Generate 3-4 concise bullet points describing achievements and responsibilities for a work experience entry. Use strong action verbs and quantify results where possible. Output bullet points separated by newlines, each starting with •. No other text.";
        userPrompt = `Generate experience bullet points for:\nRole: ${context.role}\nCompany: ${context.company}\nExisting description: ${context.description || "None provided"}`;
        break;
      }
      case "project": {
        systemPrompt =
          "You are a professional resume writer. Generate a concise 1-2 sentence description for a project on a resume. Highlight what it does, the tech used, and impact. Output only the description text.";
        userPrompt = `Generate a project description for:\nProject: ${context.name}\nTechnologies: ${context.technologies || "N/A"}\nExisting description: ${context.description || "None provided"}`;
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Invalid type" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-resume-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
