var myApp = angular.module("MyApp", ["ngRoute", "LocalStorageModule"]);

myApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", { templateUrl: 'templs/home.html', controller: 'MyCtrl', title: "Home" })
    .when("/home", { templateUrl: 'templs/home.html', controller: 'MyCtrl', title: "Home" })
    .when("/login", { templateUrl: 'templs/login.html', controller: 'LoginCtrl', title: "Login" })
    .when("/Users", { templateUrl: 'templs/users.html', controller: 'UsersCtrl', title: "Users" })
    .when("/details/:userid/:userName", { templateUrl: 'templs/userdetails.html', controller: 'DetailsCtrl', title: "User Details" })
    .otherwise('/');
}]);


myApp.controller("MyCtrl", function ($scope) {
    //$scope.mymsg = "Message From Controller";
    //$scope.Check = function () {
    //    alert("success");
    //};
    
});

myApp.controller("LoginCtrl", function ($scope, $location) {
    $scope.newmsg = "Login Test";
    $scope.username = "admin"; $scope.password = "1234";
    $scope.Login = function () {
        if ($scope.username == "admin" && $scope.password == "1234") {
            //alert("Login Success");
            $location.path('/Users');
        }
        else {
            alert("Login Failed");
        }
    };
});

myApp.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.mytitle = current.$$route.title;
    });
}]);

myApp.controller("UsersCtrl", function ($scope, localStorageService) {
    
    //var users = [{ id: 1, Name: "Prasad" }, { id: 2, Name: "Harsha" }, { id: 3, Name: "Sateesh" }, { id: 4, Name: "Vardhan" }];
    //$scope.AllUsers = users;

    //$scope.SaveData = function () {
    //    var userdata = { 'id': $scope.id, 'Name': $scope.name };
    //    $scope.AllUsers.push(userdata);
    //    $scope.id = '';
    //    $scope.name = '';
    //};

    $scope.init = function () {
        if (!localStorageService.get("MyTaskData")) {
            $scope.AllUsers = [
                         { id: 1, Name: "Prasad" }, { id: 2, Name: "Harsha" }, { id: 3, Name: "Sateesh" }, { id: 4, Name: "Vardhan" }
            ];
        }
        else {
            $scope.AllUsers = localStorageService.get("MyTaskData");
        }
    };


    $scope.SaveData = function () {
        $scope.AllUsers.push({ id: $scope.id, Name: $scope.name });
        $scope.id = '';
        $scope.name = '';
    };

    $scope.deleteUser = function (item) {
        var index = $scope.AllUsers.indexOf(item);
        $scope.AllUsers.splice(index, 1);
    };


    $scope.$watch("AllUsers", function (newVal, oldVal) {
        if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
            localStorageService.add("MyTaskData", angular.toJson(newVal));
        }
    }, true);

});

myApp.controller("DetailsCtrl", function ($scope, $routeParams) {
    $scope.detailsUserId = $routeParams.userid;
    $scope.userName = $routeParams.userName;
});