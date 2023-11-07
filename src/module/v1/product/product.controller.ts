import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { sendAppResponse } from 'src/common/utils/helper';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Res() res: Response) {
    const products = await this.productService.getAllProducts();

    return sendAppResponse(res, 200, products, 'Products fetched successfully');
  }

  @Get(':id')
  async getProductById(@Res() res: Response, @Param('id') id: string) {
    const product = await this.productService.getProductById(id);

    return sendAppResponse(res, 200, product, 'Product fetched successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Res() res: Response, @Body() payload: CreateProductDto) {
    const product = await this.productService.createProduct(payload);

    return sendAppResponse(res, 201, product, 'Product created successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ) {
    await this.productService.updateProduct(id, payload);

    return sendAppResponse(res, 200, null, 'Product updated successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Res() res: Response, @Param('id') id: string) {
    await this.productService.deleteProduct(id);

    return sendAppResponse(res, 200, null, 'Product deleted successfully');
  }
}
