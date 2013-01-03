angular.module('bamboo', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:AppController, templateUrl:'table.html'}).
            when('/:id', {controller:AppController, templateUrl:'table.html'}).
            otherwise({redirectTo:'/'});
    });

function AppController($scope, $routeParams, $http)
{
    var url = "json/eaa43ef6baa54af4948303fd093d9756.json";
    // check if an id was passed in
    $scope.has_aggregation = false;
    if($routeParams.id)
    {
        $scope.has_aggregation = true;
        url = "json/" + $routeParams.id + ".json";
    }
    var promise = $http.get(url);
    promise.success(function(data){
        $scope.columns = [];
        // @todo: hack - columns should come from dataset info
        angular.forEach(data[0], function(val, key){
            $scope.columns.push(key);
        })
        $scope.records = data;
    });
}

function AggregationsController($scope, $http) {
    var promise = $http.get("json/aggregations.json");
    promise.success(function(data){
        $scope.aggregations = [];
        angular.forEach(data, function(val, key){
            key = key==""?"un-grouped":key;
            var aggreagte = {name: key, id: val};
            $scope.aggregations.push(aggreagte);
        });
    });
}