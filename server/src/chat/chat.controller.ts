import { Controller, Post, Get, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    async chat(@Body('message') message: string) {
        const answer = await this.chatService.askQuestion(message);
        return { answer };
    }

    @Get('readme')
    getReadme() {
        const content = this.chatService.getReadme();
        return { content };
    }

    @Post('readme')
    updateReadme(@Body('content') content: string) {
        const success = this.chatService.updateReadme(content);
        return { success };
    }
}
