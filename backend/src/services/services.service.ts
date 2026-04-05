import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: { category: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  // Motor de Precificação - Dynamic Pricing Logic
  calculatePrice(basePrice: number, size: string, options: any[]) {
    // Exemplo simplificado: basePrice * multiplier + additions
    let total = basePrice;
    
    // Supondo multipliers no schema JSON ou regras fixas
    const multipliers = { 'P': 1.0, 'M': 1.5, 'G': 2.0, 'GG': 2.5 };
    total *= multipliers[size] || 1.0;

    return total;
  }
}
