interface IResponseUseUser {
  ok: boolean;
}

interface EnterLoginForm1 {
  email?: string;
  phone?: string;
}

interface EnterLoginForm2 {
  token: string;
}

interface responseType {
  ok: boolean;
  message?: string;
  error?: { message: string };
  [key: string]: any;
}

interface IuseMutation<T> {
  data: T;
  isLoading: boolean;
  error: undefined | { message: string };
}

interface ISendNodeMail {
  text: string;
  to: string;
  subject: string;
}

interface IWithAPIhandler {
  handler: any;
  method: string;
  isPrivated?: boolean;
}
