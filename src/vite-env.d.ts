/// <reference types="vite/client" />
declare module "get-md-image" {
  const getImage: (text: string) =>
    | {
        alt: string;
        src: string;
        html: string;
      }
    | undefined;
  export default getImage;
}
