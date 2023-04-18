import productRepository from '../repositories/product.repository';
import { ISProduct, Product } from '../model/products.model';

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

    async getCategory(categoria: string) {
        const category = await productRepository.getCategory(categoria)
        if(!category){
            throw new Error('Categoria de produto não encontrada')
        }
        return category
    };

    async update(id: string, product: Partial<ISProduct>) {
        const productUpdate = await productRepository.getByProduct(id)

        if(!productUpdate) {
            throw new Error('Produto não encontrado')
        }
        return productRepository.update(id, product)
    };

    async delete(id: string) {
        const product = await productRepository.remove(id)
        if (product.deletedCount === 0) {
            throw new Error('Produto não encontrado')
        }
        return 'Produto excluido com sucesso'
    }
}

export default new ProductsService();

