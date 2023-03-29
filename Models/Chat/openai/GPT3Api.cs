using System.Text;
using System.Text.Json;
using OpenAI.GPT3;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels.RequestModels;
using OpenAIModels = OpenAI.GPT3.ObjectModels.Models;

namespace DistanceLearningSystem.Models.Chat.openai;

public static class GPT3Api
{
    public static async Task<string> GenerateText(string prompt)
    {
        var gpt3 = new OpenAIService(new OpenAiOptions
        {
            ApiKey = OpenAIApiKey.ApiKey
        });

        var completionResult = await gpt3.Completions.CreateCompletion(new CompletionCreateRequest
        {
            Prompt = prompt,
            Model = OpenAIModels.TextDavinciV3,
            Temperature = 0.5F,
            MaxTokens = 2048
        });

        if (completionResult.Successful)
        {
            return completionResult.Choices.FirstOrDefault()!.Text.Trim();
        }

        throw new Exception("Unknown Error");
    }
}