import { Component, Input } from '@angular/core';
import { CommentModel } from '../../../models/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  @Input() comment!: CommentModel;

  constructor(private router: Router) {}

  goToUser() {
    this.router.navigate([`/profile/${this.comment.user_id}`]);
  }
}
