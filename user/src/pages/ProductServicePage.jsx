import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ProductServiceSister from "../component/protected/ProductServiceSister.jsx";
import { PackageSearch } from "lucide-react";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const ProductServicePage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <ProductServiceSister
        title="Products & Services"
        type="productAndServices"
        icon={<PackageSearch className="w-5 h-5 text-green-400" />}
        slug={user?.slug}
      />
    </UserLayout>
  );
};

export default ProductServicePage;
