var app = angular.module('ittyApp', ['ngMaterial'])

app.controller('ittyAppCtrl', ['$scope', '$http', function($scope, $http) {

  console.log('welcome to itty');

  var mailerUrl = window.location.origin + window.location.pathname + '/js/mailer.php';
  $scope.formData = {};
  $scope.submission = false;

  var param = function(data) {
    var returnString = '';
    for (d in data){
      if (data.hasOwnProperty(d))
        returnString += d + '=' + data[d] + '&';
      }
    // Remove last ampersand and return
    return returnString.slice( 0, returnString.length - 1 );
  };

  $scope.submitForm = function() {
    $http({
      method : 'POST',
      url : mailerUrl,
      data : param($scope.formData), // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data) {
      if (!data.success) {
       // if not successful, bind errors to error variables
       $scope.errorName = data.errors.name;
       $scope.errorEmail = data.errors.email;
       $scope.errorTextarea = data.errors.message;
       $scope.submissionMessage = data.messageError;
       $scope.submission = true; //shows the error message
      } else {
      // if successful, bind success message to message
       $scope.submissionMessage = data.messageSuccess;
       $scope.formData = {}; // form fields are emptied with this line
       $scope.submission = true; //shows the success message
      }
     });
   };

}]);
