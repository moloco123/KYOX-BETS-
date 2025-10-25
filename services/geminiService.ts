import { GoogleGenAI, Type } from "@google/genai";
import type { Prediction } from '../types';

// FIX: Initialize GoogleGenAI with API Key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  description: "A list of soccer betting predictions.",
  items: {
    type: Type.OBJECT,
    properties: {
      match_name: { 
        type: Type.STRING,
        description: "The name of the match, e.g., 'Team A vs Team B'." 
      },
      league: { 
        type: Type.STRING,
        description: "The league or competition the match belongs to." 
      },
      tip: { 
        type: Type.STRING,
        description: "The betting tip, e.g., 'Home Win', 'Over 2.5 Goals'." 
      },
      odds: { 
        type: Type.STRING,
        description: "The betting odds for the tip, as a string, e.g., '1.85'." 
      },
      kickoff: { 
        type: Type.STRING, 
        description: "The match start time in ISO 8601 format." 
      },
      type: { 
        type: Type.STRING, 
        enum: ['FREE', 'VIP'],
        description: "The type of the tip." 
      },
    },
    required: ['match_name', 'league', 'tip', 'odds', 'kickoff', 'type'],
  },
};

export const fetchPredictions = async (): Promise<Prediction[]> => {
  try {
    // FIX: Use ai.models.generateContent to generate structured data.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate 20 realistic soccer betting predictions for upcoming matches across various popular leagues. Include a mix of FREE and VIP tips. Ensure the data is in JSON format according to the provided schema. The kickoff times should be realistic for the near future.",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    // FIX: Access the generated text with the .text property and parse it.
    const jsonString = response.text.trim();
    const parsedPredictions: Omit<Prediction, 'id' | 'result'>[] = JSON.parse(jsonString);

    // Add id and default result status to each prediction
    return parsedPredictions.map((p, index) => ({
      ...p,
      id: Date.now() + index, // A simple way to generate unique-ish IDs
      result: 'pending',
    }));

  } catch (error) {
    console.error("Error fetching predictions from Gemini API:", error);
    // In case of an error, return an empty array or throw the error
    // so the caller can handle it.
    throw new Error("Failed to fetch predictions.");
  }
};
