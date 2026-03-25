export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");

  if (!ref) {
    return new Response("Missing ref", { status: 400 });
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLE_API_KEY}`,
  );

  if (!res.ok) {
    return new Response("Failed to fetch photo", { status: 502 });
  }

  const buffer = await res.arrayBuffer();
  return new Response(buffer, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
