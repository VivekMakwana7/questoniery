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
        const readmeContent = this.getReadme();
        const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
