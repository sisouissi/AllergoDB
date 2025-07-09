
import { GoogleGenAI } from '@google/genai';
import { allergens } from '../data/allergens';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Erreur de configuration du serveur : La clé API n'est pas définie." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Le prompt est requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // System instruction defines the AI's persona, rules, and provides the data context.
    const systemInstruction = `Vous êtes un assistant expert de classe mondiale en allergologie. Votre base de connaissances est strictement limitée aux données JSON suivantes sur les allergènes moléculaires. N'utilisez aucune connaissance externe. Vous devez répondre aux questions de l'utilisateur en vous basant UNIQUEMENT sur ces données.

**FORMAT DE RÉPONSE OBLIGATOIRE :**
- Formatez TOUTES vos réponses en utilisant le format Markdown.
- Utilisez des titres, des listes à puces (avec - ou *), du texte en **gras** ou en *italique* pour rendre la réponse claire, structurée et facile à lire.
- Ne donnez jamais de réponse qui n'est pas formatée en Markdown.

Les données sont :
${JSON.stringify(allergens)}
`;

    // The 'contents' should just be the user's direct query.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text;

    if (text === undefined) {
       console.error("Impossible d'extraire le texte de la réponse Gemini:", JSON.stringify(response, null, 2));
       return new Response(JSON.stringify({ error: "Structure de réponse invalide de l'API Gemini" }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
       });
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur dans la fonction proxy Gemini:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur serveur inconnue est survenue';
    return new Response(JSON.stringify({ error: `Erreur interne du serveur: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
