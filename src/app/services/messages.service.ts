import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  alert:any = { active:false, icon:'', text:'' };
  constructor() { }

  showAlert() {
    if (this.alert.active) {
      this.notification(this.alert.icon, this.alert.text);
      this.alert = {active:false, icon:'', text:''};
    }
  }

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
  
  notification(type:SweetAlertIcon = 'info', text:string, backColor:string = '#FFF') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({ 
      icon: type, 
      title: text, 
      background: backColor, 
      showClass: { popup: 'animate__animated animate__fadeIn' }, 
      hideClass: { popup: 'animate__animated animate__fadeOut' }
    });
  }
}