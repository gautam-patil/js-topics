const {getAll,getOne,createOne,updateOne,deleteOne}=require("../services/index").crudService;
const {PurchasedPackage,Transaction}=require("../models");

const stripe=require("stripe")(process.env.STRIPE_KEY);
exports.createPurchasedPackage=async(req,res,next)=>{
    try{
        const {token,products,user,amount,description}=req.body;
       
console.log(req.body);
const transaction=await Transaction.create({
    user:user.id,
    status:"fail",
    price:amount,
    packages:products,
    description:description,
    createdOn:new Date()
})
  const customer=await stripe.customers.create({
    email:token.email,
    source:token.id,
    name:token.card.name,
    address:{
      line1:token.card.name,
      country:token.card.address_country
    },
  });
    // console.log(customer);
   const charges=await stripe.charges.create({
      amount:amount *100,
      currency:'inr',
      customer:customer.id,
      shipping:{
        name:token.card.name,
        address:{
          line1:token.card.name,
          country:token.card.address_country
        }
      },
      description:description //`Buy a package ${product.title}`
    })

    // console.log(charges);

    transaction.chargeId=charges.id,
    transaction.status="success";
    await transaction.save()

    const purchased=await PurchasedPackage.findOne({user:user.id})
    if(!purchased){
        const res=await PurchasedPackage.create({
            user:user.id,
            packages:products
        })
        // console.log(res);
    }else{
        products.map(el=>{
          if(!purchased.packages.includes(el))
           purchased.packages.push(el)
        })
        await purchased.save();
    }
    return res.status(200).json({
        status:"success"
    })
}catch(err){
    console.log(err);
    return res.status(400).json({
        status:"failed",
        error:err
    })
    }

}
exports.updatePurchasedPackage=updateOne(PurchasedPackage);
exports.getPurchasedPackage=getOne(PurchasedPackage);
exports.deletePurchasedPackage=deleteOne(PurchasedPackage);
exports.getAllPurchasedPackages=getAll(PurchasedPackage);