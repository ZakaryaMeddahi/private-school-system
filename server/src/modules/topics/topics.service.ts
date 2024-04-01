import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/shared/entities/topic.entity';
import { CreateTopicParams, UpdateTopicParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
  ) {}

  async findOne(id: number) {
    try {
      const topic = await this.topicsRepository.findOne({ where: { id } });

      if (!topic) return null;

      return topic;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get topics', 500);
    }
  }

  async createOne(topicData: CreateTopicParams) {
    try {
      const topic = this.topicsRepository.create(topicData);

      const newTopic = await this.topicsRepository.save(topic);

      return newTopic;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create topic', 500);
    }
  }

  async createMany(topicData: CreateTopicParams[]) {
    try {
      const topics = this.topicsRepository.create(topicData);

      const newTopics = await this.topicsRepository.save(topics);

      return newTopics;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create topics', 500);
    }
  }

  async updateOne(id: number, sessionId: number, topicData: UpdateTopicParams) {
    try {
      const topic = await this.topicsRepository.findOne({
        where: { id: Equal(id) },
      });

      console.log('update one: ' + id);

      if (!topic) return null;

      const updatedTopic = await this.topicsRepository.save({
        ...topic,
        ...topicData,
        session: { id: sessionId },
      });

      console.log('update one: ' + updatedTopic.id);

      return updatedTopic;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update topic', 500);
    }
  }

  async updateMany(topicsData: UpdateTopicParams[]) {
    try {
      const updatedTopics = [];

      for (const topic of topicsData) {
        if (topic.isDeleted) {
          const deletedTopic = await this.deleteOne(topic.id);
          if (!deletedTopic) {
            throw new NotFoundException(
              `There is no topic with the id ${topic.id}`,
            );
          }
          continue;
        }

        const { id, isDeleted, ...newTopic } = topic;

        const updatedTopic = await this.updateOne(id, null, newTopic);
        if (!updatedTopic) {
          const createdTopic = await this.createOne(
            newTopic as CreateTopicParams,
          );
          updatedTopics.push(createdTopic);
          continue;
        }
        updatedTopics.push(updatedTopic);
      }

      return updatedTopics;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update topics', 500);
    }
  }

  async deleteOne(id: number) {
    try {
      const topic = await this.topicsRepository.findOne({ where: { id } });

      if (!topic) return null;

      const deletedTopic = await this.topicsRepository.remove(topic);

      return deletedTopic;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot delete topic', 500);
    }
  }
}
