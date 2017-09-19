app.factory('locationServices', ['$http', function($http) {

        function getLocationAPI(callback) {
            return "https://servicosfiap.herokuapp.com/";
        }

        return {
            getLocationAPI:getLocationAPI
        };
    }])