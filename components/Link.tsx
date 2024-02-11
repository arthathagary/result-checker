import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";

interface ExternalLinkProps {
  child: ReactElement;
  href: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ child, href }) => {
  if (!isValidElement(child)) {
    throw new Error("Child must be a valid React element");
  }
  if (child.type !== "a") {
    throw new Error("Child must be an <a> element");
  }
  return cloneElement<React.AnchorHTMLAttributes<HTMLAnchorElement>>(child, {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  });
};

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
}

export const Link: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  if (props.href.toString().startsWith("/")) {
    return <NextLink {...props}>{children}</NextLink>;
  } else {
    return (
      <ExternalLink
        child={children as ReactElement}
        href={props.href.toString()}
      />
    );
  }
};
