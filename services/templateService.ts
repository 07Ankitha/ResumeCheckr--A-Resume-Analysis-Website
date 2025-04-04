import { prisma } from '@/lib/prisma';
import { Template, TemplateCategory, TemplateDownload } from '@/types/template';

export const templateService = {
  async getAllTemplates(): Promise<Template[]> {
    return prisma.template.findMany({
      include: {
        features: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return prisma.template.findMany({
      where: {
        category,
      },
      include: {
        features: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getTemplateById(id: number): Promise<Template | null> {
    return prisma.template.findUnique({
      where: { id },
      include: {
        features: true,
      },
    });
  },

  async getAllCategories(): Promise<TemplateCategory[]> {
    return prisma.templateCategory.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  },

  async recordTemplateDownload(templateId: number, ipAddress?: string, userAgent?: string): Promise<void> {
    await prisma.templateDownload.create({
      data: {
        templateId,
        ipAddress,
        userAgent,
      },
    });
  },

  async getTemplateStats(templateId: number): Promise<{ downloads: number }> {
    const count = await prisma.templateDownload.count({
      where: { templateId },
    });
    return { downloads: count };
  }
}; 