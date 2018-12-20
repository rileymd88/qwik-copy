
export default ['$scope', '$element', function ($scope, $element) {
    
    // Function that waits for Listbox-containers - IE11 display bug
    function waitForElementToDisplay(selector, time, type) {
        if (document.querySelector(selector) != null) {
            if ($scope.span) {
                var popover = document.querySelector(".lui-list.ng-scope");
                var liCheck = document.querySelector("#qwik-copy-li");
                if (!liCheck) {
                    var li = document.createElement("div");
                    li.innerHTML = '<li id="qwik-copy-li" class="lui-list__item lui-list__action" ng-class="{ "lui-disabled": item.disabled, "qv-contextmenu-has-submenu": item.hasSubmenu(), "has-icon": item.hasIcon() }" qva-focus="item.autoFocus" qva-activate="item.disabled || selectItem($event,item)" tcl="context-menu-item" tabindex="-1"> <i class="lui-list__aside  item-icon  lui-icon  lui-icon--copy" ></i> <span class="lui-list__text ng-binding" title="Copy">Copy Cell</span> <i></i> </li>';
                    popover.append(li);
                    document.querySelector("#qwik-copy-li").addEventListener("click", function () {
                        console.log('click');
                        var textArea = document.createElement("textarea");
                        if (type == 'table') {
                            textArea.value = $scope.span.innerHTML;
                        }
                        else {
                            textArea.value = $scope.span.textContent;
                        }
                        document.querySelector('body').append(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        textArea.remove();
                        document.querySelector("#qwik-copy-li").remove();
                        document.querySelector(".qv-contextmenu.ng-scope").remove();
                    });
                }

            }
            return;
        }
        else {
            setTimeout(function () {
                waitForElementToDisplay(selector, time);
            }, time);
        }
    }

    document.addEventListener('contextmenu', function (e) {
        var el = document.querySelector(":focus");
        var sel = el.querySelector(".qv-st-value");
        var selList = el.querySelector(".qv-listbox-text");
        if (sel) {
            $scope.span = sel.querySelector("span");
            waitForElementToDisplay(".lui-list.ng-scope", 50, 'table');
        }
        if (selList) {
            $scope.span = selList.querySelector("span");
            waitForElementToDisplay(".lui-list.ng-scope", 50, 'listbox');
        }

    }, false);

    $scope.$watch('layout.prop.hideElement', function () {
        var x = document.querySelector("#qwik-copy-div");
        if ($scope.layout.prop.hideElement) {
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }
        else {
            if (x.style.display === "block") {
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        }
    })
}]