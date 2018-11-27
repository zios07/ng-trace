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
              "</br> ",
              "<center> <h1 >Historique de la demande </h1></center>",
              "</br> ",
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
              "<ul class='pagination'>",
              "<button class='btn btn-default' ng-click='previous()' ng-disabled='page == 0'>Précédent</button>",
              "<span class='trace-pagination'>{{page}}</span>",
              "<button class='btn btn-default' ng-click='next()' ng-disabled='!thereIsMoreTraces'>Suivant</button>",
              "</ul>",
              "</div>",
              "</br> "
            ].join("\n"),
            size: "lg",
            controller: function($scope) {
              $scope.page = 0;
              $scope.size = 5;
              $scope.entityId = scope.id;
              $scope.next = next;
              $scope.previous = previous;
              search();
              function previous() {
                $log.log("previous result");
                $scope.page--;
                search();
              }

              function next() {
                $log.log("next result");
                $scope.page++;
                search();
              }

              function search() {
                var URL = TraceService.getURL();
                $http
                  .get(
                    URL +
                      "/audit/demande/" +
                      scope.id +
                      "/history?page=" +
                      $scope.page +
                      "&size=" +
                      $scope.size
                  )
                  .then(
                    function(resp) {
                      $scope.data = resp.data.history;
                      $scope.thereIsMoreTraces = resp.data.thereIsMore;
                    },
                    function(error) {
                      $log.log(error);
                    }
                  );
              }
            }
          });
        }
      }
    };
    return directive;
  }
})();
