(function(){

    angular.module('trace')
    .provider('TraceService', TraceServiceProvider);

    function TraceServiceProvider(){    

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
        
        function TraceService() {
            var service = {
                getURL: getURL
            };

            return service;
            
            function getURL(){
                return baseUrl;
            }

        }
    }
    

})();
