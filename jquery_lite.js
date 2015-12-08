(function(root) {
  console.log('jquery lite running');

  var $l = root.$l = function(selector) {
    var elements;
    if (selector instanceof HTMLElement) {
      elements = [HTMLElement];
    } else
    { elements = [].slice.call(document.querySelectorAll(selector)); }
    return new DOMNodeCollection(elements)
  };

  var DOMNodeCollection = function(elements) {
    this.elements = elements;
    return this;
  };
  
  DOMNodeCollection.prototype = {
    html: function(content) {
      if (typeof content !== 'undefined') {
        this.elements.forEach(function(element) {
          element.innerHTML = content;
        });
      } else {return this.elements[0].innerHTML;}
    }
  }


}(this));
