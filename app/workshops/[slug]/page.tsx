import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const workshopFiles: Record<string, string> = {
  'ai-generative-ai': 'ai-and-generativeAI.html',
  'data-science-machine-learning': 'ds-and-ai.html',
  'cybersecurity-linux-administration': 'Cybersecurity.html',
  'programming-bootcamps': 'programming-bootcamp.html',
  'cloud-devops': 'cloud-devops.html',
  'corporate-ai-workshops': 'corporate-trainings.html',
};

function extractBody(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

function extractStyles(html: string) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*)<\/style>/i);
  return styleMatch ? styleMatch[1] : '';
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fileName = workshopFiles[slug];

  if (!fileName) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'public', fileName);

  try {
    const html = await fs.readFile(filePath, 'utf8');
    const body = extractBody(html);
    const styles = extractStyles(html);

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </>
    );
  } catch {
    notFound();
  }
}
