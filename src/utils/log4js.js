let log4js=require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: {
      type: 'pattern',
      pattern: '%d %[%p%] %f{1} %[%c%] %m'
    }}
  },
  categories: { default: { appenders: ['out'], level: 'info', enableCallStack: true } }
});

let Logger=function(){
  var logger = log4js.getLogger();
  logger.level = "debug";
  return logger;
}

module.exports={
  Logger
}
