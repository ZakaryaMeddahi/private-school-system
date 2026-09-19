function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <div
      role={errorMessage ? 'alert' : undefined}
      className="flex min-h-6 w-full items-center rounded-md bg-[#DC2626]/10 px-2.5 text-[#DC2626]"
      style={{ visibility: errorMessage !== '' ? 'visible' : 'hidden' }}
    >
      <span className="text-xs">{errorMessage}</span>
    </div>
  );
}
export default ErrorMessage;
