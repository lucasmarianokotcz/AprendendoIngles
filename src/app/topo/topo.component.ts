import { Component } from "@angular/core";
import { AppName } from "app/app.component";

@Component({
  selector: "app-topo",
  templateUrl: "./topo.component.html",
  styleUrls: ["./topo.component.css"],
})
export class TopoComponent {
  AppName = AppName;
}
