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
        console.log(completion);
        return completion.data.choices[0].message;
    } catch (error) {
        return error
    }
    
}