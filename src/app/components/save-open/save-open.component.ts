import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import html2canvas from "html2canvas";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { CanvasLine } from "src/app/models/canvasLine";
import { InfoModalComponent } from "../info-modal/info-modal.component";
import hotkeys from "src/assets/hotkeys.json"

@Component({
  selector: 'app-save-open',
  templateUrl: 'save-open.component.html',
  styleUrls: ['save-open.component.scss']
})
export class SaveOpenComponent {

  @Input() lines: CanvasLine[] = [];
  @Input() title: string = '';

  @Output() openEvent = new EventEmitter<any>();

  file: File;

  hotkeys: any = hotkeys.saveOpen;

  constructor(private clipboardService: ClipboardService,
              private cdRef: ChangeDetectorRef,
              private toast: ToastrService,
              private dialog: MatDialog) {
  }

  openInfoModal() {
    console.log("openInfoModal");
    var modal = this.dialog.open(InfoModalComponent, {width: '800px', height: '300px'});
    modal.afterClosed().subscribe(() => {
      console.log("closed");
    })
  }

  dowload(type: string) {
    const blob = new Blob([JSON.stringify(this.lines, null, 2)], {type: 'application/json'})
    let url = window.URL.createObjectURL(blob);
    let filename = (this.title=='' ? 'project' : this.title) + '.' + type;
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  createImage() {
    if(document.querySelector("#capture"))
      html2canvas(document.querySelector("#capture") ? document.querySelector("#capture") as HTMLElement : document.body).then((canvas) => {
        const fileName = (this.title=='' ? 'project' : this.title);
        const link = document.createElement("a");
        link.download = fileName + ".png";
        canvas.toBlob((blob) => {
          const _blob = new Blob([blob ? blob : '']);
          link.href = URL.createObjectURL(_blob);
          link.click();
        });
    })
  }

  async dataFromClipboard() { // doesn't work
  }

  dataFromFolder() {
        if(confirm("If you open the file, the information already entered will be erased. You want open the file?"))
      document.getElementById('file')?.click();
  }

  handleFile(value: Event) {
    this.file = (value.target as HTMLInputElement).files?.item(0) as File;
    (value.target as HTMLInputElement).value = '';
    var reader = new FileReader();
    reader.onload = (e) => {
      this.parseData(reader.result?.toString() as string, this.file.name);
    }
    reader.readAsText(this.file)
  }

  parseData(value: string, title: string) {
    try {
      var objects = JSON.parse(value);
      let newLines: CanvasLine[] = [];
      for(let item of objects)
        newLines.push(new CanvasLine(item));
      // NOTE: it's better to use regex
      if(title.substring(title.length-5, title.length) == ".json") title = title.substring(0, title.length-5);
      if(title.substring(title.length-4, title.length) == ".txt") title = title.substring(0, title.length-4);
      if(title.substring(title.length-6, title.length) == ".latex") title = title.substring(0, title.length-6);
      this.openEvent.emit({title: title, lines: newLines});
    }
    catch(error) {
      this.toast.clear();
      this.toast.error("Program takes only .json and .txt file formats, and files with correct structure.", "File incorrect");
      console.log(error);
    }
  }

  @HostListener('window:keydown', ['$event'])
  activeHotkeys(event: KeyboardEvent) {
    // event.preventDefault(); TODO: maybe it works only with presetted hotkeys, not just window:keydown
    this.hotkeys.forEach((e: any) => {
      if(e.key == event.key && e.ctrl == event.ctrlKey) {
          switch (e.id) {
            case "save":
              this.dowload('json');
              break;
            case "open": // doesn't work
              this.dataFromFolder();
              break;
          }
      }
    })
  }
}