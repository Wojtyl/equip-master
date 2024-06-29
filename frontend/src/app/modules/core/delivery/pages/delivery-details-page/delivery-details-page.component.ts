import { Component, inject, OnInit } from '@angular/core';
import { DeliveryService } from "../../delivery-service.service";
import { DeliveryDetails } from "../../models/delivery-details";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "../../../../../core/auth/user.service";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-delivery-details-page',
  templateUrl: './delivery-details-page.component.html',
  styleUrl: './delivery-details-page.component.scss'
})
export class DeliveryDetailsPageComponent implements OnInit {
  private deliveryService = inject(DeliveryService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  protected deliveryDetails: DeliveryDetails;
  protected isLoading = false;
  protected commentForm: FormGroup;

  private deliveryId: string;

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot.params['id'];

    this.deliveryService.getDeliveryDetails(this.deliveryId)
      .subscribe(data => {
        this.deliveryDetails = data.items;
      }
    )

    this.commentForm = this.fb.group({
      comment: [null]
    })
  }

  protected readonly Math = Math;

  onAddComment() {
    if (this.commentForm.valid) {
      this.deliveryService.addComment(this.deliveryId, this.commentForm.getRawValue()).subscribe({
        next: (response) => {
          this.deliveryDetails.comments.push(response.items);
          this.commentForm.reset()
        }
      })
    }
  }

  protected readonly environment = environment;

  isCommentOwner(commentOwnerId: string) {
    return this.userService.user.value.id === commentOwnerId;
  }

  deleteComment(commentId: string) {
    this.deliveryService.deleteComment(this.deliveryId, commentId).subscribe({
      next: () => {
        this.deliveryDetails.comments = this.deliveryDetails.comments.filter(comment => comment._id !== commentId);
      }
    })
  }
}
