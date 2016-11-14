angular.module('metadataApp')
    .directive('ngFileSelect', ['$log', function ($log) {
        $log.debug('ngFileSelect');
        return {
            link: function ($scope, el) {
                el.bind('change', function (e) {
                    debugger;
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile();
                });
            }

        };
    }]);
