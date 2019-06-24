class App{
    constructor(){
        console.log("create app");

        this.gocal=this.gocal.bind(this);
        this.gohome=this.gohome.bind(this);
        this.go_to_edit=this.go_to_edit.bind(this);
        this.gotodiarycard=this.gotodiarycard.bind(this);
        this.calendar_add_listen=this.calendar_add_listen.bind(this);
        this.calendar_prev_month=this.calendar_prev_month.bind(this);
        this.calendar_next_month=this.calendar_next_month.bind(this);
        this.calendar_remove_listen=this.calendar_remove_listen.bind(this);
        this.adddiary=this.adddiary.bind(this);
        this.init=this.init.bind(this);
        this.prev_day=this.prev_day.bind(this);
        this.next_day=this.next_day.bind(this);

        document.querySelector("#diary-button-calendar").addEventListener("click",this.gocal);
        document.querySelector("#diary-card-gohome").addEventListener("click",this.gohome);
        document.querySelector("#diary-card-edit-gohome").addEventListener("click",this.gohome);
        document.querySelector("#diary-button-create").addEventListener("click",this.go_to_edit);
        document.querySelector("#diary-card-edit-button-submit").addEventListener("click",this.adddiary);
        document.querySelector("#diary-card-button-edit").addEventListener("click",this.go_to_edit);
        document.querySelector("#prev-diary-card").addEventListener("click",this.prev_day);
        document.querySelector("#next-diary-card").addEventListener("click",this.next_day);

        this.diarycontainer=document.querySelector("#diary");
        this.diary_cardcontainer=document.querySelector("#diary-card");
        this.calendarcontainer=document.querySelector("#calendar");
        this.diary_card_editcontainer=document.querySelector("#diary-card-edit");

        const today = new Date();
        this.date =[today.getFullYear(),(today.getMonth()+1),today.getDate()];
        this.nowdate=this.date[0]+"/"+this.date[1]+"/"+this.date[2];
        console.log("today is "+this.date[0]+"/"+this.date[1]+"/"+this.date[2]);
        this.getdiary(this.date[0]+"/"+this.date[1]+"/"+this.date[2]);
        this.month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
        this.month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
        this.month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];

        this.init();

        this.calendar=new Calendar(this.calendarcontainer);
        this.calendar.prev.addEventListener('click',this.calendar_prev_month);
        this.calendar.next.addEventListener('click',this.calendar_next_month);
        //this.next.addEventListener('click',this.calendar_next_month);
        this.calendar_add_listen();

    }

    async init(){
        await this.getdiary(this.nowdate);
        document.querySelector("#diary-card-content").textContent=this.nowcontent;
        document.querySelector("#diary-card-edit-content").value=this.nowcontent;
        document.querySelector("#diary-card-date").textContent=this.month_name[this.date[1]-1]+" "+this.date[2];
        document.querySelector("#diary-card-edit-date").textContent=this.month_name[this.date[1]-1]+" "+this.date[2];
    }

    async gotodiarycard(event){
        console.log(event.currentTarget.dataset.date);
        this.nowdate=event.currentTarget.dataset.date;

        this.date = event.currentTarget.dataset.date.split('/');

        document.querySelector("#diary-card-date").textContent=this.month_name[this.date[1]-1]+" "+this.date[2];
        document.querySelector("#diary-card-edit-date").textContent=this.month_name[this.date[1]-1]+" "+this.date[2];
        await this.getdiary(event.currentTarget.dataset.date);

        this.diarycontainer.classList.add("inactive");
        this.diary_cardcontainer.classList.remove("inactive");
        this.calendarcontainer.classList.add("inactive");
        this.diary_card_editcontainer.classList.add("inactive");
    }

    async getdiary(date) {
        const resultsContainer = document.querySelector('#diary-card-content');
        const response = await fetch("/date/"+date);
        this.nowcontent = await response.json();
        resultsContainer.textContent =this.nowcontent ;
    }
    async getmonthstate(date) {
        const resultsContainer = document.querySelector('#diary-card-content');
        const response = await fetch("/date/"+date);
        const json = await response.json();
        this.monthstate=json;
        return json;
    }
    async adddiary(event) {
        const content = document.querySelector("#diary-card-edit-content").value;
        const options = {};
        if(this.nowcontent==""){
            options.method="POST";
        }
        else {
            options.method="PATCH";
        }
        var bodyObj={};
        bodyObj[0]=content;
        options.body = JSON.stringify(bodyObj);
        console.log(options.body);
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const response = await fetch("/api/" + this.nowdate, options);
        const json = await response.json();
        this.gohome();
    }

    gocal() {
        this.diarycontainer.classList.add("inactive");
        this.diary_cardcontainer.classList.add("inactive");
        this.calendarcontainer.classList.remove("inactive");
        this.diary_card_editcontainer.classList.add("inactive");
    }

    gohome() {
        const today = new Date();
        this.date =[today.getFullYear(),(today.getMonth()+1),today.getDate()];
        this.nowdate=this.date[0]+"/"+this.date[1]+"/"+this.date[2];
        this.init();
        this.diarycontainer.classList.remove("inactive");
        this.diary_cardcontainer.classList.add("inactive");
        this.calendarcontainer.classList.add("inactive");
        this.diary_card_editcontainer.classList.add("inactive");
    }

    go_to_edit(){
        this.diarycontainer.classList.add("inactive");
        this.diary_cardcontainer.classList.add("inactive");
        this.calendarcontainer.classList.add("inactive");
        this.diary_card_editcontainer.classList.remove("inactive");

        document.querySelector("#diary-card-edit-content").value=this.nowcontent;
    }

    prev_day(){
        if(this.date[2]==1){
            if(this.date[1]!=1)this.date[1]--;
            else {
                this.date[1]=12;
                this.date[0]--;
            }
            this.date[2]=this.month_normal[this.date[1]-1];
        }
        else{
            this.date[2]--;
        }
        this.nowdate=this.date[0]+"/"+this.date[1]+"/"+this.date[2];
        console.log(this.nowdate);
        this.init();
    }

    next_day(){
        if(this.date[2]==31&&(this.date[1]==1||this.date[1]==3||this.date[1]==5||this.date[1]==7||this.date[1]==8||this.date[1]==10||this.date[1]==12)){
            this.date[2]=1;
            if(this.date[1]==12){
                this.date[1]=0;
                this.date[0]++;
            }
            else this.date[1]++;
        }
        else if(this.date[2]==30&&(this.date[1]==4||this.date[1]==6||this.date[1]==9||this.date[1]==11)){
            this.date[2]=1;
            this.date[1]++;
        }
        else if(this.date[2]==28&&this.date[1]==2){
            this.date[2]=1;
            this.date[1]++;
        }
        else{
            this.date[2]++;
        }
        this.nowdate=this.date[0]+"/"+this.date[1]+"/"+this.date[2];
        console.log(this.nowdate);
        this.init();
    }

    calendar_prev_month(){
        this.calendar_remove_listen();
        this.calendar.prev_month();
        this.calendar_add_listen();
    }
    calendar_next_month(){
        this.calendar_remove_listen();
        this.calendar.next_month();
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