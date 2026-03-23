import fetch from "node-fetch";

export async function explainChange(prev, current) {
  const prompt = `
You are a professional travel planner.

Create a detailed travel plan based on the following inputs.

Trip Details:
- From: ${current.from}
- To: ${current.to}
- Total Days: ${current.days}
- Budget: ₹${current.budget}

Requirements:
1. List major cities / places between source and destination
2. Allocate number of days for each city
3. For EACH city, suggest 1–2 REAL hotel brands (OYO, Treebo, Lemon Tree, Taj, Oberoi, etc.)
4. Mention approximate hotel rating (example: 4.2/5)
5. Suggest booking type (Budget / Standard / Premium)
6. Provide a simple day-wise itinerary
7. Provide a budget split (travel, stay, food, buffer)
8. DO NOT include image URLs
9. DO NOT return JSON
10. Use clear headings and bullet points

Return ONLY readable text.
`;

  try {
    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta/llama3-70b-instruct",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.4,
          max_tokens: 900
        })
      }
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "Unable to generate travel plan.";
  }
}
