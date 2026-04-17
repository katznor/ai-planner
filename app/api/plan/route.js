export async function OPTIONS() {
  return new Response("OK", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ text: "TEST OK" }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}