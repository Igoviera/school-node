import { ISProduct, Product } from "../model/products.model";

class ProductRepository {
    async getAll(){
        return await Product.find()
    };

    async getByProduct(id: string){
        return await Product.findById({_id: id })
    };

    async getCategory(category: string){
        return await Product.findOne({category: category})
    };

    async create(product: typeof Product){
        return await Product.create(product)
    }

    async update(id: string, product: Partial<ISProduct>){
        return await Product.updateOne({_id: id}, {$set: product})
    };

    async remove(id: string){
        return await Product.deleteOne({_id: id})
    };
}

export default new ProductRepository()