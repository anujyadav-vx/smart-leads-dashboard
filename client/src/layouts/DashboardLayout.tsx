const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  return (

    <div
      className="
      min-h-screen
      bg-gray-100
    "
    >

      <div
        className="
        bg-white
        shadow
        px-8
        py-4
      "
      >

        <h1
          className="
          text-xl
          font-bold
        "
        >
          Smart Leads Dashboard
        </h1>

      </div>

      <main>

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;