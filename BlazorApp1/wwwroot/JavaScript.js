

function cloneelement(sourceElementID) {
    var helperElement = document.getElementsByClassName("e-cloneproperties e-draganddrop e-grid")[0];
    if (helperElement != null) {
        helperElement.addEventListener("mousemove", function (event) {
            var N = getProperTargetElement(event, helperElement);
            var dropElement = parentsUntil(N, 'e-grid');
            var sourceElement = document.getElementById(sourceElementID);
            if (sourceElement && !dropElement.id.includes("sftreegrid") && dropElement.classList.contains('e-grid')) {
                var startedRow = targetRow = N.closest("tr");
                var dropInstance = dropElement.blazor__instance;
                var sourceInstance = sourceElement.blazor__instance;
                dropInstance.options.rowDropTarget = sourceElement?.id;
                sourceInstance.options.rowDropTarget = dropElement.id;
                dropInstance.rowDragAndDropModule.destinationGrid = dropInstance;
                dropInstance.rowDragAndDropModule.istargetGrid = true;
                removeBorder();
            }
        });
        helperElement.removeEventListener("mousemove", function (event) {
        });
    }
}

function removeBorder() {
    
    removeClassFromElements("e-dragborder");
    removeClassFromElements("e-firstrow-dragborder");
}

function removeClassFromElements(className) {
    var elements = document.querySelectorAll("." + className);
  
    elements.forEach(function (element) {
        element.classList.remove(className);
    });
}
getProperTargetElement = function (e, helperElement) {
    var M, t = getCoordinates(e), i = helperElement.style.pointerEvents || "", n = -1 !== e.type.indexOf("pointer") && "safari" === window.browserDetails.info.name && parseInt(window.browserDetails.info.version) > 12;
    return y(e.target, helperElement) || -1 !== e.type.indexOf("touch") || n ? (helperElement.style.pointerEvents = "none",
        M = document.elementFromPoint(t.clientX, t.clientY - 10),
        helperElement.style.pointerEvents = i) : M = e.target,
        M
}

getCoordinates = function (e) {
    return e.type.indexOf("touch") > -1 ? e.changedTouches[0] : e
}

function y(e, M) {
    return e === M || !(e === document || !e) && y(e.parentNode, M)
}
function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}






