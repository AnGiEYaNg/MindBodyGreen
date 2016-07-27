'use strict';
var app = angular.module('MindBodyGreenApp', ['ui.router']);

app.config(function($stateProvider){
	$stateProvider
	.state('home', {
		url: '',
		templateUrl: 'home.html'
	})
	.state('article', {
		url:'/article/:articleId',
		templateUrl: 'article.html',
		controller: 'ArticleCtrl'
	})
})


app.controller('MainCtrl', function($scope, MainFact){
	MainFact.getData().then(function(res){
		$scope.mainData = res;
	});
})

app.controller('ArticleCtrl', function($scope, $stateParams, $sce, MainFact){
	$scope.articleId = $stateParams.articleId*1;
	$scope.articleObj = MainFact.data[$stateParams.articleId];
	$scope.articleContent = $sce.trustAsHtml($scope.articleObj.body);
	$scope.saveTitle = function(newTitle){
		$scope.edit = false;
		MainFact.data[$scope.articleId].title = newTitle;
	}
})


app.factory('MainFact', function($http){
	var MainFact = {};
	MainFact.getData = function(){
		return $http.get('https://s3.amazonaws.com/mbgd/feed/prod-test-7fc12640-6f09-4461-b683-3e55acdfd4f4.json')
			.then(function(res){
				MainFact.data = res.data;
				console.log('get data', res.data)
				return MainFact.data;
			})
	}
	return MainFact;
})