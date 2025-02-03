import Breadcrumb from "@/components/admin/Breadcrumbs/Breadcrumb";
import DynamicBreadcrumb from "@/components/ui/dynamic-breadcrumb";
import { FC } from "react";

const AdminNewsPage: FC = () => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="News" />
      <div></div>
    </div>
  );
};

export default AdminNewsPage;
