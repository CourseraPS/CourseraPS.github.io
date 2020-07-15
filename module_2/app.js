(function (){

    'use strict';

    angular.module("ShoppingListCheckoff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject=["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService){

        var tobuy=this;
        
        tobuy.items=ShoppingListCheckOffService.showitems();

        tobuy.removeitem=function(itemIndex){
            ShoppingListCheckOffService.removeitem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject=["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService){
            var bought=this;

            bought.newitems=ShoppingListCheckOffService.additem();
    }

    function ShoppingListCheckOffService(){
            var service=this;

            var items=[
                {
                    name:"Chocolate",
                    quantity:3
                },
                {
                    name:"Chips",
                    quantity:10
                },
                {
                    name:"Pizza",
                    quantity:2
                },
                {
                    name:"Burger",
                    quantity:6
                },
                {
                    name:"Ice Cream",
                    quantity:20
                }
            ];

            var newitems=[];
            
            service.removeitem=function(itemIndex){
                newitems.push(items[itemIndex]);
                items.splice(itemIndex, 1);
                
            };
            
            service.additem=function(itemIndex){
                
                return newitems;
            };
            service.showitems=function(){
                return items;
            };
            
            
    }


})();