export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return new Response(JSON.stringify({ error: "City is required" }), {
      status: 400,
    });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log("API KEY:", apiKey); // debug

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.status}`);
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        temperatureUnit: "C",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Weather API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
