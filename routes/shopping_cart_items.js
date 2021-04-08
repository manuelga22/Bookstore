const Page = require('./page');
const { getIdParam, flash } = require('../helpers');
const humps = require('humps');
const { models } = require('../sequelize');
const { singularize } = require('sequelize/lib/utils');
const express = require('express');
const router = express.Router();

class ShoppingCartItems extends Page {
  constructor() {
    router.post("/addToShoppingCart",(req,res)=>{
        this.addItemsToShoppingCart(req,res).then((message)=>{
          console.log(message)
        }).catch((err)=>console.log(err))
    })
    router.post("/addToSaveForLater",(req,res)=>{
      this.addItemToSaveForLater(req,res).then((message)=>{
        console.log(message)
      }).catch((err)=>console.log(err))
    })
    // router.post("/ShoppingCartItems/edit/:id",(req,res)=>{
    //   this.editQuantity(req,res).then((message)=>{
    //     console.log(message)
    //   }).catch((err)=>console.log(err))
    // })
    // router.post("/ShoppingCartItems/delete/:id",(req,res)=>{
    //   this.deleteItemInshoppingCart(req,res).then((message)=>{
    //      console.log(message)
    //   }).catch((err)=>console.log(err))
    // })
    router.post("/deleteSaveForLater/:id",(req,res)=>{
      this.deleteItemInSaveForLater(req,res).then((message)=>{
         console.log(message)
      }).catch((err)=>console.log(err))
    })
    
    super(router);

        //this.currentUser = req.session.user

  }
  
  router() { return router; }

  async index(req,res){
      this.get(this.allApiUrl(), async() => {
        
        let totalCheckoutPrice = 0;
        const booksInfo = []
        const savedForLater = []

        //get all items from shopping cart
        //const allItemsInShoppingCart =  await models.ShoppingCartItem.findAll({where:{UserId:this.currentUser.id}})
        const allItemsInShoppingCart =  await models.ShoppingCartItem.findAll()
        const allItemsInSavedForLater = await models.SavedForLater.findAll()
   
        //get the names of the books and Price given the the ID of the book 
        for(const item of allItemsInShoppingCart){
          const book =  await models.Book.findOne({where:{id: item.BookId}})
          if(book)booksInfo.push(book)
        }  
        for(const item of allItemsInSavedForLater){
          const book =  await models.Book.findOne({where:{id: item.BookId}})
          if(book)savedForLater.push(book)
        }  

        let booksInShoppingCart = new Array(allItemsInShoppingCart.length)
        for(let i = 0; i<booksInShoppingCart.length; i++){
          booksInShoppingCart[i] = {
            title : booksInfo[i].title,
            price : booksInfo[i].priceCents,
            coverUrl: booksInfo[i].coverUrl,
            bookId: booksInfo[i].id,
            quantity : allItemsInShoppingCart[i].quantity,
            deferred : allItemsInShoppingCart[i].deferred,
            id: allItemsInShoppingCart[i].id,
            resourceName: this.resourceName,
          } 
          totalCheckoutPrice += (booksInShoppingCart[i].price*booksInShoppingCart[i].quantity)
        }
        //add WHERE after for user
        res.render(`${this.constructor.name}/index`,{
          shopping_items: booksInShoppingCart, 
          saved_for_later_items: savedForLater,
          totalCheckoutPrice,
          msg: req.flash("message")
        });

      }, (error) => {
        console.error(error);
      });
  };
  
  createAction(req, res) {
    flash(req, {success: "Book has been successfully added to cart."});
    req.body.shoppingCartItem.UserId = req.session.user.id
    this.post(this.createApiUrl(req.params.id), req.body.shoppingCartItem, (success) => {
      res.redirect(this.indexPageUrl());
    }, (error) => {
      console.error(error);
    });
  }
  updateAction(req, res) {
    //req.body.wishList.UserId = this.currentUser.id;
    flash(req, {success: "Successfully updated the item"});
    super.put(this.updateApiUrl(req.params.id), req.body, (success) => {
      res.redirect("/shopping_cart_items")
    }, (error) => {
      console.error(error);
    });
  }
  destroyAction(req, res) {
    flash(req, {success: "Item succesfully removed"});
    super.destroyAction(req, res);
  }

  //SHOPPING CART FUNCTIONS
  async addItemsToShoppingCart(req,res){
       const body = req.body
       console.log("THEN ",body.bookId)
       const bookObj = {
         BookId: parseInt(body.bookId),
         quantity: 1, //one is default
         deferred: false
       }
       this.upsert(models.ShoppingCartItem, bookObj, {BookId: bookObj.BookId})
       .then((message)=>{
          req.flash("message", "book has been added to the shopping cart")
          res.redirect("/shopping_cart_items")
       }).catch((err)=>req.flash("err", "Error while adding book to the shopping cart"))
  };

  // SAVE FOR LATER FUNCTIONS
  async addItemToSaveForLater(req,res){
    const body = req.body
    const bookObj = {
      BookId :parseInt(body.bookId)
    }
    this.upsert(models.SavedForLater,bookObj, {BookId: bookObj.BookId})
    .then((message)=>{
      req.flash("message", "book has been added to save for later")
      res.redirect("/shopping_cart_items");
    }).catch(err=>req.flash("err", "Error while adding book to the shopping cart"))
  };

  async deleteItemInSaveForLater(req,res){
    const itemId = req.params.id
    await models.SavedForLater.destroy({ where: {BookId: itemId}})
    .then((message)=>{
      req.flash("message","Succesfully deleted the item")
      res.status(304).redirect("/shopping_cart_items");
     }).catch((err)=>req.flash("error",err));
  };
   //updates or creates a new item
  async upsert(table, values, condition) {
     console.log(table)
     await table.findOne({ where: condition })
        .then(async (obj)=> {
            // update
            if(obj){
               console.log("item already exists")
               return        
            } 
            // insert
            return await table.create(values);
            
        }).catch(err=>console.log(err))
  };

}

module.exports = ShoppingCartItems