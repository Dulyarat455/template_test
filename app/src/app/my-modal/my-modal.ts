// my-modal.ts
import { Component, Input, AfterViewInit,EventEmitter, Output } from '@angular/core';

// อย่าลืม import bootstrap object
declare var bootstrap: any;

@Component({
  selector: 'app-my-modal',
  // imports: [], <- Component ที่เป็น Standalone ไม่ต้องมี imports
  templateUrl: './my-modal.html',
  styleUrls: ['./my-modal.css']
})
export class MyModal implements AfterViewInit {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Output() closeRequest = new EventEmitter<void>();

  //new
  @Input() modalSize: string = '';

  private bsModal: any;

  ngAfterViewInit(): void {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      this.bsModal = new bootstrap.Modal(modalElement);
    } else {
      console.error('Modal element with ID', this.modalId, 'not found.');
    }
  }
  open() {
    if (this.bsModal) {
      this.bsModal.show();
    }
  }
  close() {
    if (this.bsModal) {
      this.bsModal.hide();
    }
  }
  dismiss() {
    this.closeRequest.emit();
  }
}