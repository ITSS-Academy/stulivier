import { Component, Input } from '@angular/core';
import { CommentModel } from '../../../models/comment.model';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  @Input() comment!: CommentModel;
}
