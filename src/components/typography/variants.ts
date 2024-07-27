import { cva } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[64px]",
      h2: "text-[40px]",
      h3: "text-[32px]",
      h4: "text-[24px]",
      h5: "text-[18px]",
      h6: "text-[16px]",
    },
    fontWeight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      tertiary: "text-tertiary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
      white: "text-white",
      black: "text-black",
      gray: "text-gray",
    },
  },
  defaultVariants: {
    variant: "h4",
    fontWeight: "regular",
    color: "primary",
  },
});
