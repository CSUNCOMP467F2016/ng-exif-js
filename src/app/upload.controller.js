
angular.module('metadataApp')
    .controller('UploadController', [ '$log', '$scope', 'fileReader',
        function ($log, $scope, fileReader) {
            console.log(fileReader);
            $log.debug(fileReader);
            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                    .then(function(result) {
                        $scope.imageSrc = result;
                    });
            };

            $scope.$on("fileProgress", function(e, progress) {
                $scope.progress = progress.loaded / progress.total;
            });
        }
    ]);