angular.module('bamboo', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:AppController, templateUrl:'table.html'}).
            when('/aggregations/:name', {controller:AggregationsController, templateUrl:'table.html'}).
            otherwise({redirectTo:'/'});
    });

function AppController($scope, $http)
{
    var promise = $http.get("table.html");
    promise.success(function(data){
        $scope.columns = [{name: "name"}, {name: "age"}];
        $scope.records = [{name: "Abe", age: 65}, {age: 78, name: "Peter"}];
    });
}

function AggregationsController($scope, Project) {

}