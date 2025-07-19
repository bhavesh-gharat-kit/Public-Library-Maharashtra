import { OpenAI } from 'openai';
import fs from 'fs/promises'; // For reading book files
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { userMessage, tool, bookId } = await req.json();

  // Step 1: Read book text (simulated here from a .txt file)
  const bookPath = path.join(process.cwd(), 'books', `${bookId}.txt`);
  const bookText = await fs.readFile(bookPath, 'utf-8');

  // Step 2: Build context prompt
  let prefixPrompt = '';
  switch (tool) {
    case 'chapter-summary':
      prefixPrompt = 'Summarize this chapter clearly for revision:\n\n';
      break;
    case 'important-notes':
      prefixPrompt = 'Extract key exam points from this chapter:\n\n';
      break;
    case 'common-mistakes':
      prefixPrompt = 'List common student mistakes from this content:\n\n';
      break;
    default:
      prefixPrompt = 'Use the following book content to answer:\n\n';
  }

  const prompt = `${prefixPrompt}${bookText}\n\nUser Question: ${userMessage}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
