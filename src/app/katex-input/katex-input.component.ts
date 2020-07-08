import { Component, OnInit, Input } from '@angular/core';
import {ButtonLabels} from './buttonlabels';
import {Task_Interface} from '../task-interface';

@Component({
  selector: 'app-katex-input',
  templateUrl: './katex-input.component.html',
  styleUrls: ['./katex-input.component.css']
})
export class KatexInputComponent implements OnInit {

  title: string = "Some Equations:";
  eqinput: string = '0 = (x^2 + y^2 -1)^3 - x^2 y^3';

  buttonLbls: ButtonLabels;

  inputEl: HTMLInputElement;
  @Input() inputToPaste: HTMLInputElement;
  @Input() taskToPaste: any;
  isHovering = false;

  constructor() { }

  ngOnInit(): void {
      this.inputEl = document.getElementById("eqIn") as HTMLInputElement;
      this.buttonLbls = new ButtonLabels;
  }

  equationBtn(button: HTMLButtonElement): void {
      var curserPos = this.inputEl.selectionStart as number;
      var curserPosEnd = this.inputEl.selectionEnd as number;

      var nameArr = button.name.split("#",2);
      var offset = +nameArr[1];

      if(curserPos==curserPosEnd){

         this.eqinput = this.eqinput.slice(0, curserPos)
         + nameArr[0] + this.eqinput.slice(curserPos, this.eqinput.length);

      }else{

        var tmp = nameArr[0].slice(0,offset)
          + this.eqinput.slice(curserPos, curserPosEnd)
          + nameArr[0].slice(offset, nameArr[0].length);

        this.eqinput = this.eqinput.slice(0,curserPos)
          + tmp
          + this.eqinput.slice(curserPosEnd, this.eqinput.length);
      }

      setTimeout(()=>{
        this.inputEl.focus();
        this.inputEl.setSelectionRange(curserPos + offset,
                                       curserPos + offset);
      },0);

  }

  copyInput(input: HTMLInputElement){
    var curserPos = input.selectionStart as number;
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(curserPos, curserPos);
  }

  openLink(){
    var tmp = "";
    for(var i=0; i<this.eqinput.length; i++){
      if(this.eqinput[i]=='+'){
        tmp += '%2B';
      }else{
        tmp += this.eqinput[i];
      }
    }
    window.open("https://www.wolframalpha.com/input/?i="+tmp, "_blank"); //solve+
  }

  mouseHovering(){
    if(this.eqinput != "")
        this.isHovering = true;
  }

  mouseLeft(){
    this.isHovering = false;
  }

  clearField(){
    this.eqinput = "";
  }

  pasteFormula(){
    if(this.inputToPaste==undefined){
    console.log("inputToPaste undefined");
        return 0;
    }

    var curserPos = this.inputToPaste.selectionStart as number;
    var curserPosEnd = this.inputToPaste.selectionEnd as number;
    var offset = this.eqinput.length + 9;


    this.taskToPaste.description = this.taskToPaste.description.slice(0,curserPos)
                                    + '\\formel{'
                                    + this.eqinput
                                    + '}'
                                    + this.taskToPaste.description.slice(curserPosEnd, this.taskToPaste.length);

    setTimeout(()=>{
          this.inputToPaste.focus();
          this.inputToPaste.setSelectionRange(curserPos + offset,
                                         curserPos + offset);
    },0);

  }

}
