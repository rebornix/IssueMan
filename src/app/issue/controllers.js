//inject the githubService into the controller
app.controller('GithubController', function($scope, $q, githubService) {

    $scope.issues; //array of issues
    $scope.SearchOption;
	
    githubService.initialize();

    $scope.refreshTimeline = function(searchOption) {
		searchOption = searchOption || $scope.SearchOption;
		if(searchOption === 'Latest') {
			githubService.getIssues('desc').then(function(data) {
				$scope.issues = data;
			});
		}
		else if (searchOption === 'Oldest') {
			githubService.getIssues('asc').then(function(data) {
				$scope.issues = data;
			});
		}
		else if (searchOption === 'Open') {
			githubService.getIssues('desc', 'open').then(function(data) {
				$scope.issues = data;
			});
		}
    }
	

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        githubService.connectGithub().then(function() {
            if (githubService.isReady()) {
                //if the authorization is successful, hide the connect button and display the issues
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut, #selectSearchOption').fadeIn();
					$scope.SearchOption = "Latest";
                    $scope.refreshTimeline($scope.SearchOption);
                });
            }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        githubService.clearCache();
		if($scope.issues !== undefined) {
		    $scope.issues.length = 0;
		}

        $('#getTimelineButton, #signOut, #selectSearchOption').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    }

    //if the user is a returning user, hide the sign in button and display the issues
    if (githubService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut, #selectSearchOption').show();
		$scope.SearchOption = "Latest";
    }
	
	$scope.$watch('SearchOption', function(searchOption){
		$scope.refreshTimeline(searchOption);
	});

});