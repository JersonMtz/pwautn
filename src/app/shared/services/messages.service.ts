import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  alert: any = { active: false, icon: '', text: '' };
  constructor() { }

  private beatAlert() {
    const sound: any = document.getElementById('sound');
    sound.src = "./assets/music/notificacion.mp3";
    sound.play();
  }

  beatPopup() {
    const sound: any = document.getElementById('sound');
    sound.src = "./assets/music/popup.mp3";
    sound.play();
  }

  showAlert() {
    if (this.alert.active) {
      this.notification(this.alert.icon, this.alert.text);
      this.alert = { active: false, icon: '', text: '' };
    }
  }

  smsDelete(name: string, text: string = 'Esta acción no podrá revertirse'): Promise<SweetAlertResult> {
    this.beatAlert();
    return Swal.fire({
      title: `¿Eliminar ${name}?`,
      html: `${text}`,
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

  smsConfirm(title: string = '¿Desea salir?', text: string = 'Existen cambios pendientes sin guardar'): Promise<SweetAlertResult> {
    this.beatAlert();
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#485FC7',
      cancelButtonColor: '#00D1B2',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
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

  notification(type: SweetAlertIcon = 'info', text: string, backColor: string = '#FFF', move: SweetAlertPosition = 'bottom') {
    const Toast = Swal.mixin({
      toast: true,
      position: move,
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

  deleteProductBill(text: string): Promise<SweetAlertResult> {
    this.beatPopup();
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: true
    });

    return Toast.fire({
      icon: 'question',
      title: `¿Quitar ${text.toUpperCase()} de la lista?`,
      showCancelButton: true,
      cancelButtonColor: '#00D1B2',
      cancelButtonText: 'No',
      confirmButtonColor: '#485FC7',
      confirmButtonText: 'Sí',
      showClass: { popup: 'animate__animated animate__fadeIn' },
      hideClass: { popup: 'animate__animated animate__fadeOut' }
    });
  }

  logOutMessage(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Por favor inicie sesión nuevamente',
      allowOutsideClick: false,
      allowEnterKey: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#319EF4',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
}