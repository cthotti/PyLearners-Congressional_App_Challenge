import openai 

openai.api_key = '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'

def comp(PROMPT, MaxToken, outputs):
    response = openai.Completion.create(
        model = "text-davinci-003",
        prompt = PROMPT,
        max_tokens = MaxToken,
        n=outputs
    )
    output = list()
    for k in response['choices']:
        output.append(k['text'].strip())
    return output

PROMPT = """Tell me more about OpenAI"""
comp(PROMPT, MaxToken=3000, outputs=3)