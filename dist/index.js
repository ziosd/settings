'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.load=load;var _lodash=require('lodash');var _loader=require('./loader');function load(_ref){var defaults=_ref.defaults,variables=_ref.variables,separator=_ref.separator,regex=_ref.regex,buildValue=_ref.buildValue,json=_ref.json;var objectDefaults=(0,_lodash.isString)(defaults)?(0,_loader.toObject)(defaults,json):defaults;return(0,_lodash.merge)(objectDefaults,(0,_loader.build)(variables,separator,regex,buildValue))}