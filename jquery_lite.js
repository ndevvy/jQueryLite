(function(root) {
  console.log('jquery lite running');
  var ON_READY_FUNCTIONS = [];

  var $l = root.$l = function(selector) {
    var elements;
    if (selector instanceof HTMLElement) {
      elements = [selector];
    }
    else if (typeof selector === 'function') {
      if (document.readyState !== 'complete') {
        ON_READY_FUNCTIONS.push(selector);
      }
      else {
        return selector();
      }
    }
    else {
      elements = [].slice.call(document.querySelectorAll(selector));
    }
    return new DOMNodeCollection(elements);
  };

  var DOMNodeCollection = function(nodes) {
    this.nodes = [].slice.call(nodes);
  };

  root.$l.extend = function(){
    var result = {};
    var args = [].slice.call(arguments);
    args.forEach(function(arg){
      for (var attrname in arg) {
        result[attrname] = arg[attrname];
      }
    });
    reassignArguments(arguments, result);
    return result;
  };

  root.$l.ajax = function(options){
    var defaults = {
      success: function(data) {
        console.log('success');
        console.log(data);
      },
      error: function(data) {
        console.error('an error occurred');
      },
      url: "",
      method: 'GET',
      data: '',
      contentType: 'application/x-www-form-urlencoded'
    };

    $l.extend(defaults, options);

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status < 400) {
          options.success(xmlhttp.responseText);
        }
        else {
          options.error();
        }
      }
    };
    xmlhttp.open(options.method, options.url);
    xmlhttp.send();
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

    },

    on: function(e, callback){
      this.nodes.forEach(function(node){
        node.addEventListener(e, callback);
      });
    },

    off: function(e, callback){
      this.nodes.forEach(function(node){
        node.removeEventListener(e, callback);
      });
    },

  }

  var timer = setInterval( function () {
      if ( document.readyState !== 'complete' ) return;
      clearInterval( timer );
      ON_READY_FUNCTIONS.forEach(function(f){
        return f();
      });
  }, 100 );

  var reassignArguments = function(args, result) {
    console.log('reassigning');
    args = [].slice.call(args);
    args.forEach(function(arg){
      for (var attrname in result) {
        arg[attrname] = result[attrname];
      }
    });
    return;
  };

}(this));
