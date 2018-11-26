(function() {
  angular.module("trace").directive("trace", TraceDirective);

  TraceDirective.$inject = ["$log", "$http", "$uibModal", "TraceService"];

  function TraceDirective($log, $http, $uibModal, TraceService) {
    var directive = {
      restrict: "E",
      template:
        '<button class="history-btn btn btn-default" ng-click="openPopup()">History</button>',
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
            template: [
              '<table class="table table-striped">',
              "<tr>",
              "<th>Numero de demande</th>",
              "<th>Statut demande</th>",
              "<th>Date changement</th>",
              "<th>Utilisateur</th>",
              "<th>Unité organisationnelle</th>",
              "</tr>",
              '<tr ng-repeat="history in data track by $index">',
              "<td>{{entityId}}</td>",
              "<td>{{history.snapshot.state.statutActuel}}</td>",
              "<td>{{history.snapshot.commitMetadata.commitDate | date : 'dd/MM/yyyy HH:mm:ss'}}</td>",
              "<td>{{history.snapshot.commitMetadata.author}}</td>",
              "<td>{{history.uorgActuelle}}</td>",
              "</tr>",
              "</table>"
            ].join("\n"),
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
          return TraceService.getSnapshots(id);
        }
      }
    };
    return directive;
  }
})();
