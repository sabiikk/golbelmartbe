
const carts = require('../Models/cartModel')
exports.addTocartControllerApi = async (req, res) => {
    const userId = req.payload;
    const { id, title, price, description, category, image, rating, quantity } = req.body
    try {
        const existingProduct = await carts.findOne({ id, userId });
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price;
            await existingProduct.save();
            res.status(200).json("Item incremented")
        }
        else {
            const newProduct = new carts({ id, title, price, description, category, image, rating, quantity, grandTotal: price, userId });
            await newProduct.save();
            res.status(201).json(newProduct)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.gettAllCartItemsControllerApi = async (req, res) => {
    const userId = req.payload;
    try {
        const allProducts = await carts.find({ userId: userId });
        res.status(200).json(allProducts)
    }
    catch (err) {
        res.status(401).json(err)
    }
}


//function to increment item
exports.incrementItem=async(req,res)=>{
    const {id}=req.params;
    try{
        const selectedItem=await carts.findOne({_id:id});
        if(selectedItem){
            selectedItem.quantity=selectedItem.quantity+1;
            selectedItem.grandTotal=selectedItem.price*quantity;
            await selectedItem.save();
            res.status(201).json(selectedItem)
        }
    }catch(error){
       res.status(401).json(error)
    }
}
//function to decrement item
exports.decrementitem=async(req,res)=>{
    const {id}=req.params;
    try{
        const selectedItem = await carts.findOne({_id:id});
        if(selectedItem){
            selectedItem.quantity=selectedItem.quantity -1;
            if(selectedItem.quantity ==0){
                await carts.deleteOne({_id:id})
                res.status(200).json("item removed from carts")
            }
            else{
                selectedItem.grandTotal=selectedItem.quantity*selectedItem.price;
                await selectedItem.save();
                res.status(201).json(selectedItem)
            }
        }
    }

catch(error){
    res.status(401).json(error)
}

}
exports.emptycart=async(req,res)=>{
    const userId = req.payload;
    try{
        await carts.deleteMany({userId})
    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.removeItem = async(req,res)=>{
    const {id}=req.params;
    try{
        await carts.deleteOne({_id:id});
        res.status(200).json("item removed succesfully from cart")
    }
    catch(error){
    res.status(401).json(error)
    }
}