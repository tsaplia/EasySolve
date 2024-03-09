import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
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

  file: File;

  constructor(private clipboardService: ClipboardService,
              private cdRef: ChangeDetectorRef,
              private toast: ToastrService,
              private dialog: MatDialog) {
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
      let titles = title.split('.');
      title = '';
      titles.forEach((e, index) =>  {
        if(index < titles.length-1)
          title += e;
      });
      this.openEvent.emit({title: title, lines: newLines});
    }
    catch(error) {
      this.toast.clear();
      this.toast.error("Program takes only .json and .txt file formats, and files with correct structure.", "File incorrect");
      console.log(error);
    }
  }
}