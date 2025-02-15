angular
    .module('metadataApp')
    .factory('fileReader', ['$q', '$log',
        function ($q, $log) {
            $log.debug('fileReader factory');

            var onLoad = function (reader, deferred, scope) {
                $log.debug('onLoad');
                return function () {
                    scope.$apply(function () {
                        deferred.resolve(reader.result);
                    });
                };
            };

            var onError = function (reader, deferred, scope) {
                $log.debug('onError');
                return function () {
                    scope.$apply(function () {
                        deferred.reject(reader.result);
                    });
                };
            };

            var onProgress = function (reader, scope) {
                $log.debug('onProgress');
                return function (event) {
                    scope.$broadcast('fileProgress',
                        {
                            total: event.total,
                            loaded: event.loaded
                        });
                };
            };

            var getReader = function (deferred, scope) {
                $log.debug('getReader');
                var reader = new FileReader();
                reader.onload = onLoad(reader, deferred, scope);
                reader.onerror = onError(reader, deferred, scope);
                reader.onprogress = onProgress(reader, scope);
                return reader;
            };

            var readAsDataURL = function (file, scope) {
                $log.debug('readAsDataURL');
                var deferred = $q.defer();

                var reader = getReader(deferred, scope);
                reader.readAsDataURL(file);

                return deferred.promise;
            };

            return {
                readAsDataUrl: readAsDataURL
            };
        }]

    );