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
			'</br> ',
              '<center> <h1 >Historique de la demande </h1></center>',
			  	'</br> ',
				'<div style ="margin-left: 30px;">',
              '<table style ="width: 94% !important;" class="table table-striped">',
              "<tr>",
              "<th>ID</th>",
              "<th>Statut de la demande</th>",
              "<th>Date de changement</th>",
              "<th>Utilisateur</th>",
              "<th>Org unit</th>",
              "</tr>",
              '<tr ng-repeat="history in data track by $index">',
              "<td><center>{{entityId}}</center></td>",
              "<td><center>{{history.snapshot.state.statutActuel}}</center></td>",
              "<td><center>{{history.snapshot.commitMetadata.commitDate | date : 'dd/MM/yyyy HH:mm:ss'}}</center></td>",
              "<td><center>{{history.snapshot.commitMetadata.author}}</center></td>",
              "<td><center>{{history.uorgActuelle}}</center></td>",
              "</tr>",
              "</table>",
			  '</div>',
			  	'</br> '
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
          var URL = TraceService.getURL();
          return $http.get(URL + "/audit/demande/" + id + "/history"
          );
          return TraceService.getSnapshots(id);
        }
      }
    };
    return directive;
  }
})();
