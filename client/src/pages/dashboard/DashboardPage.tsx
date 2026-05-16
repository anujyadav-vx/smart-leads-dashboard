import {
  useAuth
} from "../../store/AuthContext";

import Button
from "../../components/ui/Button";

const DashboardPage = () => {

  const {
    user,
    logout
  } = useAuth();

  return (

    <div className="p-8">

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <div>

          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Dashboard
          </h1>

          <p>
            Welcome,
            {" "}
            {user?.name}
          </p>

        </div>

        <div className="w-40">

          <Button
            onClick={logout}
          >
            Logout
          </Button>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;