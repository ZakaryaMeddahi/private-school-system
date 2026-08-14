function ErrorMessage({ errorMessage }) {
  return (
    <div
      className="flex h-6.25 w-full items-center rounded-xs bg-[#ff000030] px-2.5 text-white"
      style={{ visibility: errorMessage !== '' ? 'visible' : 'hidden' }}
    >
      <span className="text-xs">{errorMessage}</span>
    </div>
  );
}
export default ErrorMessage;
