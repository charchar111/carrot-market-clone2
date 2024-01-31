import { Post, Product, User } from "@prisma/client";
import { type } from "os";

export interface IResponse {
  ok: boolean;
}

export interface IResponseFailed {
  ok: false;
}

export interface IResponseUseUser {
  ok: boolean;
  flashMessage: string | undefined;
}

export interface EnterLoginForm1 {
  email?: string;
  phone?: string;
}

export interface EnterLoginForm2 {
  token: string;
}

export interface responseType {
  ok: boolean;
  message?: string;
  error?: { message: string };
  [key: string]: any;
}

export interface IuseMutation<T> {
  data: T;
  isLoading: boolean;
  error: undefined | { message: string };
}

export interface ISendNodeMail {
  text: string;
  to: string;
  subject: string;
}

export interface IWithAPIhandler {
  handler: any;
  method: string[];
  isPrivated?: boolean;
}

export interface ProductUser extends Product {
  user: { avatar: string | null; id: number; name: string };
  _count: { Records: number };
}

export interface IResponseProductUserRelatedProduct extends IResponse {
  product: ProductUser;
  relatedProduct: Product[];
  isExistFavorite: boolean;
}

export type ResponseTypeProductUserRelatedProduct =
  | IResponseProductUserRelatedProduct
  | IResponseFailed;

export interface postSelected {
  id: number;
  title: string;
  createdAt: String;
  user: { name: string };
  _count: { Wonderings: number; Answers: number };
}

export interface responseTypePosts extends responseType {
  posts: postSelected[];
}

export interface postAnswer {
  createdAt: string;
  content: string;
  id: number;
  user: { id: number; name: string; avatar: string };
}

export interface PostWithUserAnswers extends Post {
  user: User;
  _count: { Wonderings: number; Answers: number };
  Answers: postAnswer[];
}

export interface responseTypePost extends responseType {
  post: PostWithUserAnswers;
  isExistWondering: boolean;
}
