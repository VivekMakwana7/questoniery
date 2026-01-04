import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
    private genAI: GoogleGenerativeAI;

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
        // 1. Read your README.md file
        // Adjusted path to read from project root relative to server directory
        const readmePath = path.join(process.cwd(), '../README.md');
        let readmeContent = '';

        try {
            if (fs.existsSync(readmePath)) {
                readmeContent = fs.readFileSync(readmePath, 'utf8');
            } else {
                // Fallback to local readme or empty
                // console.warn('Root README not found, checking local...');
                if (fs.existsSync('./README.md')) {
                    readmeContent = fs.readFileSync('./README.md', 'utf8');
                } else {
                    readmeContent = 'No README file found.';
                }
            }
        } catch (e) {
            console.error("Failed to read README", e);
            readmeContent = 'Error reading README file.';
        }

        const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // 2. Create a "System Prompt" to give the AI context
        const prompt = `
      You are a helpful project assistant. Use the following README content to answer the user's question.
      If the answer isn't in the README, say "I don't have information on that."
      
      README Content:
      ${readmeContent}
      
      User Question: ${question}
    `;

        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error: any) {
            console.error('Gemini API Error:', error);
            if (error.message?.includes('API key not valid')) {
                return "Error: Invalid API Key. Please check your .env file.";
            }
            return `Error generating response: ${error.message}`;
        }
    }
}
