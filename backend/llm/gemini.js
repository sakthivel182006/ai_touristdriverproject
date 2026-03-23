import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function explainChange(prev, current) {
  if (!prev) return "Initial plan generated.";

  const prompt = `
Previous plan:
${JSON.stringify(prev, null, 2)}

Updated plan:
${JSON.stringify(current, null, 2)}

Explain why the plan changed in 2 lines.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
