var poolerApp = angular.module('poolerApp', []);
 
poolerApp.controller('homeCtrl', ['$scope','$http','$filter',function ($scope,$http,$filter) {
  $http.get('/occasion').
    success(function(data) {
      $scope.occasions = data;
    });  
  $scope.deleteOccasion=function(occasion,$event){
    $http.delete('/occasion/'+occasion._id).
      success(function(data) {
        $scope.success = "Occasion Deleted";
        var index=$scope.occasions.indexOf(occasion)
        $scope.occasions.splice(index,1);   
      });
      return;
  }
  $scope.addOccasion=function(occasion,$event){
    $http.post('/occasion',$scope.occasion).
      success(function(data) {
        $scope.success = "Occasion Added";
        $scope.occasions = $scope.occasions||[];
        $scope.newOccasion = false;
        $scope.occasions.push(data);
      });
    return false;
  }
  $scope.updateOccasion=function(occasion,$event){
    occasion.payees =  occasion.payees||[];
    var newPayees =  $filter('filter')(occasion.addPayeeList, {}, function(actual,expected){
      if(actual===expected){
        return false;
      }
      return true;
    })
    if(newPayees){
      occasion.payees = occasion.payees.concat(newPayees);
    }
    
    occasion.payers = occasion.payers||[];
    var newPayers = $filter('filter')(occasion.addPayerList, {}, function(actual,expected){
      if(actual===expected){
        return false;
      }
      return true;
    });
    if(newPayers){
      occasion.payers=occasion.payers.concat(newPayers);
    }
    delete occasion.addPayeeList;
    delete occasion.addPayerList;
    $http.put('/occasion',occasion).
      success(function(data) {
        $scope.success = "Occasion Updated";
        occasion = data;  
      });
    return false;
  }  
  $scope.addPayer = function(occasion){
    occasion.addPayerList=occasion.addPayerList||[];
    occasion.addPayerList.push({});
  } 
  $scope.addPayee = function(occasion){
    occasion.addPayeeList=occasion.addPayeeList||[];
    occasion.addPayeeList.push({});
  }
  $scope.showDetail = function(occasion){
    if(occasion.addPayeeList||occasion.addPayerList||occasion.payees||occasion.payers){
				return true;		
		}
		return false;
  }		  
  return; 
}]);
