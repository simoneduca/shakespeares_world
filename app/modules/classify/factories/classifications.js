(function (angular, _, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('ClassificationsFactory', [
        '$q',
        '$window',
        'AnnotationsFactory',
        'ProjectFactory',
        'SubjectsFactory',
        function ($q, $window, Annotations, Project, Subjects) {

            var submit = function () {

                var newClassification = { links: {} };

                var deferred = $q.defer();

                Project()
                    .then(function (project) {
                        newClassification.links.project = project.id;
                        newClassification.links.workflow = project.links.workflows[0];
                    })
                    .then(Subjects.get)
                    .then(function (subject) {
                        newClassification.links.subjects = [subject.id];
                    })
                    .then(function () {
                        console.log(newClassification);
                        deferred.resolve(newClassification);
                    });






                return deferred.promise;






            };



            return {
                submit: submit
            }

        }
    ]);

}(window.angular, window._, window.zooAPI));
