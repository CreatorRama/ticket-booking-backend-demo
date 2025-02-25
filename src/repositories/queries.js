function addRowLockOnFlights(flightid){
    return `select * from Flights where Flights.id=${flightid} for update;`
}

module.exports={
    addRowLockOnFlights
}