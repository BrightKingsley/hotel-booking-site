export const navigateLogin = ({
  navigate,
  source,
}: {
  navigate: any;
  source: string;
}) => {
  navigate("/auth/login", { state: { source } });
};
