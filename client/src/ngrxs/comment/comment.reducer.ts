import { createReducer, on } from '@ngrx/store';
import { CommentState } from './comment.state';
import * as CommentActions from './comment.actions';
import { CommentModel } from '../../models/comment.model';

const initialState: CommentState = {
  comments: [],

  isCreatingComment: false,
  isCreateCommentSuccess: false,
  createCommentErrorMessage: '',

  isGettingCommentByVideoId: false,
  isGetCommentByVideoIdSuccess: false,
  getCommentByVideoIdErrorMessage: '',
};

export const commentReducer = createReducer(
  initialState,

  on(CommentActions.createComment, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isCreatingComment: true,
      isCreateCommentSuccess: false,
    };
  }),

  on(CommentActions.createCommentSuccess, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isCreatingComment: false,
      isCreateCommentSuccess: true,
    };
  }),

  on(CommentActions.createCommentFailure, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isCreatingComment: false,
      createCommentErrorMessage: action.error,
    };
  }),

  on(CommentActions.getCommentsByVideoId, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isGettingCommentByVideoId: true,
      isGetCommentByVideoIdSuccess: false,
    };
  }),

  on(CommentActions.getCommentsByVideoIdSuccess, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isGettingCommentByVideoId: false,
      isGetCommentByVideoIdSuccess: true,
      comments: action.comments,
    };
  }),

  on(CommentActions.getCommentsByVideoIdFailure, (state, action) => {
    console.log(action.type);
    return <CommentState>{
      ...state,
      isGettingCommentByVideoId: false,
      getCommentByVideoIdErrorMessage: action.error,
    };
  }),

  on(CommentActions.clearCommentState, (state) => {
    return <CommentState>{
      ...state,
      comments: [],
      isCreatingComment: false,
      isCreateCommentSuccess: false,
      createCommentErrorMessage: '',

      isGettingCommentByVideoId: false,
      isGetCommentByVideoIdSuccess: false,
      getCommentByVideoIdErrorMessage: '',
    };
  }),
);
