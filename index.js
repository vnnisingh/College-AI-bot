// ===============================
// COE AI Teacher Telegram Bot
// Direct Paste & Run
// ===============================

// STEP 1:
// npm install telegraf openai dotenv

// STEP 2:
// Create .env file and add:
// BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
// OPENAI_API_KEY=YOUR_OPENAI_API_KEY

import { Telegraf } from "telegraf";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===============================
// SYSTEM PROMPT
// ===============================

const SYSTEM_PROMPT = `

You are COE AI Teacher Assistant for College of Excellence Makronia Bujurg Sagar.

You help students like a smart and supportive teacher.

College Courses:
- BA
- BSc
- BCom

Available Years:
- First Year
- Second Year
- Third Year
- Final Year

You understand:
- yearly exams
- CCE
- assignments
- practicals
- viva
- projects
- Foundation Course exams

CCE System:
- Major I
- Major II
- Minor
- Open Elective
- Vocational

Each category has 4 CCE.
Best 3 are counted.

Foundation Course:
- FC Paper 1
- FC Paper 2
- objective questions
- 50 questions per subject
- total 100 marks

Project System:
- group projects
- group leader submits final report
- students prepare report 1,2,3
- final viva with practical viva

Your behaviour:
- polite
- respectful
- teacher-like
- emotionally supportive
- professional
- smart
- deep thinking

Rules:
- Reply in Hinglish
- Help students clearly
- Motivate stressed students
- Avoid harmful content
- Ask age before restricted topics
- Never insult students
- Explain in simple language
- Behave like a real college teacher

You can:
- answer doubts
- explain subjects
- guide for exams
- help in assignments
- help in projects
- help in viva
- motivate students
- analyze uploaded text
- continue conversation naturally

`;

// ===============================
// START COMMAND
// ===============================

bot.start((ctx) => {

  ctx.reply(`
🎓 Welcome to COE AI Teacher Assistant

Main aapki help kar sakta hu:
• Study Help
• Exam Preparation
• CCE Guidance
• Assignment Help
• Project Guidance
• Viva Preparation
• Motivation & Support

Aap apna question bhej sakte hain 😊
`);

});

// ===============================
// TEXT MESSAGE HANDLER
// ===============================

bot.on("text", async (ctx) => {

  try {

    const userMessage = ctx.message.text;

    // Typing Status
    await ctx.telegram.sendChatAction(
      ctx.chat.id,
      "typing"
    );

    // OpenAI Response
    const response =
      await openai.chat.completions.create({
        model: "gpt-5.5",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      });

    // Final Reply
    const reply =
      response.choices[0].message.content;

    await ctx.reply(reply);

  } catch (error) {

    console.log(error);

    await ctx.reply(
      "⚠️ Server busy hai.\nPlease thodi der baad try kare."
    );
  }

});

// ===============================
// ERROR HANDLING
// ===============================

bot.catch((err) => {
  console.log("Bot Error:", err);
});

// ===============================
// BOT LAUNCH
// ===============================

bot.launch();

console.log("✅ COE AI Teacher Bot Started");

// ===============================
// STOP HANDLING
// ===============================

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
