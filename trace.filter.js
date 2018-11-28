(function() {
  angular.module('trace').filter("format", function() {
    return function(n) {
      return n.replace(/_/g,' ');
    };
  });
})();
