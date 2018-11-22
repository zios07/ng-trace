(function() {
  angular.module("trace").directive("trace", TraceDirective);

  TraceDirective.$inject = ["$log", "$http", "$uibModal"];

  function TraceDirective($log, $http, $uibModal) {
    var directive = {
      restrict: "E",
      templateUrl: "app/directives/trace.template.html",
      scope: {
        className: "=",
        id: "="
      },
      link: function(scope) {
        scope.openPopup = openPopup;

        function openPopup(type) {
          scope.requestType = type;
          $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title-top",
            ariaDescribedBy: "modal-body-top",
            templateUrl: "app/directives/modal.template.html",
            size: "lg",
            controller: function($scope) {
              $scope.entityId = scope.id;
              loadSnapshots(scope.id).then(
                function(resp) {
                  $scope.data = resp.data;
                },
                function(error) {
                  $log.log(error);
                }
              );
            }
          });
        }

        function loadSnapshots(id) {
          return $http.get(
            "http://localhost:8765/sgvapi/audit/demande/" + id + "/history"
          );
        }
      }
    };
    return directive;
  }
})();
