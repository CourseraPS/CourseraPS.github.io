(function(){
    angular.module("lunchbox", [])
    .controller("lunchboxcontroller", myfood);

    myfood.$inject=["$scope"];
    function myfood($scope){
        $scope.food='';
        $scope.checkfood=function(){
            
            $scope.lunchmessage=findmessage($scope.food.split(","));

            function findmessage(string){
            if(string=="")
            {
                return "Please Enter The Data First";
            }
            else{
                if(string.length<=3)
                {
                    return "Enjoy!";
                }
                else
                {
                    return "Too Much!";
                }
            }
            
            
        };
        }
    }
})();