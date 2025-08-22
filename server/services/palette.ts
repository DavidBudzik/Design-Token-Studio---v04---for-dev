import OpenAI from 'openai';

interface GeneratePaletteArgs {
  description?: string;
  theme?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generatePalette({ description, theme }: GeneratePaletteArgs) {
  const systemPrompt = `You are a color palette generator that returns only JSON compliant with a schema. The JSON must be easily parsed. The palette must contain 5 entries (Primary, Secondary, Functional, Text, Gradient) using OKLCH color notation. Ensure WCAG AA or AAA contrast for text colours. Include field \"theme\" and \"accessibility\" (wcagCompliance, contrastRatios array).`;

  const userPrompt = `Generate a color palette${theme ? ` for ${theme}` : ''}${description ? ` described as: ${description}` : ''}. Return JSON.`;

  const { choices } = await openai.chat.completions.create({
    model: process.env.MODEL || 'gpt-4o-mini',
    temperature: 0.7,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' },
    max_tokens: 300
  });

  const message = choices[0].message.content;
  return JSON.parse(message);
}