const Scheduler = require('./lib/scheduler');

let scheduleHandler = new Scheduler();


var result = scheduleHandler.scheduleAt(new Date('11:20:00'));   //TRUE

console.log('Se programa fecha especifica: ' + result);

result = scheduleHandler.couldScheduleAt(new Date('11:20:00')); //FALSE

console.log('Puede programar fecha especifica despues de ya haberla programado: ' + result);

result = scheduleHandler.couldScheduleAt(new Date('11:10:00')); //FALSE

console.log('Puede programar fecha especifica despues de ya haberla programado: ' + result);

result = scheduleHandler.couldScheduleAt(new Date('11:30:00')); //TRUE

console.log('Puede programar fecha especifica despues de ya haberla programado: ' + result);

result = scheduleHandler.unScheduleAt(new Date('11:30:00')); //TRUE

console.log('Se desPrograma fecha especifica: ' + result);

result = scheduleHandler.schedule();

console.log('Se programa una fecha disponible: ' + result);



