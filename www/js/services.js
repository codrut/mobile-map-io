angular.module('services', [])

.factory('API', function ($q, $http) {
    var deferred = $q.defer();
    var api = 'http://andyhub.com/demos/mobile-map-io/api/';

    return {
        getReports: function () {
            return $http.get(api + 'reports');
        },
        getReport: function (id) {
            return $http.get(api + 'reports/' + id);
        },
        addReport: function (reportJson) {
            return $http({
                url: api + 'reports',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {"reportJson": reportJson}
            });
        },
        updateReport: function (id, reportJson) {
            return $http({
                url: api + 'reports/' + id,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {"reportJson": reportJson}
            });
        },
        deleteReport: function (id) {
            return $http({
                url: api + 'reports/' + id,
                method: 'DELETE'
            });
        },
        getReportsInBounds: function (bounds) {
            if (undefined === bounds) {
                var neLat = 0;
                var neLng = 0;
                var swLat = 0;
                var swLng = 0;
            } else {
                var neLat = bounds.getNorthEast().lat();
                var neLng = bounds.getNorthEast().lng();
                var swLat = bounds.getSouthWest().lat();
                var swLng = bounds.getSouthWest().lng();
            }
            var lat = (neLat + swLat) / 2;
            var lng = (neLng + swLng) / 2;
            var rand = Math.random()/100;
            var report = {
                latitude: lat + rand,
                longitude: lng + rand,
                title: rand.toString(),
                id: Math.floor(rand*10000)
            };
            deferred.resolve(report);
            return deferred.promise;
        }
    };
});
