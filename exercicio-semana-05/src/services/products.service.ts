import productRepository from '../repositories/product.repository';
import { Product } from '../model/products.model';


class ProductsService {

    getAll() {
        return productRepository.getAll()
    };

    create(product: typeof Product) {
        return productRepository.create(product)
    };

    async getByProduct(id: string) {
        const product = await productRepository.getByProduct(id)
        if (!product) {
            throw new Error('Produto não encontrado')
        }
        return product
    };

    async update(id: string, product: Partial<typeof Product>) {
        return productRepository.update(id, product)
    };

    delete(id: string) {
        return productRepository.remove(id)
    }

}

export default new ProductsService();

