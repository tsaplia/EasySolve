import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ClipboardService } from "ngx-clipboard";
import { CanvasLine } from "src/app/models/canvasLine";

@Component({
  selector: 'app-save-open',
  templateUrl: 'save-open.component.html',
  styleUrls: ['save-open.component.scss']
})
export class SaveOpenComponent {

  @Input() lines: CanvasLine[] = [];
  @Input() title: string = '';

  @Output() openEvent = new EventEmitter<any>();

  file: any;
  newLines: CanvasLine[] = [];

  constructor(private clipboardService: ClipboardService,
              private cdRef: ChangeDetectorRef) {
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

  async dataFromClipboard() { // doesn't work
    // const data = await navigator.clipboard.read();
    // console.debug(data);
    // for(const item of data) {
    //   for(const type of item.types) {
    //     const blob = await item.getType(type);
    //     console.log(blob)
    //   }
    // }
  }

  dataFromFolder() {
    document.getElementById('file')?.click();
  }

  handleFile(value: any) {
    this.file = value.target.files[0]
    console.log(this.file.name)
    var reader = new FileReader();
    reader.onload = (e) => {
      this.toCanvasLine(reader.result?.toString(), this.file.name);
    }
    reader.readAsText(this.file)
  }

  toCanvasLine(value: any, title: string) {
    try {
      var objects = JSON.parse(value);
      for(let item of objects) {
        this.newLines.push(new CanvasLine(item));
      }
      let titles = title.split('.');
      title = '';
      titles.forEach((e, index) =>  {
        if(index < titles.length-1)
          title += e;
      });
      this.openEvent.emit({title: title, lines: this.newLines});
      this.newLines = [];
    }
    catch(error) {
      console.log(error);
    }
  }
}