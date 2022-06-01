/// <reference types="vite/client" />

// get-md-image 包没有 types，只能自己声明
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
