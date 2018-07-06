var CodePrinter = new function() {

	this.printAndRun = function(func){
      var scriptTag = document.scripts[document.scripts.length - 1];
      var parentTag = scriptTag.parentNode;
      var entire = func.toString();
      var element = document.createElement('pre');
      element.innerHTML = "<code>" + entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("CodePrinter")) + "</code>";
      scriptTag.parentNode.insertBefore(element,scriptTag);
      hljs.initHighlightingOnLoad();
      func();
    }

    return this;
}