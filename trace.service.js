(function(){

    angular.module('trace')
    .provider('TraceService', TraceServiceProvider);

    function TraceServiceProvider(){    

        TraceService.$inject = ['$http'];

        var baseUrl = '';
        var provider = {
            setBaseUrl : setBaseUrl,
            getBaseUrl : getBaseUrl,
            $get: TraceService
        };

        
        return provider;

        
        function setBaseUrl(url){
            baseUrl = url;
        }

        function getBaseUrl(){
            return baseUrl;
        }
        
        function TraceService($http) {
            var service = {
                getURL: getURL,
                getSnapshots: getSnapshots,
                searchTrace: searchTrace
            };

            return service;
            
            function getURL(){
                return baseUrl;
            }

            function getSnapshots(id) {
                return $http.get(baseUrl + "/audit/demande/" + id + "/history");
            }

            function searchTrace(dto) {
                return $http.post(baseUrl + "/audit/demande/search", dto);
            }
        }
    }
    

})();
