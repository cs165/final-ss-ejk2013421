class Calendar{
    constructor(Calendarcontainer){
        console.log("create calendar");
        this.Calendarcontainer=Calendarcontainer;
        this.month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
        this.month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
        this.month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
/*
        this.holder = document.getElementById("days");
        this.prev = document.getElementById("prev");
        this.next = document.getElementById("next");
        this.ctitle = document.getElementById("calendar-title");
        this.cyear = document.getElementById("calendar-year");*/
        this.holder = Calendarcontainer.querySelector("#days");
        this.prev = Calendarcontainer.querySelector("#prev");
        this.next = Calendarcontainer.querySelector("#next");
        this.ctitle = Calendarcontainer.querySelector("#calendar-title");
        this.cyear = Calendarcontainer.querySelector("#calendar-year");

        this.my_date = new Date();
        this.my_year = this.my_date.getFullYear();
        this.my_month = this.my_date.getMonth();
        this.my_day = this.my_date.getDate();



        this.refreshDate=this.refreshDate.bind(this);
        this.daysMonth=this.daysMonth.bind(this);
        this.prev_month=this.prev_month.bind(this);
        this.next_month=this.next_month.bind(this);

        this.refreshDate();


    }

    dayStart(month, year) {
        var tmpDate = new Date(year, month, 1);
        return (tmpDate.getDay());
    }

    daysMonth(month, year) {
        var tmp = year % 4;
        if (tmp == 0) {
            return (this.month_olympic[month]);
        } else {
            return (this.month_normal[month]);
        }
    }

    refreshDate(){
        //console.log("enter refreshDate");
        var str = "";
        var totalDay = this.daysMonth(this.my_month, this.my_year);
        var firstDay = this.dayStart(this.my_month, this.my_year);
        var myclass;
        for(var i=1; i<firstDay; i++){
            str += "<li></li>";
        }
        for(var i=1; i<=totalDay; i++){
            if((i<this.my_day && this.my_year==this.my_date.getFullYear() && this.my_month==this.my_date.getMonth()) || this.my_year<this.my_date.getFullYear() || ( this.my_year==this.my_date.getFullYear() && this.my_month<this.my_date.getMonth())){
                myclass = " class='lightgrey'";
            }else if (i==this.my_day && this.my_year==this.my_date.getFullYear() && this.my_month==this.my_date.getMonth()){
                myclass = " class='green greenbox'";
            }else{
                myclass = " class='darkgrey'";
            }
            str += "<li"+myclass+" data-date='"+this.my_year+'/'+(this.my_month+1)+'/'+i+"'>"+i;
            /*
            if(this.monthstate[i])
                str+="<p class='haven-diary'>日記</p><p class='haven-diary'>記事*2</p>";
                */
            str+="</li>";
        }
        this.holder.innerHTML = str;
        this.ctitle.innerHTML = this.month_name[this.my_month];
        this.cyear.innerHTML = this.my_year;
    }
    prev_month(){
        //e.preventDefault();
        this.my_month--;
        if(this.my_month<0){
            this.my_year--;
            this.my_month = 11;
        }
        this.refreshDate();
    }
    next_month(){
        //e.preventDefault();
        this.my_month++;
        if(this.my_month>11){
            this.my_year++;
            this.my_month = 0;
        }
        this.refreshDate();
    }
}