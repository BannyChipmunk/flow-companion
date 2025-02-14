
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CONTEXT = `You are a knowledgeable and empathetic women's health assistant. Your role is to provide accurate, helpful information about women's health topics while being sensitive and supportive. Always maintain a professional yet friendly tone. If asked about serious medical conditions, remind users to consult healthcare professionals for personalized medical advice.

Key guidelines:
1. Provide evidence-based information when possible
2. Be sensitive and respectful when discussing personal health topics
3. Encourage users to seek professional medical advice when appropriate
4. Focus on education and general wellness information
5. Avoid making specific medical diagnoses or treatment recommendations
6. Be inclusive and considerate of diverse experiences and needs`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!apiKey) {
      throw new Error('Gemini API key not found');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello, please follow these guidelines for our conversation:" + CONTEXT,
        },
        {
          role: "model",
          parts: "I understand and will follow these guidelines for providing women's health information. I will be professional, empathetic, and evidence-based while encouraging consultation with healthcare professionals when appropriate. How can I help you today?",
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
