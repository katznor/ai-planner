import { shouldUseReactServerCondition } from "next/dist/build/utils";

export async function GET() {
  return new Response("API is running");
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function POST(req) {
  try {
    const { input } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          { 
            role: "system", 
            content: "You are a Japan travel planner.

            Always respond in this format:

                DAY 1:
                - Morning:
                - Afternoon:
                - Evening:

                DAY 2:
                - Morning:
                - Afternoon:
                - Evening:

                Also:
                - Keep sentences short
                - Use bullet points
                - No long paragraphs
            " },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();

    // 👇 デバッグ追加（重要）
    console.log("OPENAI RESPONSE:", JSON.stringify(data));

    let text = "No response";

    if (data.choices && data.choices.length > 0) {
      text = data.choices[0].message?.content || "Empty response";
    } else if (data.error) {
      text = "Error: " + data.error.message;
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}