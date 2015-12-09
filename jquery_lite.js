(function(root) {
  console.log('jquery lite running');

  var $l = root.$l = function(selector) {
    var elements;
    if (selector instanceof HTMLElement) {
      elements = [selector];
    }
    else {
      elements = [].slice.call(document.querySelectorAll(selector));
    }
    return new DOMNodeCollection(elements);
  };

  var DOMNodeCollection = function(nodes) {
    this.nodes = [].slice.call(nodes);
  };

  DOMNodeCollection.prototype = {
    html: function(content) {
      if (typeof content !== 'undefined') {
        this.nodes.forEach(function(element) {
          element.innerHTML = content;
        });
      }
      else {
        return this.nodes[0].innerHTML;
      }
    },

    empty: function() {
      this.nodes.forEach(function(element){
        element.innerHTML = "";
      });
    },

    append: function(content) {
      var that = this;
      if (typeof content === 'string') {
        that.nodes[0].innerHTML += content;
      }
      else if (content instanceof DOMNodeCollection) {
        content.elements.forEach(function(element) {
          $l(that.nodes[0]).append(element);
        });
      }
      else if (content instanceof HTMLElement) {
        that.nodes[0].appendChild(content);
      }
    },

    children: function() {
      var chillens = [];
      this.nodes.forEach(function(node){
        [].slice.call(node.children).forEach(function(child){
          chillens.push(child);
        });
      });
      return new DOMNodeCollection(chillens);
    },

    parent: function() {
      var parents = [];
      this.nodes.forEach(function(node){
        parents.push(node.parentNode);
      });
      return new DOMNodeCollection(parents);
    },

    find: function(selector) {
      var results = [];
      this.nodes.forEach(function(node){
        var subResults = [].slice.call(node.querySelectorAll(selector));
        subResults.forEach(function(result){
          results.push(result);
        });
      });
      return new DOMNodeCollection(results);
    },

    remove: function() {
      this.nodes.forEach(function(node){
        node.parentNode.removeChild(node);
      });
    },

    attr: function() {

    },

    addClass: function() {

    },

    removeClass: function() {

    }

  }

}(this));
