import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

type BaseProps = {
  children?: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Partial<ComponentProps<typeof Link>> & {
    as: "link";
  };

type ButtonAsExternal = BaseProps &
  Omit<ComponentProps<"a">, keyof BaseProps> & {
    as: "externalLink";
  };

export type ButtonOrLinkProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink;

export const ButtonOrLink = (props: ButtonOrLinkProps) => {
  if (props.as === "link") {
    // don't pass unnecessary props to component
    const { className, search = {}, params = {}, ...rest } = props;
    return <Link search={search} params={params} className={className} {...rest} />;
  } else if (props.as === "externalLink") {
    const { className, ...rest } = props;
    return (
      <Link
        className={className}
        // provide good + secure defaults while still allowing them to be overwritten
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {props.children}
      </Link>
    );
  } else {
    const { className, ...rest } = props;
    return <button className={className} {...rest} />;
  }
};
