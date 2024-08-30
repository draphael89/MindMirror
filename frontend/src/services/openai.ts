import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: This is for demo purposes. In production, API calls should be made from the backend.
});

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');

  const response = await openai.audio.transcriptions.create({
    file: formData.get('file') as File,
    model: 'whisper-1',
  });

  return response.text;
};

export const generateEssay = async (prompt: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content || '';
};