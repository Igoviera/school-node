import { Cart } from "../model/cart.model";
import { IsUser, User } from "../model/user.model";

class UserRepository {
    async createUser(user: IsUser) {
        const userExist = await User.findOne({ email: user.email })

        if (userExist) {
            throw new Error('Email já cadastrado!')
        }

        const newCart = new Cart({
            products: [],
            valorTotal: 0
        });

        const savedCart = await newCart.save();

        const newUser = new User({ ...user, cart: savedCart._id });

        return await newUser.save()
    };

    async userById(id: string) {
        return await User.findById(id).select("-password").populate({
            path: 'cart',
            populate: {
                path: 'products',
                model: 'Product'
            }
        });
    };

    async userByEmail(email: string){
        return await User.findOne({email: email})
    }

    async updateUser(id: string, user: Partial<IsUser> ){
        return await User.updateOne({_id: id, },{$set: user})
    };

    async deleteUser(id: string) {
        const user = await User.findOne({_id: id})
        if(!user){
            throw new Error('Usuário não encontrado')
        }

        const cartId = user.cart
         if(cartId){
           await Cart.deleteOne({_id: cartId}) 
        }

        return  await User.deleteOne({ _id: id });    
    }
}
export default new UserRepository();