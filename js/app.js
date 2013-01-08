angular.module('bamboo', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:AppController, templateUrl:'table.html'}).
            when('/:id', {controller:AppController, templateUrl:'table.html'}).
            otherwise({redirectTo:'/'});
    });

function AppController($scope, $routeParams)
{
    var dataset_id = $routeParams.id?$routeParams.id:bamboo_dataset_id;

    var dataset = new bamboo.Dataset({id: dataset_id});
    dataset.query_dataset();
    // @todo: hack - columns should come from dataset info
    $scope.columns=[];
    angular.forEach(dataset.data[0], function(val, key){
        $scope.columns.push(key);
    })
    $scope.records = dataset.data;
}

function AggregationsController($scope, $http) {
    var dataset_id = bamboo_dataset_id;
    var dataset = new bamboo.Dataset({id: dataset_id});
    dataset.query_aggregations();

    $scope.aggregations = [];
    angular.forEach(dataset.aggregations, function(val, key){
        key = key==""?"un-grouped":key;
        var aggreagte = {name: key, id: val};
        $scope.aggregations.push(aggreagte);
    });
}