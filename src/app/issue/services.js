angular.module('githubApp.services', []).factory('githubService', function($q) {

    var authorizationResult = false;
	var queryBaseUrl = '/search/issues?q=author:rebornix';

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('KBb1ZYeS-bTFa-tZIJEG-kKamc8', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('github');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectGithub: function() {
            var deferred = $q.defer();
            OAuth.popup('github', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }	
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('github');
            authorizationResult = false;
        },
		getIssues: function (order, state) {
            var deferred = $q.defer();
			var url = queryBaseUrl;
			if ( state !== undefined ){
				url += '+state:' + state;
			}
			if ( order === 'asc' ) {
				url += '&sort=created&order=asc';
			}
            var promise = authorizationResult.get(url).done(function(data) { 
                deferred.resolve(data.items)
            });
            return deferred.promise;
		}
    }
    
});