/* eslint-disable angular/document-service */
/* eslint-disable angular/window-service */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable max-len */
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import html2canvas from "html2canvas"; // TODO: ng build warning
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { CanvasLine } from "src/app/models/canvasLine";
import { InfoModalComponent } from "../info-modal/info-modal.component";
import hotkeys from "src/assets/hotkeys.json";
import { latexWrap } from "src/app/configs/utils";

@Component({
    selector: "app-save-open",
    templateUrl: "save-open.component.html",
    styleUrls: ["save-open.component.scss"]
})
export class SaveOpenComponent {
  @Input() lines: CanvasLine[] = [];
  @Input() title: string = "";

  @Output() openEvent = new EventEmitter<any>();

  file: File;

  hotkeys: any = hotkeys.saveOpen;

  constructor(private readonly clipboardService: ClipboardService,
              private readonly cdRef: ChangeDetectorRef,
              private readonly toast: ToastrService,
              private readonly dialog: MatDialog) {
  }

  openInfoModal(): void {
      console.log("openInfoModal");
      let modal = this.dialog.open(InfoModalComponent, { width: "800px", height: "300px" });
      modal.afterClosed().subscribe(() => {
          console.log("closed");
      });
  }

  dowload(type: "json" | "tex"): void {
      let text: string;
      if (type == "tex") text = latexWrap(this.lines.map(line => line.line).join("\\par\n"));
      else text = JSON.stringify(this.lines, null, 2);

      const blob = new Blob([text], { type: "application/json" });
      let url = window.URL.createObjectURL(blob);
      let filename = `${this.title || "project"}.${type}`;
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  }

  createImage(): void {
      if (document.querySelector("#capture")) {
          void html2canvas(document.querySelector("#capture") ? document.querySelector("#capture")! : document.body).then((canvas) => {
              const fileName = (this.title == "" ? "project" : this.title);
              const link = document.createElement("a");
              link.download = fileName + ".png";
              canvas.toBlob((blob) => {
                  const _blob = new Blob([blob ?? ""]);
                  link.href = URL.createObjectURL(_blob);
                  link.click();
              });
          });
      }
  }

  dataFromClipboard(): void { // doesn't work
  }

  dataFromFolder(): void {
      if (confirm("If you open the file, the information already entered will be erased. You want open the file?")) {
          document.getElementById("file")?.click();
      }
  }

  handleFile(value: Event): void {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      this.file = (value.target as HTMLInputElement).files?.item(0) as File;
      (value.target as HTMLInputElement).value = "";
      let reader = new FileReader();
      reader.onload = (e) => {
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          this.parseData(reader.result?.toString() as string, this.file.name);
      };
      reader.readAsText(this.file);
  }

  parseData(value: string, title: string): void {
      try {
          let objects = JSON.parse(value);
          let newLines: CanvasLine[] = [];
          for (let item of objects) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              newLines.push(new CanvasLine(item));
          }
          title = title.substring(0, title.lastIndexOf("."));
          this.openEvent.emit({ title, lines: newLines });
      } catch (error) {
          this.toast.clear();
          this.toast.error("Program takes only .json and .txt file formats, and files with correct structure.", "File incorrect");
          console.log(error);
      }
  }

  @HostListener("window:keydown", ["$event"])
  activeHotkeys(event: KeyboardEvent): void {
      // event.preventDefault(); TODO: maybe it works only with presetted hotkeys, not just window:keydown
      this.hotkeys.forEach((e: any) => {
          if (e.key == event.key && e.ctrl == event.ctrlKey) {
              switch (e.id) {
              case "save":
                  this.dowload("json"); // TODO: add choose type
                  break;
              case "open": // doesn't work
                  this.dataFromFolder();
                  break;
              }
          }
      });
  }
}
