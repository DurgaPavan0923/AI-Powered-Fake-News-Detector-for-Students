import { runGeminiAnalysis, AnalysisResponse } from './gemini.service';

export async function analyzeContent(
  input: { type: 'text' | 'url' | 'upload'; data: string; title?: string },
  customApiKey?: string
): Promise<AnalysisResponse & { id: string; title: string; date: string; type: 'text' | 'url' | 'file' }> {
  const result = await runGeminiAnalysis(input.data, customApiKey);
  
  const id = 'analysis_' + Math.random().toString(36).substr(2, 9);
  const title = input.title || (input.type === 'url' ? input.data : input.data.slice(0, 40) + '...');
  
  return {
    ...result,
    id,
    title,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    type: input.type === 'upload' ? 'file' : input.type
  };
}