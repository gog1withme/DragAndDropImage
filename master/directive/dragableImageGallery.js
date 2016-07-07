app.directive('imgGallery', function () {
    return {
        templateUrl: 'directive/gallery.html',
        restrict: 'E',
        controller: ['$scope', function ($scope) {            
            $scope.imgUrlObj = [];
            $scope.imgId = 0;
            $scope.imgUrl = "";
            $scope.$on('addImage', function (event, imgUrl) {
                if (imgUrl) {
                    console.log(imgUrl);                   
                    $scope.imgUrl = imgUrl;
                    $scope.$apply();
                }
            });


            
            $scope.sendToServer = function () {
                //Write your code here to send imgae to server.
                alert("alert from drag and directive imgUrl: " + $scope.imgUrl);
            }
        }]
    }
});


app.directive('fileDropzone', function () {
   
    return {
        restrict: 'A',
        scope: {
            file: '=',
            fileName: '='
        },
        link: function (scope, element, attrs) {
            debugger;
            var checkSize,
                isTypeValid,
                processDragOverOrEnter,
                validMimeTypes;

            processDragOverOrEnter = function (event) {
                if (event != null) {
                    event.preventDefault();
                }
                event.dataTransfer.effectAllowed = 'copy';
                return false;
            };

            validMimeTypes = attrs.fileDropzone;

            checkSize = function (size) {
                var _ref;
                if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                    return true;
                } else {
                    alert("File must be smaller than " + attrs.maxFileSize + " MB");
                    return false;
                }
            };

            isTypeValid = function (type) {
                if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                    return false;
                }
            };

            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);

            return element.bind('drop', function (event) {
                var file, name, reader, size, type;
                if (event != null) {
                    event.preventDefault();
                }
                reader = new FileReader();
                reader.onload = function (evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function () {
                            scope.file = evt.target.result;
                            if (angular.isString(scope.fileName)) {
                                return scope.fileName = name;
                            }
                        });
                    }
                };
                file = event.dataTransfer.files[0];
                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
                console.log("drag over : file", reader);
                return false;
            });
        }
    };
})


.directive("fileread", [function () {
   
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            debugger;
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                debugger;
                var imgUrl = "";                
                reader.addEventListener("load", function () {                  
                    imgUrl = this.result;                    
                    scope.$emit('addImage', imgUrl);
                }, false);
                
                reader.readAsDataURL(changeEvent.target.files[0]);
                return false;
            });
        }
    }
}]);

