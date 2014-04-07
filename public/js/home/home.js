var poolerApp = angular.module('poolerApp', []);
 
poolerApp.controller('homeCtrl', ['$scope','$http',function ($scope,$http) {
  $http.get('/occasion').
        success(function(data) {
            $scope.occasions = data;
        });  
  $scope.deleteOccasion=function(occasion,$event){
    //$event.srcElement.parentElement.remove()
    $http.delete('/occasion/'+occasion._id).
        success(function(data) {
            $scope.success = "Occasion Deleted";
            var index=$scope.occasions.indexOf(occasion)
            $scope.occasions.splice(index,1);   
        });
  }
  $scope.saveOccasion=function(occasion,$event){
    //$event.srcElement.parentElement.remove()
    $http.delete('/occasion/'+occasion._id).
        success(function(data) {
            $scope.success = "Occasion Deleted";
            var index=$scope.occasions.indexOf(occasion)
            $scope.occasions.splice(index,1);   
        });
  }  
}]);
