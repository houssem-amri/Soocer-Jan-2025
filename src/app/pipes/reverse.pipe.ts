import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch: any) {
    // let newCh=''
    // for (let i = 0; i < ch.length; i++) {
    //   newCh = ch[i] + newCh;
      
    // }

    // return newCh;

    return ch.split('').reverse().join('')

  }

}
