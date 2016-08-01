var app = angular.module('myApp', []);
app.controller("myCtrl", function($scope,$http){
    $scope.msg = "RS";
    $scope.email = "";
    $scope.pwd = "";
    $scope.loginEnabled = false;
    $scope.loginHide = false;
    
    $scope.questionCount = 0;
    
    $scope.radioValue = "";
    $scope.incorrectLogin = "";
    $scope.answersArray = [];
    
    $scope.warningStyle = {
        "color" : "red",
        "font-size" : "10px"        
    };
    
    $scope.verified = false;
    $scope.register = function()
    {
        $scope.loginEnabled = true;
    };
    
    $scope.verifyLogin = function()
    {
        if($scope.myemail === $scope.remail && $scope.mypwd === $scope.rpwd)
        {            
            $scope.verified = true;
        }
        else
        {
            if($scope.myemail !== $scope.remail && $scope.mypwd !== $scope.rpwd)
            {            
                $scope.incorrectLogin = "*Incorrect email & password";                
            }
            else if($scope.myemail !== $scope.remail)
            {
                $scope.incorrectLogin = "*Incorrect Email";
            }
            else
            {
                $scope.incorrectLogin = "*Incorrect Password";
            }
        }
    };
    
    $scope.nextQuestion = function()
    {
        $scope.answersArray.push(this.radioValue);
        $scope.questionCount++;
        this.radioValue = "";
        
    };
    
   
    
    
    $http.get("json/question.json").success(function(data)
    {
            var arr = [];
            arr = JSON.parse(JSON.stringify(data));
            $scope.questionSet = arr;
            var myObject = $scope.questionSet;
             
            $scope.countQuestion = Object.keys(myObject).length;;
            console.log("$scope.countQuestion = "+$scope.countQuestion); 
            
    });
    
    $scope.evaluation = function()
    {
        var correctCount = 0;
        console.log("$scope.countQuestion = "+$scope.countQuestion); 
        for(var i=0; i< $scope.countQuestion ; i++)
        {
            if($scope.answersArray[i] === $scope.questionSet[i].answer)
            {
                correctCount++;
            }
        }
        console.log("correctCount = "+correctCount);
        console.log("i = "+i);
        
        var percent = (correctCount/i)*100;
        $scope.percent = percent.toFixed(2);
        console.log("percent = "+percent.toFixed(2)+"%");
        
    };
    
});


