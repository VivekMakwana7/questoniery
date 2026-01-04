import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
    private genAI: GoogleGenerativeAI;
    private readmeCache: string | null = null;

    constructor(private configService: ConfigService) {
        const rawApiKey = 'AIzaSyDUM3cSnVgGMkL574KEwMtANhkJiz2GJ3M';
        if (!rawApiKey) {
            console.warn('GEMINI_API_KEY is not defined in .env file');
            this.genAI = new GoogleGenerativeAI('unavailable');
        } else {
            const apiKey = rawApiKey.trim();
            console.log(`[DEBUG] GEMINI_API_KEY loaded. Length: ${apiKey.length}. First 4 chars: ${apiKey.substring(0, 4)}...`);
            this.genAI = new GoogleGenerativeAI(apiKey);
        }
    }

    async askQuestion(question: string) {
        // Always try to get the latest content (cache or disk)
        const readmeContent = this.getReadme();
        const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      You are an expert project assistant. Your primary knowledge base is the "README Content" provided below.
      
      INSTRUCTIONS:
      1. Search the provided README Content thoroughly for any information related to the question.
      2. If the answer is found, provide a detailed response based on it.
      3. If the answer is NOT explicitly in the README:
         - Try to infer the answer if it relates to standard Flutter/Next.js/NestJS patterns used in this project.
         - If it's a general tech question (like "How to add a dependency"), you can provide the standard command (e.g., "flutter pub add ...") as a helpful assistant.
         - Only say "I don't have information on that" if the question is completely irrelevant to the project or its technology stack.
      
      FORMATTING RULES:
      - Always place sub-content, detailed explanations, or multi-step information on a NEW LINE to improve readability.
      - If you provide any commands (like "flutter pub add") or code snippets, ALWAYS wrap them in a standard markdown code block (e.g., \`\`\`bash ... \`\`\`).
      - Ensure every code block is preceded and followed by at least one empty line.
      - Do not combine multiple distinct pieces of information on the same line.

      README Content:
      ${readmeContent}
      
      User Question: ${question}
    `;

        try {
            const result = await model.generateContent(prompt);
            let response = result.response.text();

            // If the AI somehow still gives a generic "don't know" response, we can add a fallback or logging here.
            return response;
        } catch (error: any) {
            console.error('Gemini API Error:', error);
            if (error.message?.includes('API key not valid')) {
                return "Error: Invalid API Key. Please check your .env file.";
            }
            return `Error generating response: ${error.message}`;
        }
    }

    getReadme(): string {
        if (this.readmeCache) {
            console.log('[DEBUG] Returning README from cache');
            return this.readmeCache;
        }

        const readmePath = path.join(process.cwd(), '../README.md');
        try {
            let content = '';
            if (fs.existsSync(readmePath)) {
                content = fs.readFileSync(readmePath, 'utf8');
            } else if (fs.existsSync('./README.md')) {
                content = fs.readFileSync('./README.md', 'utf8');
            } else {
                return 'No README file found.';
            }

            this.readmeCache = content;
            return content;
        } catch (e) {
            console.error("Failed to read README", e);
            return 'Error reading README file.';
        }
    }

    updateReadme(content: string): boolean {
        const readmePath = path.join(process.cwd(), '../README.md');
        try {
            let success = false;
            if (fs.existsSync(readmePath)) {
                fs.writeFileSync(readmePath, content, 'utf8');
                success = true;
            } else if (fs.existsSync('./README.md')) {
                fs.writeFileSync('./README.md', content, 'utf8');
                success = true;
            } else {
                // Default create in root
                fs.writeFileSync(readmePath, content, 'utf8');
                success = true;
            }

            if (success) {
                this.readmeCache = content;
                console.log('[DEBUG] README cache updated');
            }
            return success;
        } catch (e) {
            console.error("Failed to update README", e);
            return false;
        }
    }
}
