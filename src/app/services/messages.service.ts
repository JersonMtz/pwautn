import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  smsDelete(text:string):Promise<SweetAlertResult> {
    return Swal.fire({
      title: `Desea eliminar a "${ text }"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#485FC7',
      cancelButtonColor: '#00D1B2',
      confirmButtonText: 'Aceptar',
      backdrop: 'rgba(0,0,0,0.8)',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      },
      allowOutsideClick: false
    })
  }
  
  notification(type:SweetAlertIcon, text:string, backColor:string = '#FFF') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({ icon: type, title: text, background: backColor });
  }
}