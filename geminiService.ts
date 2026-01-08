
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVideoCaption = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بناءً على هذا الموضوع: "${topic}"، اقترح 3 تعليقات (Captions) إبداعية وجذابة لتطبيق فيديوهات قصيرة (مثل تيك توك) بلهجة سودانية محببة، مع هاشتاقات مناسبة.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of creative captions in Sudanese Arabic",
            },
          },
          required: ["captions"],
        },
      },
    });

    const result = JSON.parse(response.text || '{"captions": []}');
    return result.captions;
  } catch (error) {
    console.error("Error generating caption:", error);
    return ["جمال السودان وأهله! 🇸🇩❤️", "محتوى سوداني بامتياز ✨", "سودان توك - منصتنا للإبداع 🚀"];
  }
};

export const suggestTrendingHashtags = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "أعطني قائمة بأكثر 5 هاشتاقات سودانية متداولة حالياً لمقاطع الفيديو.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    const result = JSON.parse(response.text || '{"hashtags": []}');
    return result.hashtags;
  } catch (error) {
    return ["#السودان", "#الخرطوم", "#سودانيز_تيك_توك", "#SudanTok", "#مشاهير_السودان"];
  }
};
