class App{
    constructor(){
        console.log("create app");

        this.gocal=this.gocal.bind(this);
        this.gotodiarycard=this.gotodiarycard.bind(this);
        this.calendar_add_listen=this.calendar_add_listen.bind(this);
        this.calendar_prev_month=this.calendar_prev_month.bind(this);
        this.calendar_remove_listen=this.calendar_remove_listen.bind(this);

        document.querySelector("#diary-button-calendar").addEventListener("click",this.gocal);

        this.diarycontainer=document.querySelector("#diary");
        this.diary_cardcontainer=document.querySelector("#diary-card");
        this.calendarcontainer=document.querySelector("#calendar");

        this.calendar=new Calendar(this.calendarcontainer);
        this.calendar.prev.addEventListener('click',this.calendar_prev_month);
        //this.next.addEventListener('click',this.calendar_next_month);

        const today = new Date();
        this.date =[today.getFullYear(),(today.getMonth()+1),today.getDate()];
        console.log("today is "+this.date[0]+"/"+this.date[1]+"/"+this.date[2]);

        this.calendar_add_listen();

    }
    async gotodiarycard(event){


        const month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
        console.log(event.currentTarget.dataset.date);

        this.date = event.currentTarget.dataset.date.split('/');

        document.querySelector("#diary-card-date").textContent=month_name[this.date[1]-1]+" "+this.date[2];
        await this.getdiary(event.currentTarget.dataset.date);

        this.diarycontainer.classList.add("inactive");
        this.diary_cardcontainer.classList.remove("inactive");
        this.calendarcontainer.classList.add("inactive");
    }

    async getdiary(date) {
        const resultsContainer = document.querySelector('#diary-card-content');
        const response = await fetch("/date/"+date);
        const json = await response.json();
        resultsContainer.textContent = json;
    }
    gocal() {
        this.diarycontainer.classList.add("inactive");
        this.diary_cardcontainer.classList.add("inactive");
        this.calendarcontainer.classList.remove("inactive");
    }

    calendar_prev_month(){
        this.calendar_remove_listen();
        this.calendar.prev_month();
        this.calendar_add_listen();
    }
    calendar_add_listen(){
        this.days=document.querySelectorAll("#days > li");
        for(let day of this.days){
            day.addEventListener('click', this.gotodiarycard);
        }
    }
    calendar_remove_listen(){
        for(let day of this.days){
            day.removeEventListener("click", this.gotodiarycard);
        }
    }
}