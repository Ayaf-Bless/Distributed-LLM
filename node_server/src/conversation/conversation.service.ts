import { Injectable, NotFoundException } from '@nestjs/common';
import { Conversation } from './entities/Conversation';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConversationService {
  // This is too good, I would create a congif module and use there or even use the Config module that nestJS gives
  llm_app = {
    host: process.env.LLM_APP_HOST,
    port: process.env.LLM_APP_POST,
  };
  baseUrl = `http://${this.llm_app.host}:${this.llm_app.port}`;
  constructor(
    private readonly httpClientService: HttpService,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async sendQuery(model: string, question: string) {
    await this.selectModel(model);

    const response = await lastValueFrom(
      this.httpClientService.post(
        `${this.baseUrl}/query`,
        {
          question,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const newConversation = this.conversationRepository.create({
      model,
      question,
      response: response.data.answer,
    });
    const savedConversation =
      await this.conversationRepository.save(newConversation);
    return savedConversation;
  }

  async selectModel(model: string) {
    const response = await lastValueFrom(
      await this.httpClientService.post(
        `${this.baseUrl}/select_model`,
        {
          model_name: model,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data;
  }
  async getConversations() {
    const conversations = await this.conversationRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return conversations;
  }

  async getConversationDetail(id: number) {
    const conversations = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!conversations) {
      throw new NotFoundException(
        `The conversation with the id: ${id} not found`,
      );
    }
    return conversations;
  }
}
