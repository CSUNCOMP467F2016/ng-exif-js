
angular.module('metadataApp')
    .controller('UploadController', [ '$log', '$scope', 'fileReader', 'exifService', '$sce',
        function ($log, $scope, fileReader, exifService, $sce) {
            $log.debug('UploadController', fileReader);


            /** register service */
            $scope.getData = function(event) {
                exifService.getData(event.currentTarget, function() {
                        debugger;
                        $log.debug(exifService.pretty(event.currentTarget));
                        $scope.imageMetadata = $sce.trustAsHtml(exifService.pretty(event.currentTarget).replace(/(?:\r\n|\r|\n)/g, '<br />'));
                    }

                );
            }

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