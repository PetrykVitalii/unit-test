class Offer {
  constructor(strLength, fileName, language, date = new Date()) {
    this.priceForOne = {
      english: 0.12,
      ukraine: 0.05,
    };
    this.percentage = {
      increase: 1.2,
      normal: 1,
    };
    this.minPrice = {
      english: 120,
      ukraine: 50,
    };
    this.timeForHour = {
      english: 333,
      ukraine: 1333,
    };
    this.date = date
    this.timeForWork = 0;
    this.minTimeForWork = 60;
    this.startWork = 10;
    this.endWork = 19;
    this.day = this.date.getDate();
    this.changeDay = this.day;
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.week = this.date.getDay();
    this.changeWeek = this.week
    this.hours = this.date.getHours()
    this.minutes = this.date.getMinutes()
    this.finishDate = [];
    this.addTime = 30;
    this.price = 0;
    this.strLength = strLength;
    this.fileName = fileName.slice(fileName.lastIndexOf("."));
    this.language = language;
  }
  getDay(){
    if(this.changeWeek > 6){
      this.changeDay += 2
      this.changeWeek -= 5
      this.getDay()
    }
    else if(this.changeWeek === 0){
      this.changeDay += 1
    }
    else if(this.changeWeek === 6){
      this.changeDay += 2
    }
  }
  getHours(hours,min) {
    if (hours + this.startWork > this.endWork) {
      hours = hours - this.endWork + this.startWork;
      this.changeDay++;
      this.changeWeek++;
      return this.getHours(hours, min);
    } else if ((this.endWork - hours - this.startWork === 0)) {
      if( min !== '30'){
        return this.endWork
      }
      else{
        this.changeDay++;
        this.changeWeek++;
        return this.startWork
      }
    } else {
      return hours + this.startWork;
    }
  }
  calculateHours(hours){
    if (hours + this.hours < this.endWork) {
      hours = hours + this.hours;
    } else {
      if(this.changeWeek !== 6){
        this.changeDay++;
        this.changeWeek++;
      }
      hours = hours + this.hours - this.endWork
      hours = this.getHours(hours,this.finishDate[4]);
    }
    return hours
  }
  calculateMin(hours){
    if ((this.minutes + this.timeForWork * 60) % 60 > 30) {
      this.finishDate[4] = `00`;
      return ++hours;
    } else {
      this.finishDate[4] = `30`;
      return hours;
    }
  }
  calculateTime() {
      let hours = Math.floor(this.minutes / 60 + this.timeForWork);
      hours = this.calculateMin(hours)
      hours = this.calculateHours(hours)
      this.finishDate[3] = String(hours);
      this.getDay()
      this.finishDate[0] = String((new Date(this.year,this.month,this.changeDay)).getDate()).padStart(2,'0');
      this.finishDate[1] = String((new Date(this.year,this.month,this.changeDay)).getMonth() + 1).padStart(2,'0');
      this.finishDate[2] = String((new Date(this.year,this.month,this.changeDay)).getFullYear());
      this.finishDate = `${this.finishDate[0]}/${this.finishDate[1]}/${this.finishDate[2]} ${this.finishDate[3]}:${this.finishDate[4]}`
  }

  calculatePriceAndTime(priceForOne, minPrice, percentage, timeForHour) {
    priceForOne * percentage * this.strLength < minPrice
      ? this.price = +minPrice
      : this.price = +(priceForOne * percentage * this.strLength).toFixed(2);

    this.strLength * percentage / timeForHour * 60 < this.minTimeForWork
      ? this.timeForWork = (this.minTimeForWork + this.addTime)/ 60 
      : this.timeForWork = this.addTime / 60 + (this.strLength * percentage) / timeForHour;

    this.calculateTime();
  }
  calculatePercentage(priceForOne, minPrice, timeForHour) {
      this.fileName === ".docs" || this.fileName === ".doc" || this.fileName === ".rtf"
       ? this.calculatePriceAndTime(priceForOne,minPrice,this.percentage.normal,timeForHour)
       : this.calculatePriceAndTime(priceForOne,minPrice,this.percentage.increase,timeForHour);
  }
  checkHoursAndMinutes(){
    this.hours = (() => (this.hours > this.endWork || this.hours < this.startWork || this.week === 6 || this.week === 0) ? this.endWork : this.hours)()
    this.minutes = (() => (this.hours === this.endWork || this.week === 6 || this.week === 0) ? 0 : this.minutes)()
  }
  calculate() {
    this.checkHoursAndMinutes()
    this.language === "eng"
      ? this.calculatePercentage(this.priceForOne.english,this.minPrice.english,this.timeForHour.english)
      : this.calculatePercentage(this.priceForOne.ukraine,this.minPrice.ukraine,this.timeForHour.ukraine);
  }
}
  
module.exports = Offer


//   const offer = new Offer(380, 'str.doc', 'Англійська')
//   console.log('price',offer.price);
//   console.log('time',offer.finishDate);