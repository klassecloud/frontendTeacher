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
      var curserPosStart = this.inputEl.selectionStart as number;
      var curserPosEnd = this.inputEl.selectionEnd as number;

      var nameArr = button.name.split("#",2);

      var offset: number;

      // look if any offset was given
      if(!nameArr[1]){
        offset = nameArr[0].length - 1
      }else{
        offset = +nameArr[1]
      }


      if(curserPosStart==curserPosEnd){

         // insert the buttonname at the curser position
         this.eqinput = this.eqinput.slice(0, curserPosStart)
         + nameArr[0] + this.eqinput.slice(curserPosStart, this.eqinput.length);

      }else{

        // insert the button name at curser startingPosition, paste selected text in-between the parentheses
        var tmp = nameArr[0].slice(0,offset)
          + this.eqinput.slice(curserPosStart, curserPosEnd)
          + nameArr[0].slice(offset, nameArr[0].length);

        this.eqinput = this.eqinput.slice(0,curserPosStart)
          + tmp
          + this.eqinput.slice(curserPosEnd, this.eqinput.length);
      }

      setTimeout(()=>{
        this.inputEl.focus();
        this.inputEl.setSelectionRange(curserPosStart + offset,
                                       curserPosStart + offset);
      },0);

  }
  // copies formula to clipboard
  copyInput(input: HTMLInputElement){
    var curserPosStart = input.selectionStart as number;
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(curserPosStart, curserPosStart);
  }

  // opens a link to wolframalpha with the equation
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

  // pastes the formula from our equation input to the description input
  pasteFormula(){
    if(!this.inputToPaste){
        console.log("inputToPaste undefined");
        return 0;
    }

    var curserPosStart = this.inputToPaste.selectionStart as number;
    var curserPosEnd = this.inputToPaste.selectionEnd as number;
    var offset = this.eqinput.length + 9;


    this.taskToPaste.description = this.taskToPaste.description.slice(0,curserPosStart)
                                    + '\\formel{'
                                    + this.eqinput
                                    + '}'
                                    + this.taskToPaste.description.slice(curserPosEnd, this.taskToPaste.length);

    setTimeout(()=>{
          this.inputToPaste.focus();
          this.inputToPaste.setSelectionRange(curserPosStart + offset,
                                         curserPosStart + offset);
    },0);

  }

}
