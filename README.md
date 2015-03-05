#JQuery plugin boilerplate

Basic boilerplate for JQuery plugin. Incapsulates all  members  inside  private
namespace. Once instantiated plugin stores its  instance  in  element's  `data`
using key from `$.plugin.className` and  could be retrieved easily.

##Plugin creation and external interface

###Instantiation
If `$(selector)` returns more than one element plugin will be  instatiated  for
each member of result array and attached to corresponding element.
`$(selector).plugin(options);`

###Options setting
If `$(selector)` returns more than one element option  will  be  set  for  each
plugin instance.
`$(selector).plugin('option', 'optionName', 'newOptionValue');`

###Options retrieving
If `$(selector)` returns only one element result will be value of option. If it
returns more than one element result will be `Array` of option values from each
plugin instance.
`$(selector).plugin('option', 'optionName');`

###Plugin instance retrieving
If `$(selector)` returns only one element result will be `Object` - instance of
plugin. If it  returns  more  than  one  element  result  will  be  `Array`  or
instances.
`$(selector).plugin('instance');`

###Double binding preventing
Plugin  stores  elements  to  which   it   is   bound   into   'static'   array
`$.plugin.bound`. It allows to avoid double plugin instantiation  on  the  same
element.


##Plugin fields
- `self` - reference to plugin's instance. Used instead of  `this`  to  resolve
ambiguility.
- `element` - reference to DOM node to which plugin is bound.
- `$element` - JQuery element to which plugin is bound.


##Plugin methods
- `init` - initialize plugin state. Should be called only once.
- `el` - shortcut for `$(selector, self.$element).find()` to  easily  searching
elemets under plugin's markup.
- `bind` - perform binding of handlers to events. If  you'd  like  to  make  it
re-runnable (what is usually not required) will be  a  good  practice  to  bind
like:```
self.$element
        .off('#some.selector', self._handler)
        .on('#some.selector', self._handler);
```
But  more  much  better   is   just   put   `self.$element.on('#some.selector',
self._handler);` it will bind any dynamic elements which could  appears  inside
plugin's markup after binding.

- `refresh` - Method aimed to prepare plugin with all options  set  to  working
state. It is aimed to be re-runnable and should be called  (manually)  if  user
chages  any option which colud affects plugin behaviour.
