import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ProductServiceSister from "../component/protected/ProductServiceSister.jsx";
import { PackageSearch } from "lucide-react";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import UserProductGallerySection from "../component/protected/UserProductGallerySection.jsx";
import RequirePermission from "../component/public/RequirePermission.jsx";

const ProductServicePage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <ProductServiceSister
        title="Services"
        type="productAndServices"
        icon={<PackageSearch className="w-5 h-5 text-green-400" />}
        slug={user?.slug}
      />
      <RequirePermission
        permission="productgallery"
        userPermissions={user?.permission}
      >
        <UserProductGallerySection userId={user._id} />
      </RequirePermission>
    </UserLayout>
  );
};

export default ProductServicePage;
