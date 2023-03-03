const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config(); // Load all the ENV variables into your os environment.

openai.api_key = process.env.OPENAI_API_KEY; // Get your API key from env variable

const msgs = [];
const systemMsg = prompt("What type of chatbot would you like to create?\n");
msgs.push({role: "system", content: systemMsg});
console.log("Say hello to your new chatbot! Type quit() when done.");

while (true) {
  const msg = prompt("YOU: ");
  if (msg.includes("quit()")) {
    break;
  }
  msgs.push({role: "user", content: msg});

  const response = await openai.Completion.create({
    engine: 'davinci',
    prompt: msgs.map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\nAI:',
    max_tokens: 60,
    n: 1,
    stop: 'AI:'
  });

  const reply = response.choices[0].text.trim();
  msgs.push({role: "assistant", content: reply});
  console.log(`\nAI: ${reply}\n`);
}
