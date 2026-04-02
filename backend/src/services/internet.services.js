import {tavily} from "@tavily/core";


const TavilyInternetService = tavily({
    apiKey: process.env.TAVILY_API_KEY,
})


export const serchInternet = async ({ query }) => {
  console.log("🔥 Tavily called:", query);

  const result = await TavilyInternetService.search(query,{
    maxResults:5,
    searchDepth : "advanced"    
  });

  return result.results.map(r => r.content).join("\n"); // ✅ STRING RETURN
//   return JSON.stringify(result)
};


// export const serchInternet = async (query) => {
//     console.log("tavily log" , query);
    
//     try {
//         const response = await TavilyInternetService.search(query,{
//             maxResults:5,
//             searchDepth : "advanced"
//         });
//         console.log("response tevily" ,response);
        
//         return response;
//     }catch (error) {
//         console.error("Error searching the internet:", error);
//         throw error;    
//     }
// }