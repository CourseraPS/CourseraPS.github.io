var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  (function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController )
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
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