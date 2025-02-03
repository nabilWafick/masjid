import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = ({
  pathSegments = [],
}: {
  pathSegments: string[];
}) => {
  const maxItems = 3;
  const shouldTruncate = pathSegments.length > maxItems;
  const visibleSegments = shouldTruncate
    ? [pathSegments[0], "...", pathSegments[pathSegments.length - 1]]
    : pathSegments;

  return (
    <div className="w-full max-w-2xl p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="en/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          {visibleSegments.map((segment, index) => {
            const isEllipsis = segment === "...";
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === visibleSegments.length - 1;
            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isEllipsis ? (
                    <BreadcrumbEllipsis />
                  ) : isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DynamicBreadcrumb;
