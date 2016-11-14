
angular.module('metadataApp')
    .controller('UploadController', [ '$log', '$scope', 'fileReader',
        function ($log, $scope, fileReader) {
            $log.debug('UploadController', fileReader);

            /**
             * getFile
             */
            $scope.getFile = function () {
                $log.debug('getFile');
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                    .then(function(result) {
                        $scope.imageSrc = result;
                    });
            };

            $scope.$on('fileProgress', function(e, progress) {
                $log.debug('on fileProgress');
                $scope.progress = progress.loaded / progress.total;
            });
        }
    ]);