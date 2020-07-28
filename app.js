/*(function (){

    'use strict';

    angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("Menusearchservice", Menusearchservice);

    NarrowItDownController.$inject=["Menusearchservice"];
    function NarrowItDownController(Menusearchservice){

        var menu=this;

        var promise=Menusearchservice.getmatchedmenuitem(searchterm);

        promise.then(function (response) {
            menu.found=response;
        })
        .catch(function (error) {
            console.log("Something is Wrong");
        });
        

    }

    Menusearchservice.$inject=["$http"]
    function Menusearchservice($http){
        var service=this;

        service.getmatchedmenuitem=function(){

            var response=$http({

                method:"GET",
                url:("https://davids-restaurant.herokuapp.com/menu_items.json")

            });
            return response.then(function(serviceresponse){

                var founditems=[];
                var arraylength=serviceresponse.data.menu_item.length;
                for(var i=0; i<arraylength; i++){
                    var item=serviceresponse.menu_item[i];
                    if(item.description.indexOf(searchterm)!==-1){
                        founditems.push(item);
                    }
                };
                return founditems;
            });
        };
    }


})();*/
(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController )
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    /*.directive('foundItems', FoundItemsDirective);*/
    
    //DIRECTIVES ***********************************************************
    /*function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };
    
      return ddo;
    }
    
    function FoundItemsDirectiveController() {
      var list = this;
    
      //Returns true if list is empty
      list.checkFoundList = function () {
        return typeof list.items !== 'undefined' && list.items.length === 0
      };
    }
    */
    
    //CONTROLLERS ***********************************************************
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
      
      //Search action
      menu.narrowItDown = function (searchTerm) {
        //Search only when searchTerm is not empty
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
              menu.found = response;
            })
            .catch(function (error) {
              console.log("something is wrong");
            });
        
      };
      
      //Remove action
      menu.removeItem = function (itemIndex) {
        console.log("lastRemoved: " + "Last item removed was " + menu.found[itemIndex].name);
        menu.found.splice(itemIndex, 1);
      };
      menu.checkFoundList = function () {
        return typeof menu.found !== 'undefined' && menu.found.length === 0
      };
    
    }
    
    
    //SERVICES ***********************************************************
    /**
    * Service to retrieve menu items
    */
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
    
      /**
      * Get list item that match to searchTerm
      */
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (response) {
            //Filtering the response items by searchTerm
            var foundItems = [];
            var menuItemsLength = response.data.menu_items.length;
            //console.log("menuItemsLength: " + menuItemsLength);
            for (var i = 0; i < menuItemsLength; i++) {
                var item = response.data.menu_items[i];
                if (item.description.indexOf(searchTerm) !== -1) {
                    //console.log("matched: " + item.description + " == " + searchTerm);
                    foundItems.push(item);
                }
            };
            return foundItems;
        });
      };
    }
    
    })();