export async function getForecastData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_AI_URL}/api/forecast`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await res.json();
  return data;
}
