import { Spinner } from "./Spinner";

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner size={36} className="text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;
