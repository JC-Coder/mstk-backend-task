import { ProductService } from './product.service';
import { Product } from './product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './product.dto';
import { Model } from 'mongoose';

describe('ProductService', () => {
  let productService: ProductService;
  let mockProductModel: Model<Product>;
  const productModelToken = getModelToken(Product.name);

  const mockProductService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    updateOne: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ProductService,
        {
          provide: productModelToken,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    mockProductModel = module.get<Model<Product>>(productModelToken);
  });

  describe('Testing<createProduct>', () => {
    it('should create product', async () => {
      const payload: CreateProductDto = {
        name: 'Product 1',
        imageUrl: 'https://example.com/product1.jpg',
        description: 'Product 1 description',
        price: 10,
        quantity: 100,
      };

      const mockProduct = new Product();
      Object.assign(mockProduct, {
        name: payload.name,
        imageUrl: payload.imageUrl,
        description: payload.description,
        price: payload.price,
        quantity: payload.quantity,
      });

      jest
        .spyOn(mockProductModel, 'create')
        .mockReturnValue(mockProduct as any);

      await productService.createProduct(payload);

      expect(mockProductModel.create).toHaveBeenCalledWith({
        name: payload.name,
        imageUrl: payload.imageUrl,
        description: payload.description,
        price: payload.price,
        quantity: payload.quantity,
      });
    });
  });

  describe('Testing<updateProduct>', () => {
    it('should update a product', async () => {
      const mockProdId = '123';
      const payload: CreateProductDto = {
        name: 'Product 1',
        imageUrl: 'https://example.com/product1.jpg',
        description: 'Product 1 description',
        price: 10,
        quantity: 100,
      };

      jest.spyOn(mockProductModel, 'updateOne').mockResolvedValue(null);

      await productService.updateProduct(mockProdId, payload);

      expect(mockProductModel.updateOne).toHaveBeenCalledWith(
        {
          _id: mockProdId,
        },
        payload,
      );
    });
  });

  describe('Testing<getProductById>', () => {
    it('should return product', async () => {
      const mockProdId = '123';
      const mockProduct = new Product();

      jest.spyOn(mockProductModel, 'findOne').mockResolvedValue(mockProduct);

      await productService.getProductById(mockProdId);

      expect(mockProductModel.findOne).toHaveBeenCalledWith({
        _id: mockProdId,
      });
    });
  });

  describe('Testing<getAllProducts>', () => {
    it('should return all products', async () => {
      const mockProduct = new Product();

      jest.spyOn(mockProductModel, 'find').mockResolvedValue([mockProduct]);

      await productService.getAllProducts();

      expect(mockProductModel.find).toHaveBeenCalled();
    });
  });

  describe('Testing<deleteProduct>', () => {
    it('should delete product', async () => {
      const mockProdId = '123';

      jest.spyOn(mockProductModel, 'deleteOne').mockResolvedValue(null);

      await productService.deleteProduct(mockProdId);

      expect(mockProductModel.deleteOne).toHaveBeenCalledWith({
        _id: mockProdId,
      });
    });
  });
});
