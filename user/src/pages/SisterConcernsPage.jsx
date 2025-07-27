import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ProductServiceSister from "../component/protected/ProductServiceSister.jsx";
import { Building2 } from "lucide-react";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const SisterConcernsPage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      {user?.role === "corporate" && (
        <ProductServiceSister
          title="Sister Concerns"
          type="sisterConcerns"
          icon={<Building2 className="w-5 h-5 text-green-400" />}
          slug={user?.slug}
        />
      )}
    </UserLayout>
  );
};

export default SisterConcernsPage;
