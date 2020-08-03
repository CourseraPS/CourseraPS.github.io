(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController )
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
      
      menu.narrowItDown = function (searchTerm) {
    
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
              menu.found = response;
            })
            .catch(function (error) {
              console.log("something is wrong");
            });
        
      };
      
     
      menu.removeItem = function (itemIndex) {
        console.log("lastRemoved: " + "Last item removed was " + menu.found[itemIndex].name);
        menu.found.splice(itemIndex, 1);
      };
      menu.checkFoundList = function () {
        return typeof menu.found !== 'undefined' && menu.found.length === 0
      };
      
    
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (response) {
            
            var foundItems = [];
            var menuItemsLength = response.data.menu_items.length;
            
            for (var i = 0; i < menuItemsLength; i++) {
                var item = response.data.menu_items[i];
                if (item.description.indexOf(searchTerm) !== -1) {
                    foundItems.push(item);
                
                }
            };
            return foundItems;
        });
      };
      service.givethevalue =function(){
          return foundItems;
      }
    }
    
    })();