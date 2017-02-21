import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
    transform(value: string): string {
        let months: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        var date = new Date(value);
        return months[(date.getMonth() + 1)] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
}