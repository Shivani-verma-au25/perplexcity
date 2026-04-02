import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from '@langchain/mistralai'
import {AIMessage, HumanMessage ,SystemMessage ,tool , createAgent} from "langchain"
import * as z from 'zod'
import { serchInternet } from "./internet.services.js";



// gemini ai model
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


// mistral ai model
const mistralModelAi =  new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey : process.env.MISTRAL_API_KEY
})


// tool for ai to search the internet
const seachInternetTool = tool(
  serchInternet,
  {
    name : "searchInternet",
    description : "use this tool to get latest information from the internet",
    schema : z.object({
      query : z.string().describe("the search query to look up on the internet ")
    })
  }
)

const agent = createAgent({
  model: geminiModel,
  tools: [seachInternetTool],
  // systemPrompt: `
  //   You are a smart AI assistant.

  //   IMPORTANT:
  //   - If the question requires latest or real-time information, use the "search_internet" tool.
  //   - Always use the tool for current events, news, or recent data.
  // `,
});


// generate response from ai  
//  export const generateResponse = async (messages) => {
//   try {
//     const formattedMessages = messages
//       .map((msg) => {
//         if (msg.role === "user") {
//           return new HumanMessage(msg.content);
//         } else if (msg.role === "ai") {
//           return new AIMessage(msg.content);
//         }
//         return null;
//       })
//       .filter(Boolean);

//     const response = await agent.invoke({
//       messages: formattedMessages,
//     });

//     console.log("FULL AI RESPONSE:", response);

//     // ✅ FIX: get last message
//     const lastMessage = response.messages?.[response.messages.length - 1];

//     const aiText = lastMessage?.content || "No response";

//     return aiText;

//   } catch (error) {
//     console.error("AI ERROR:", error);
//     return "Something went wrong";
//   }
// };


export async function generateResponse(messages) {
    console.log(messages)

    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]
    });

    return response.messages[ response.messages.length - 1 ].text;

}


// generate titles from ai
export const genrateChatTitle = async (message) =>{
  const response = await mistralModelAi.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ])

    return response.text;
}