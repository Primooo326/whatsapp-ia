import { Configuration, OpenAIApi } from "openai"

export default async function (prompt:string,context:string) {
const configuration = new Configuration({
	apiKey: "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",
});
    const openai = new OpenAIApi(configuration)

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.8,
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: context }
            ]
        })
        return completion.data.choices[0].message;
    } catch (error) {
        return error
    }
    
}