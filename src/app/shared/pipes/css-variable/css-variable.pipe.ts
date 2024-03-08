import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cssvariable'
})
export class CssVariablePipe implements PipeTransform {

  transform(value: string): unknown {
    return `var(${value})`;
  }

}
