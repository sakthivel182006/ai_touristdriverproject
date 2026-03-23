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
1. Suggest major cities/places between source and destination
2. Allocate number of days for each place
3. Recommend hotel types based on budget (budget / standard / premium)
4. Provide a simple day-wise itinerary
5. Give an approximate budget split (travel, stay, food, buffer)
6. Use clear headings and simple language
7. Do NOT return JSON — return readable text

Make the plan realistic and useful for a normal traveler.
`;

  try {
    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta/llama3-70b-instruct",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.4,
          max_tokens: 800
        })
      }
    );

    const data = await response.json();

    if (!data?.choices?.length) {
      return "Unable to generate itinerary at the moment.";
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("NVIDIA LLM Error:", error.message);
    return "Travel plan could not be generated due to a temporary issue.";
  }
}
