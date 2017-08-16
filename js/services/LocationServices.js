app.factory('locationServices', ['$http', function($http) {

        function getLocationAPI(callback) {
            return "https://notepadsaasmomberg.herokuapp.com";
        }

        return {
            getLocationAPI:getLocationAPI
        };
    }])