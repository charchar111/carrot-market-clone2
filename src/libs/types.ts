import { ProductSelect } from "@/pages";
import {
  Message,
  Post,
  Product,
  Record,
  Review,
  Stream,
  User,
} from "@prisma/client";
import { type } from "os";
import { KeyedMutator } from "swr";
import { SWRMutationHook } from "swr/mutation";

export interface IResponse {
  ok: boolean;
  error?: { message: string };
}

export interface IResponseFailed {
  ok: false;
}

export interface IResponseUseUser {
  ok: boolean;
  profile: { id: number };
  flashMessage?: string | undefined;
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

export interface IFormPostAnswer {}

export interface globalProps {
  user: { user: IResponseUseUser; mutate: KeyedMutator<IResponseUseUser> };
}

export interface apiProfileIdGet {
  ok: boolean;
  profile: {
    id: number;
    name: string;
    avatar: string | null;
    email: string;
    phone: string;
  };
}

export interface apiProfileDashboardGet extends responseType {
  profile: {
    id: number;
    name: string;
    avatar: string | null;
    Products: Product[];
    Records: Record[];
  };
}

interface ReviewWithCreatedBy extends Review {
  createdBy: {
    name: string;
    avatar: string;
    id: number;
  };
}

export interface apiProfileIdReviewsGet extends responseType {
  reviews: ReviewWithCreatedBy[];
}

interface RecordWithProduct extends Record {
  product: ProductSelect;
}

export interface apiProfileIdRecordGet extends responseType {
  record: RecordWithProduct[];
}

export interface apiMeRecordGet extends apiProfileIdRecordGet {}

export interface IResponseLivePost extends IResponse {
  stream: { id: number };
}

export interface StreamWithMessage extends Stream {
  Messages: Message[];
}

export interface IResponseWithStreamDetail extends IResponse {
  live: StreamWithMessage;
}
