const Page = require('./page');
const { getIdParam } = require('../helpers');
const { models } = require('../sequelize');
const express = require('express');
const router = express.Router();

class ShoppingCartItems extends Page {
  constructor() {
    
    router.post("/edit/:id",(req,res)=>{
      this.editQuantity(req,res).then((message)=>{
        console.log(message)
     }).catch((err)=>console.log(err))
    })
    router.post("/delete/:id",(req,res)=>{
      this.deleteItemInshoppingCart(req,res).then((message)=>{
         console.log(message)
      }).catch((err)=>console.log(err))
    })
    
    super(router);
  }
  
  router() { return router; }

  async index(req,res){
      this.get(this.allApiUrl(), async() => {
        
        //get all items from shopping cart
        const allItemsInShoppingCart =  await models.ShoppingCartItem.findAll()
        let totalCheckoutPrice = 0;
        //get the names of the books and Price given the the ID of the book
        const booksInfo = []
        for(const item of allItemsInShoppingCart){
          const book =  await models.Book.findOne({
            where:{id: item.BookId}
          })
          if(book)booksInfo.push(book)
        }  
        //merge the bookInfo with shopping cart info
        let booksInShoppingCart = new Array(allItemsInShoppingCart.length)
        for(let i = 0; i<booksInShoppingCart.length; i++){
          booksInShoppingCart[i] = {
            title : booksInfo[i].title,
            price : booksInfo[i].priceCents,
            quantity : allItemsInShoppingCart[i].quantity,
            deferred : allItemsInShoppingCart[i].deferred,
            id: allItemsInShoppingCart[i].id
          } 
          totalCheckoutPrice += (booksInShoppingCart[i].price*allItemsInShoppingCart[i].quantity)
        }
        //add WHERE after for user
        res.render(`${this.constructor.name}/index`,{shopping_items: booksInShoppingCart, totalCheckoutPrice,msg:req.flash("message")});
      }, (error) => {
        console.error(error);
      });
  };

  async editQuantity(req,res){
      const id = req.params.id;
      const form = req.body

      await models.ShoppingCartItem.update({ quantity: form.qty }, {
        where: {
          id: id
        }
      }).then((message)=>{
        req.flash("message","Succesfully updated the item")
      }).catch((err)=>req.flash("error",err) ) 
      res.redirect("/shopping_cart_items");
  };

  async deleteItemInshoppingCart(req,res){
    const itemId = req.params.id
    await models.ShoppingCartItem.destroy({
      where: {
        id: itemId
      }
    }).then((message)=>{
      req.flash("message","Succesfully deleted the item")
    }).catch((err)=>req.flash("error",err));
      res.status(304).redirect("/shopping_cart_items");
  };
}

module.exports = ShoppingCartItems