import { EventManager } from "@angular/platform-browser";

export class TimeWorker {
    timerID!: NodeJS.Timeout;
interval:number=100;

onmessage=(e:any)=>{
	if (e.data=="start") {
		console.log("starting");
		this.timerID=setInterval(
            ()=>{ postMessage("tick"); },this.interval
        )

	}
	else if (e.data.interval) {
		this.interval=e.data.interval;
		if (this.timerID) {
			clearInterval(this.timerID);
			this.timerID=setInterval(
                ()=>{postMessage("tick");},this.interval
            )
		}
	}
	else if (e.data=="stop") {
		console.log("stopping");
		clearInterval(this.timerID);
		clearImmediate(this.timerID);
    };
	
};

// postMessage("worker called");
}