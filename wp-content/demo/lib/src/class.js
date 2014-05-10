/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, 
      fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // 创建基类(不做任何处理)
  // 基类构造函数
  // 这里的this是window，所以这整段代码就向外界开辟了一扇窗户 - window.Class
  this.Class = function(){};
 
  // 从这个class创建一个新类 Class
  Class.extend = function(prop) {
    var _super = this.prototype;
    // 通过将子类的原型指向父类的一个实例对象来完成继承
    // - 注意：this是基类构造函数（即是Class）
    // 实例化 base class (但仅仅创建实例,不执行init构造函数)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // 拷贝属性到新的原型上
    for (var name in prop) {
      // 检查是否需要重写已存在的function
      // 如果prop和父类中存在同名的函数，并且此函数中使用了_super方法，则对此方法进行特殊处理 - fn
      // 否则将此方法prop[name]直接赋值给子类的原型
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // 在超类上添加一个同样的 ._super() 方法
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            //这个方法仅需要临时执行，所以当执行完毕我们需要删除它
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // 复制的 class constructor
    function Class() {
      // 所有的构造函数实际已经在init 中执行了
      // 在类的实例化时，调用原型方法init
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    // 子类的prototype指向父类的实例（完成继承的关键）
    Class.prototype = prototype;
   
    // 让这个构造函数指向我们所期望的

    Class.prototype.constructor = Class;

    // 让这个class可扩展
    // 子类自动获取extend方法，arguments.callee指向当前正在执行的函数
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
